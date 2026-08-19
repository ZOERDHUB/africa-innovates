update public.site_config
set
  event_kicker = 'ZOERDHUB × Zcash Ghana',
  event_date = '1–21 September 2026',
  duration = '3 Weeks'
where id = 1;

delete from public.schedule_items
where description = 'Placeholder session. Update from the admin dashboard.';

insert into public.schedule_items (day_label, time_label, session_title, facilitator, description, sort_order) values
  ('Sept. 2', '', 'Blockchain Fundamentals + Residency Orientation', 'zkSquirrel', 'Week 1 — Foundations', 1),
  ('Sept. 3', '', 'Financial Privacy + Privacy Challenge', 'zkSquirrel', 'Week 1 — Foundations', 2),
  ('Sept. 4', '', 'Zcash Architecture + Architecture Challenge', 'zkSquirrel', 'Week 1 — Foundations', 3),
  ('Sept. 5', '', 'Development Environment + Setup Challenge', 'zkSquirrel', 'Week 1 — Foundations', 4),
  ('Sept. 6', '', 'Wallet Development + Wallet Task', 'Lowo', 'Week 1 — Foundations', 5),
  ('Sept. 7', '', 'Weekly Build Challenge + Community Voting', '', 'Week 1 — Foundations', 6),
  ('Sept. 8', '', 'Rest / Community Engagement Day', '', 'Week 1 — Foundations', 7),
  ('Sept. 9', '', 'Shielded Payments + Shielded Transaction Challenge', 'Dismad', 'Week 2 — Building', 8),
  ('Sept. 10', '', 'Zcash SDKs + SDK Integration Task', 'Lowo', 'Week 2 — Building', 9),
  ('Sept. 11', '', 'Backend Development + API/Backend Challenge', 'Gilmore', 'Week 2 — Building', 10),
  ('Sept. 12', '', 'Full Stack Development + Full-Stack Task', 'Lowo', 'Week 2 — Building', 11),
  ('Sept. 13', '', 'Privacy Payment Applications + Privacy App Challenge', 'Inspire_s', 'Week 2 — Building', 12),
  ('Sept. 14', '', 'Security + Security Review Challenge', 'ZOERD', 'Week 2 — Building', 13),
  ('Sept. 15', '', 'Testing + Testing Challenge', 'ZOERD', 'Week 2 — Building', 14),
  ('Sept. 16', '', 'Production Development + Deployment Challenge', 'ZOERD', 'Week 3 — Ship, Open Source & Demo', 15),
  ('Sept. 17', '', 'Open Source Development + Contribution Challenge', 'Vancube', 'Week 3 — Ship, Open Source & Demo', 16),
  ('Sept. 18', '', 'Startup & Grant Writing + Project Pitch Challenge', 'Gilmore', 'Week 3 — Ship, Open Source & Demo', 17),
  ('Sept. 19', '', 'Demo Day Preparation + Final Project Review', 'ZOERD', 'Week 3 — Ship, Open Source & Demo', 18),
  ('Sept. 20', '', 'Demo Day + Gala Night', '', 'Final presentations, awards, recognition, networking and celebration.', 19);
