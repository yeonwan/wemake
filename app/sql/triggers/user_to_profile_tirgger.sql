drop function if exists public.handle_new_user CASCADE;

create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
    base_username text;
    unique_username text;
    username_exists boolean;
begin
    if new.raw_app_meta_data is not null then
        if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'email' then
            if new.raw_user_meta_data ? 'name' and new.raw_user_meta_data ? 'username' then
              insert into public.profiles (profile_id, name, username, role)
              values (new.id, new.raw_user_meta_data ->> 'name', new.raw_user_meta_data ->> 'username', 'Developer');
            else
              insert into public.profiles (profile_id, name, username, role)
              values (new.id, 'Anonymous', 'mr.' || substr(md5(random()::text), 1, 8), 'Developer');
            end if;
        end if;

        if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'kakao' then
            base_username := new.raw_user_meta_data ->> 'preferred_username';
            unique_username := base_username;
            username_exists := true;
            
            -- Keep trying until we find a unique username
            while username_exists loop
                select exists(
                    select 1 from public.profiles where username = unique_username
                ) into username_exists;
                
                if username_exists then
                    unique_username := base_username || '-' || substr(md5(random()::text), 1, 4);
                end if;
            end loop;
            
            insert into public.profiles (profile_id, name, username, role, avatar)
            values (new.id,
              new.raw_user_meta_data ->> 'name',
              unique_username,
              'Developer', 
              new.raw_user_meta_data ->> 'avatar_url');
        end if;

        if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'github' then
            base_username := new.raw_user_meta_data ->> 'user_name';
            unique_username := base_username;
            username_exists := true;
            
            -- Keep trying until we find a unique username
            while username_exists loop
                select exists(
                    select 1 from public.profiles where username = unique_username
                ) into username_exists;
                
                if username_exists then
                    unique_username := base_username || '-' || substr(md5(random()::text), 1, 4);
                end if;
            end loop;
            
            insert into public.profiles (profile_id, name, username, role, avatar)
            values (new.id,
              new.raw_user_meta_data ->> 'name',
              unique_username,
              'Developer',
              new.raw_user_meta_data ->> 'avatar_url');
        end if;
    end if;
    return new;
end;
$$;

create trigger user_to_profile_trigger
after insert on auth.users
for each row execute function public.handle_new_user();