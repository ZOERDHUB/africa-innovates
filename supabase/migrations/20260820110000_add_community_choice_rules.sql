-- Community Choice is a support contribution attached to a verified Zcash transaction.
-- Wallet-level limits are applied during transaction verification because shielded transactions
-- intentionally do not expose a public sender address to the website.

update public.faq_items
set question = 'Can I vote multiple times?',
    answer = 'Yes. Each 0.01 ZEC verified community-support contribution counts as one Community Choice vote. A wallet may contribute a maximum of 10 verified votes for the same resident on a voting day.'
where question = 'Can I vote multiple times?';

update public.faq_items
set answer = 'No. Invalid, duplicate, late or incorrectly tagged transactions do not count as votes and are not refundable. Network and exchange fees do not count as votes.'
where question = 'What happens if my transaction is not verified?';

insert into public.faq_items (question, answer, sort_order)
select 'Do ZEC votes decide every award?',
       'No. Verified ZEC support votes determine the Community Choice Award only. Technical awards are assessed independently by facilitators and judges using project quality, implementation, daily challenges, open-source contribution and presentation/demo.',
       13
where not exists (select 1 from public.faq_items where question = 'Do ZEC votes decide every award?');

insert into public.faq_items (question, answer, sort_order)
select 'How are ties resolved?',
       'If verified Community Choice totals are tied when voting closes, the resident whose final verified vote was confirmed first ranks higher.',
       14
where not exists (select 1 from public.faq_items where question = 'How are ties resolved?');
