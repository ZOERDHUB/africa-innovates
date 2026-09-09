-- Hide former residents from public listings and voting while preserving
-- historical transactions that reference their participant records.
update public.participants
set
  is_active = false,
  voting_enabled = false,
  updated_at = now()
where participant_code in ('RES-001', 'RES-004', 'RES-006', 'RES-009');
