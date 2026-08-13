revoke execute on function public.has_role(uuid, public.app_role) from public, anon;
grant execute on function public.has_role(uuid, public.app_role) to authenticated;
revoke execute on function public.submit_vote_transaction(uuid, text, text) from public;
revoke execute on function public.get_leaderboard(integer) from public;
grant execute on function public.submit_vote_transaction(uuid, text, text) to anon, authenticated;
grant execute on function public.get_leaderboard(integer) to anon, authenticated;