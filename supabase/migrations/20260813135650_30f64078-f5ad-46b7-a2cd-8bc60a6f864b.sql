create type public.app_role as enum ('admin','moderator','user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "users read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());
create policy "admins manage roles" on public.user_roles for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

create or replace function public.set_updated_at() returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end $$;

create table public.site_config (
  id integer primary key default 1,
  event_title text not null default 'Technology Residency',
  event_kicker text not null default 'ZOERDHUB × Zcash Ghana',
  headline text not null default 'Building the Future of Privacy, Blockchain & Innovation in Africa',
  description text not null default 'A residency bringing together developers, builders, researchers and innovators to learn, build, collaborate and explore privacy-focused blockchain technology.',
  event_date text not null default '5–28 September 2026',
  location text not null default 'ZOERDHUB Nigeria',
  duration text not null default '3 Weeks',
  organizers text not null default 'ZOERD Privacy Blockchain & AI Innovation Hub',
  partners text not null default 'Zcash Ghana',
  livestream_url text not null default 'https://www.youtube.com/@ZOERDHubTV',
  voting_wallet text not null default 'u10fgklgfqtyug0zvxwut5qjvf98tzmy75h72lwup9eexgzjcj7dqhpune4kf8n6jry72crmrtpcpgsvcjnwcw76auuthx0rkqv98h762qtxw6uyty9375486uq5zjnwm8fcf7rzcu7n4wut3s27n86dphwkc6quvjr2annd5weqq2x2zu',
  support_wallet text not null default 'u12f4nh046n9dd0lt7fgmfs4ervdf58v025h5k74v3mmclkfkggwgazk2nhutmtu2hx8vkg4lug0z78rek2w8vqw2wdafctfvy50e09p0tt72n4grhn74u722q0v70twa67q97ljfk7nj48zha5xrp9hhsm6q38mmekmht73hp2y5am2gm',
  vote_price_zec text not null default '0.001',
  youtube_url text not null default 'https://www.youtube.com/@ZOERDHubTV',
  x_url text not null default '',
  telegram_url text not null default '',
  contact_email text not null default '',
  updated_at timestamptz not null default now(),
  constraint site_config_singleton check (id = 1)
);
grant select on public.site_config to anon;
grant select, insert, update on public.site_config to authenticated;
grant all on public.site_config to service_role;
alter table public.site_config enable row level security;
create policy "config public read" on public.site_config for select to anon, authenticated using (true);
create policy "admins write config" on public.site_config for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger site_config_updated before update on public.site_config for each row execute function public.set_updated_at();
insert into public.site_config (id) values (1);

create table public.participants (
  id uuid primary key default gen_random_uuid(),
  participant_code text not null unique,
  participant_tag text not null unique,
  full_name text not null,
  username text not null default '',
  bio text not null default '',
  specialization text not null default '',
  image_url text not null default '',
  is_demo boolean not null default false,
  is_active boolean not null default true,
  voting_enabled boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.participants to anon;
grant select, insert, update, delete on public.participants to authenticated;
grant all on public.participants to service_role;
alter table public.participants enable row level security;
create policy "participants public read" on public.participants for select to anon, authenticated using (is_active);
create policy "admins manage participants" on public.participants for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger participants_updated before update on public.participants for each row execute function public.set_updated_at();

create table public.voting_days (
  id uuid primary key default gen_random_uuid(),
  day_number integer not null unique,
  label text not null default '',
  opens_at timestamptz,
  closes_at timestamptz,
  is_open boolean not null default false,
  vote_price_zec text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.voting_days to anon;
grant select, insert, update, delete on public.voting_days to authenticated;
grant all on public.voting_days to service_role;
alter table public.voting_days enable row level security;
create policy "voting days public read" on public.voting_days for select to anon, authenticated using (true);
create policy "admins manage voting days" on public.voting_days for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger voting_days_updated before update on public.voting_days for each row execute function public.set_updated_at();

create type public.vote_status as enum ('pending','verified','rejected','duplicate');

create table public.vote_submissions (
  id uuid primary key default gen_random_uuid(),
  txid text not null unique,
  participant_id uuid not null references public.participants(id) on delete cascade,
  voting_day_id uuid references public.voting_days(id) on delete set null,
  participant_tag text not null,
  claimed_amount_zec text not null default '',
  votes integer not null default 0,
  status public.vote_status not null default 'pending',
  admin_notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  verified_at timestamptz
);
grant select, insert, update, delete on public.vote_submissions to authenticated;
grant all on public.vote_submissions to service_role;
alter table public.vote_submissions enable row level security;
create policy "admins manage submissions" on public.vote_submissions for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger vote_submissions_updated before update on public.vote_submissions for each row execute function public.set_updated_at();

create or replace function public.submit_vote_transaction(_participant_id uuid, _txid text, _amount text default '')
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  p public.participants%rowtype;
  d public.voting_days%rowtype;
  clean_tx text := lower(trim(_txid));
begin
  if clean_tx is null or length(clean_tx) < 16 or length(clean_tx) > 200 or clean_tx !~ '^[a-z0-9:_-]+$' then
    return jsonb_build_object('ok', false, 'error', 'Please enter a valid transaction ID.');
  end if;

  select * into p from public.participants where id = _participant_id and is_active and voting_enabled;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'Voting is not available for this participant.');
  end if;

  select * into d from public.voting_days where is_open = true order by day_number desc limit 1;
  if not found then
    return jsonb_build_object('ok', false, 'error', 'Voting is currently closed.');
  end if;

  if exists (select 1 from public.vote_submissions where txid = clean_tx) then
    return jsonb_build_object('ok', false, 'error', 'This transaction ID has already been submitted.');
  end if;

  insert into public.vote_submissions (txid, participant_id, voting_day_id, participant_tag, claimed_amount_zec)
  values (clean_tx, p.id, d.id, p.participant_tag, coalesce(left(_amount, 40), ''));

  return jsonb_build_object('ok', true, 'status', 'pending');
end $$;
grant execute on function public.submit_vote_transaction(uuid, text, text) to anon, authenticated;

create or replace function public.get_leaderboard(_day_number integer default null)
returns table (participant_id uuid, full_name text, participant_code text, participant_tag text, image_url text, verified_votes bigint)
language sql stable security definer set search_path = public as $$
  select p.id, p.full_name, p.participant_code, p.participant_tag, p.image_url,
         coalesce(sum(v.votes), 0)::bigint
  from public.participants p
  left join public.vote_submissions v
    on v.participant_id = p.id
   and v.status = 'verified'
   and (_day_number is null or v.voting_day_id in (select id from public.voting_days where day_number = _day_number))
  where p.is_active
  group by p.id
  order by 6 desc, p.full_name asc
$$;
grant execute on function public.get_leaderboard(integer) to anon, authenticated;

create table public.schedule_items (
  id uuid primary key default gen_random_uuid(),
  day_label text not null default '',
  time_label text not null default '',
  session_title text not null default '',
  facilitator text not null default '',
  description text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.schedule_items to anon;
grant select, insert, update, delete on public.schedule_items to authenticated;
grant all on public.schedule_items to service_role;
alter table public.schedule_items enable row level security;
create policy "schedule public read" on public.schedule_items for select to anon, authenticated using (true);
create policy "admins manage schedule" on public.schedule_items for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger schedule_updated before update on public.schedule_items for each row execute function public.set_updated_at();

create table public.faq_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null default '[TO BE CONFIRMED]',
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
grant select on public.faq_items to anon;
grant select, insert, update, delete on public.faq_items to authenticated;
grant all on public.faq_items to service_role;
alter table public.faq_items enable row level security;
create policy "faq public read" on public.faq_items for select to anon, authenticated using (true);
create policy "admins manage faq" on public.faq_items for all to authenticated
  using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));
create trigger faq_updated before update on public.faq_items for each row execute function public.set_updated_at();

create policy "participant images read" on storage.objects for select to anon, authenticated
  using (bucket_id = 'participants');
create policy "admins upload participant images" on storage.objects for insert to authenticated
  with check (bucket_id = 'participants' and public.has_role(auth.uid(),'admin'));
create policy "admins update participant images" on storage.objects for update to authenticated
  using (bucket_id = 'participants' and public.has_role(auth.uid(),'admin'));
create policy "admins delete participant images" on storage.objects for delete to authenticated
  using (bucket_id = 'participants' and public.has_role(auth.uid(),'admin'));

insert into public.participants (participant_code, participant_tag, full_name, username, bio, specialization, is_demo, sort_order) values
 ('ZRD001','DEMO01-ZRD001','Demo Participant 01','@demo01','Demo profile. Replace with real resident information from the admin dashboard.','Zero-knowledge engineering', true, 1),
 ('ZRD002','DEMO02-ZRD002','Demo Participant 02','@demo02','Demo profile. Replace with real resident information from the admin dashboard.','Smart contract development', true, 2),
 ('ZRD003','DEMO03-ZRD003','Demo Participant 03','@demo03','Demo profile. Replace with real resident information from the admin dashboard.','Privacy research', true, 3),
 ('ZRD004','DEMO04-ZRD004','Demo Participant 04','@demo04','Demo profile. Replace with real resident information from the admin dashboard.','AI & data systems', true, 4);

insert into public.voting_days (day_number, label, is_open, vote_price_zec) values (1, 'Day 1', true, '');

insert into public.schedule_items (day_label, time_label, session_title, facilitator, description, sort_order) values
 ('[DAY 1]','[TIME]','Opening & Residency Orientation','[FACILITATOR]','Placeholder session. Update from the admin dashboard.',1),
 ('[DAY 1]','[TIME]','Introduction to Privacy Technology','[FACILITATOR]','Placeholder session. Update from the admin dashboard.',2),
 ('[DAY 2]','[TIME]','Zcash & Shielded Transactions Workshop','[FACILITATOR]','Placeholder session. Update from the admin dashboard.',3),
 ('[DAY 2]','[TIME]','Project Building Sprint','[FACILITATOR]','Placeholder session. Update from the admin dashboard.',4),
 ('[DAY 3]','[TIME]','Mentorship & Demo Day','[FACILITATOR]','Placeholder session. Update from the admin dashboard.',5);

insert into public.faq_items (question, answer, sort_order) values
 ('What is the residency?','A technology residency organised by ZOERD Privacy Blockchain & AI Innovation Hub in collaboration with Zcash Ghana, bringing developers, builders, researchers and innovators together to learn and build with privacy-focused blockchain technology.',1),
 ('Who is organizing it?','ZOERD Privacy Blockchain & AI Innovation Hub, in collaboration with Zcash Ghana.',2),
 ('Who are the participants?','Residents are listed in the Meet the Residents section. Demo profiles are shown until the official list is published.',3),
 ('How does voting work?','You send the required amount of ZEC to the official voting wallet and include the participant tag in the transaction memo. Your transaction is verified before the vote is counted.',4),
 ('How much does one vote cost?','[TO BE CONFIRMED] — the official ZEC amount per vote is set by the organisers and shown in the voting panel.',5),
 ('Where do I send Zcash?','Only to the official voting wallet shown in the voting panel. The support wallet is a different address and is not used for voting.',6),
 ('What should I put in the memo?','The participant tag exactly as shown on their card, for example DEMO01-ZRD001.',7),
 ('What happens if I forget the memo?','The team cannot automatically associate your vote transaction with a participant. Contact the organisers with your transaction ID.',8),
 ('How is my vote verified?','Your vote transaction is checked against the official voting wallet, amount, memo tag, confirmation status and voting day before the vote is counted.',9),
 ('When does voting close?','Each voting day has its own opening and closing time, shown in the Daily Participant Voting section.',10),
 ('Can I vote multiple times?','[TO BE CONFIRMED]',11),
 ('Can I vote every day?','Voting is organised per day. Each open voting day accepts new votes.',12),
 ('How can I support the event?','Use the Support the Residency section and send ZEC to the dedicated support wallet.',13),
 ('Where can I watch the livestream?','On the ZOERD Hub TV YouTube channel, linked in the livestream section.',14),
 ('What happens if my transaction is not verified?','It is marked rejected or duplicate and no vote is counted. Contact the organisers if you believe this is an error.',15);
