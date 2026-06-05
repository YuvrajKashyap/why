create schema if not exists why;

create or replace function why.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists why.want_items (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(btrim(name)) > 0 and length(name) <= 160),
  notes text not null default '' check (length(notes) <= 2000),
  link text not null default '' check (length(link) <= 1000),
  price text not null default '' check (length(price) <= 120),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists set_want_items_updated_at on why.want_items;
create trigger set_want_items_updated_at
before update on why.want_items
for each row
execute function why.set_updated_at();

alter table why.want_items enable row level security;

revoke all on schema why from anon, authenticated;
revoke all on all tables in schema why from anon, authenticated;
revoke all on all routines in schema why from anon, authenticated;
revoke all on all sequences in schema why from anon, authenticated;

grant usage on schema why to service_role;
grant select, insert, update, delete on all tables in schema why to service_role;
grant execute on all routines in schema why to service_role;
grant usage, select on all sequences in schema why to service_role;

alter default privileges for role postgres in schema why
  revoke all on tables from anon, authenticated;
alter default privileges for role postgres in schema why
  revoke all on routines from anon, authenticated;
alter default privileges for role postgres in schema why
  revoke all on sequences from anon, authenticated;
alter default privileges for role postgres in schema why
  grant select, insert, update, delete on tables to service_role;
alter default privileges for role postgres in schema why
  grant execute on routines to service_role;
alter default privileges for role postgres in schema why
  grant usage, select on sequences to service_role;

create index if not exists want_items_created_at_idx
  on why.want_items (created_at);
