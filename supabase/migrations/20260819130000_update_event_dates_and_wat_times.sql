update public.site_config
set event_date = '5–28 September 2026'
where id = 1;

update public.schedule_items
set time_label = case facilitator
  when 'zkSquirrel' then '7:00 PM WAT'
  when 'Lowo' then '7:00 PM WAT'
  when 'Dismad' then '7:00 PM WAT'
  when 'Gilmore' then '1:00 PM WAT'
  when 'Inspire_s' then '1:00 PM WAT'
  when 'ZOERD' then '1:00 PM WAT'
  when 'Vancube' then '1:00 PM WAT'
  else time_label
end;
