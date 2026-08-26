-- The local public/residents image filenames are the residents' usernames.
-- Keep the participant code as the public, non-sensitive resident ID.
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
) values
  ('RES-001', 'RES001', 'Scofield', '@Scofield', '/residents/Scofield.jpeg', '', '', false, true, true, 1),
  ('RES-002', 'RES002', 'Mustapha QAUNT', '@Mustapha_QAUNT', '/residents/Mustapha_QAUNT.jpg', '', '', false, true, true, 2),
  ('RES-003', 'RES003', 'Jemmy', '@Jemmy', '/residents/Jemmy.jpeg', '', '', false, true, true, 3),
  ('RES-004', 'RES004', 'IKE', '@IKE', '/residents/IKE.jpg', '', '', false, true, true, 4),
  ('RES-005', 'RES005', 'Hybridthegeek', '@Hybridthegeek', '/residents/Hybridthegeek.jpg', '', '', false, true, true, 5),
  ('RES-006', 'RES006', 'Gwill', '@Gwill', '/residents/Gwill.jpeg', '', '', false, true, true, 6),
  ('RES-007', 'RES007', 'angelnath', '@angelnath', '/residents/angelnath.jpg', '', '', false, true, true, 7),
  ('RES-008', 'RES008', 'Akwenuke Daniel', '@Akwenuke Daniel', '/residents/Akwenuke%20Daniel.jpeg', '', '', false, true, true, 8),
  ('RES-009', 'RES009', 'Dark Blanche', '@Dark_Blanche', '/residents/%40Dark_Blanche.jpg', '', '', false, true, true, 9),
  ('RES-010', 'RES010', '0xWeb3DevRel', '@0xWeb3DevRel', '/residents/%400xWeb3DevRel.jpg', '', '', false, true, true, 10),
  ('RES-011', 'RES011', 'Keoshua001', '@Keoshua001', '/residents/IMG-20260825-WA0016~2.jpg', '', '', false, true, true, 11)
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

-- Preserve any historical vote records while hiding the original placeholder profiles.
update public.participants
set is_active = false
where participant_code in ('ZRD001', 'ZRD002', 'ZRD003', 'ZRD004') and is_demo;
