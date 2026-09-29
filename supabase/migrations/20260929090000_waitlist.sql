-- AGENYRA waitlist.
-- Access model: only the server (service_role) reads or writes these tables.
-- RLS is enabled with no policies, and anon/authenticated have no grants,
-- so nothing is reachable through the public Data API.

create extension if not exists pgcrypto with schema extensions;

create table public.waitlist (
  id          uuid primary key default extensions.gen_random_uuid(),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 1 and 120),
  email       text not null check (
                char_length(email) <= 254
                and email = lower(email)
                and email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$'
              ),
  phone       text check (phone is null or char_length(phone) <= 32),
  company     text check (company is null or char_length(company) <= 160),
  website     text check (website is null or (char_length(website) <= 300 and website ~* '^https?://')),
  linkedin    text check (linkedin is null or (char_length(linkedin) <= 300 and linkedin ~* '^https?://([a-z0-9-]+\.)*linkedin\.com(/|$)')),
  role        text check (role is null or role in (
                'ai_builder', 'founder', 'developer', 'investor', 'ai_user', 'researcher', 'other'
              )),
  interest    text[] not null default '{}' check (
                interest <@ array['discover', 'distribute', 'build_on', 'partnerships', 'other']::text[]
              ),
  message     text check (message is null or char_length(message) <= 2000),
  source      text not null default 'website' check (char_length(source) between 1 and 64),
  status      text not null default 'new' check (status in (
                'new', 'contacted', 'qualified', 'early_access', 'onboarded', 'rejected', 'do_not_contact'
              )),
  notes       text
);

comment on table public.waitlist is 'AGENYRA early-access waitlist. Server-only; never exposed to clients.';

create unique index waitlist_email_key on public.waitlist (lower(email));
create index waitlist_created_at_idx on public.waitlist (created_at desc);
create index waitlist_status_idx on public.waitlist (status);

create or replace function public.waitlist_set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger waitlist_set_updated_at
before update on public.waitlist
for each row execute function public.waitlist_set_updated_at();

alter table public.waitlist enable row level security;
revoke all on table public.waitlist from anon, authenticated;
grant select, insert, update, delete on table public.waitlist to service_role;

-- Rate limiting: hashed client IPs only, pruned after a day.
create table public.waitlist_attempts (
  id          bigint generated always as identity primary key,
  ip_hash     text not null check (char_length(ip_hash) = 64),
  created_at  timestamptz not null default now()
);

create index waitlist_attempts_ip_created_idx on public.waitlist_attempts (ip_hash, created_at desc);
create index waitlist_attempts_created_idx on public.waitlist_attempts (created_at);

alter table public.waitlist_attempts enable row level security;
revoke all on table public.waitlist_attempts from anon, authenticated;
grant select, insert, delete on table public.waitlist_attempts to service_role;

-- Records an attempt and returns false when the IP has reached p_max attempts within the window.
create or replace function public.waitlist_register_attempt(
  p_ip_hash text,
  p_max integer,
  p_window_seconds integer
)
returns boolean
language plpgsql
security invoker
set search_path = ''
as $$
declare
  recent integer;
begin
  delete from public.waitlist_attempts where created_at < now() - interval '1 day';

  select count(*) into recent
  from public.waitlist_attempts
  where ip_hash = p_ip_hash
    and created_at > now() - make_interval(secs => p_window_seconds);

  if recent >= p_max then
    return false;
  end if;

  insert into public.waitlist_attempts (ip_hash) values (p_ip_hash);
  return true;
end;
$$;

revoke execute on function public.waitlist_register_attempt(text, integer, integer) from public, anon, authenticated;
grant execute on function public.waitlist_register_attempt(text, integer, integer) to service_role;

revoke execute on function public.waitlist_set_updated_at() from public, anon, authenticated;
