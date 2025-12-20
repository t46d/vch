Release Notes — VeXachat

What I prepared:
- Fixed auth flows (sign up, sign in, guest fallback) with robust error handling.
- Hardened Supabase helpers to avoid build-time failures when env vars are missing.
- Fixed profile & chat services to be more resilient during server renders.
- Added deployment guide in DEPLOYMENT.md.
- Committed changes to branch and verified build locally (see notes).

Required environment variables (set these in Vercel or your environment):
- NEXT_PUBLIC_SUPABASE_URL=https://<your-project>.supabase.co
- NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-public-key>
- SUPABASE_SERVICE_ROLE_KEY=<service-role-key> (keep secret)
- NEXTAUTH_SECRET=<random-32-char>
- NEXTAUTH_URL=https://your-app.vercel.app

How to build locally (for testing):
1. Create a local `.env.local` with the variables above (do NOT commit it).
2. Install deps: `npm install`
3. Build: `npm run build`
4. Start: `npm run start`

Notes:
- The project will build without Supabase env vars, but runtime features that call Supabase will be no-ops until correct env vars are supplied.
- For realtime chat and nearby-users features, enable Supabase Realtime and populate `profiles` with `location` fields.

If you want, I can now:
- Add realtime subscriptions for chat messages.
- Implement nearby-users filtering and UI.
- Create a deployable zip excluding `node_modules` and `.next`.
