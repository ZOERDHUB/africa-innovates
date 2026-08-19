update public.site_config
set
  location = 'ZOERDHUB Nigeria',
  vote_price_zec = '0.001'
where id = 1;

update public.voting_days
set vote_price_zec = '0.001'
where coalesce(nullif(trim(vote_price_zec), ''), '[TO BE CONFIRMED]') = '[TO BE CONFIRMED]';

update public.faq_items
set answer = 'The team cannot automatically associate your vote transaction with a participant. Contact the organisers with your transaction ID.'
where question = 'What happens if I forget the memo?';

update public.faq_items
set answer = 'Your vote transaction is checked against the official voting wallet, amount, memo tag, confirmation status and voting day before the vote is counted.'
where question = 'How is my vote verified?';
