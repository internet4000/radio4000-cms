# Radio4000 Migrate

> This was supposed to be the new R4, but we've decided to scrap it for https://github.com/radio4000/components. Instead it is now a tool for migrating old Firebase channels to new PostgreSQL ones.

This is a React app to manage [radio4000.com](https://radio4000.com) data connected to a [supabase](https://supabase.io/) database/auth.

## Deployment

This repo is currently configured to deploy to migrate to https://migrate.radio4000.com via GitHub Pages.

## How to develop

### Pre-requisites

1. Have node (and optionally [nvm](https://github.com/nvm-sh/nvm)) installed on your system
2. `git clone` this repository
3. Create an account on [app.supabase.io](https://app.supabase.io)
4. Create a new Supabase project with a PostgreSQL database

### Initialize the PostgreSQL database on Supabase

In order to have the database ready to work with the radio4000-cms, we
need to initialize it with the correct tables and policy/security rules.

To do this, see https://github.com/radio4000/supabase#readme

### Retrieve the Supabase keys as environment variables

1. First copy the file `.env.example` to `.env`. This is where we will enter the keys
1. Login to [app.supabase.io](https://app.supabase.io)
2. Choose your project and go to `Settings > API`
4. Copy the values of the keys: "Config URL" and "anon public" into your new file

> Note: you will need to restart the local server after you have copied the keys.

### Local development server

1. Run `npm install` to install all packages the project depends on
2. Run `npm start` to start the local development server

> Note: don't forget to initialize the database table, and update the `.env` file with the correct values (read the docs above).

## Documentation

- [Supabase](https://supabase.io/docs) & [Supabase JavaScript client](https://supabase.io/docs/reference/javascript/supabase-client)
- [PostgreSQL Policies](https://www.postgresql.org/docs/current/sql-createpolicy.html)
