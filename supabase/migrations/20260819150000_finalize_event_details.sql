update public.site_config
set
  event_date = '1–21 September 2026',
  duration = '3 Weeks',
  organizers = 'ZOERDHUB Privacy Blockchain & AI Innovation Hub',
  vote_price_zec = '0.01',
  x_url = 'https://x.com/zoerdhub',
  telegram_url = 'https://t.me/ZOERDHUBCOMMUNITY'
where id = 1;

update public.voting_days
set vote_price_zec = '0.01'
where vote_price_zec = '' or vote_price_zec = '[TO BE CONFIRMED]' or vote_price_zec = '0.001';

update public.schedule_items
set facilitator = 'ZOERDHUB', time_label = '1:00 PM WAT'
where session_title in ('Weekly Build Challenge + Community Voting', 'Rest / Community Engagement Day');

update public.schedule_items
set facilitator = 'ZOERDHUB'
where facilitator = 'ZOERD';

update public.faq_items
set answer = '0.01 ZEC — the cost for each vote is shown in the voting panel.'
where question = 'How much does one vote cost?';

update public.faq_items
set question = 'Where do I send ZEC?',
    answer = 'To the official voting wallet shown in the voting panel. The support wallet is different and is not used for voting.'
where question = 'Where do I send Zcash?';

update public.faq_items
set answer = 'Yes. You may cast multiple votes while voting is open.'
where question = 'Can I vote multiple times?';
