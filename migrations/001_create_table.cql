 CREATE TABLE IF NOT EXISTS short_url (
       id text PRIMARY KEY,
       original_url text,
       created_at timestamp,
       created_by text,
       created_by_organization text,
       name text
);

