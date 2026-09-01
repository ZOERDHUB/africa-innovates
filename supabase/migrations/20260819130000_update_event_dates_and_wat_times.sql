update public.site_config
set event_date = '5–28 September 2026'
where id = 1;

update public.schedule_items
set time_label = case facilitator
  when 'zkSquirrel' then '6:00 PM WAT'
  when 'Lowo' then '6:00 PM WAT'
  when 'Dismad' then '6:00 PM WAT'
  when 'Gilmore' then '12:00 PM WAT'
  when 'Inspire_s' then '12:00 PM WAT'
  when 'ZOERDHUB' then '12:00 PM WAT'
  when 'Vancube' then '12:00 PM WAT'
  else time_label
end;
