-- Add the resident supplied in resident/abp.jpg.
-- Keep this separate from the original roster migration so deployed databases
-- receive the new resident as well.
insert into public.participants (
  participant_code,
  participant_tag,
  full_name,
  username,
  image_url,
  bio,
  specialization,
  is_demo,
  is_active,
  voting_enabled,
  sort_order
) values (
  'RES-012',
  'RES012',
  'abp',
  '@abp',
  '/residents/abp.jpg',
  '',
  '',
  false,
  true,
  true,
  12
)
on conflict (participant_code) do update set
  participant_tag = excluded.participant_tag,
  full_name = excluded.full_name,
  username = excluded.username,
  image_url = excluded.image_url,
  bio = excluded.bio,
  specialization = excluded.specialization,
  is_demo = excluded.is_demo,
  is_active = excluded.is_active,
  voting_enabled = excluded.voting_enabled,
  sort_order = excluded.sort_order;
