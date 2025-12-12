# 🚀 VeXachat Deployment Guide

Complete guide for deploying VeXachat to production.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Supabase Setup](#supabase-setup)
3. [Vercel Deployment](#vercel-deployment)
4. [Environment Variables](#environment-variables)
5. [Database Migration](#database-migration)
6. [Post-Deployment](#post-deployment)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account
- ✅ Vercel account (free tier works)
- ✅ Supabase account (free tier works)
- ✅ Node.js 18+ installed locally
- ✅ Git installed locally

---

## Supabase Setup

### Step 1: Create a New Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - **Name**: vexachat-production
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
4. Click "Create new project"
5. Wait ~2 minutes for setup

### Step 2: Get API Keys

1. Go to **Settings** → **API**
2. Copy these values:
   - `Project URL` → This is your `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → This is your `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

### Step 3: Run Database Migration

1. Go to **SQL Editor** in your Supabase dashboard
2. Click "New Query"
3. Copy the entire contents of `supabase/schema.sql` from your project
4. Paste into the SQL editor
5. Click "Run" or press `Ctrl/Cmd + Enter`
6. Verify tables are created under **Table Editor**

### Step 4: Configure Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure **Email Templates**:
   - Customize confirmation email
   - Customize password reset email
4. Go to **Authentication** → **URL Configuration**
5. Add your production URL:
   ```
   Site URL: https://your-app.vercel.app
   Redirect URLs: https://your-app.vercel.app/auth/callback
   ```

### Step 5: Setup Storage (Optional)

1. Go to **Storage** → **Buckets**
2. Create buckets:
   - `avatars` (public)
   - `media` (public)
3. Set up policies:

```sql
-- Allow authenticated users to upload avatars
create policy "Allow authenticated users to upload avatars"
on storage.objects for insert
to authenticated
with check (bucket_id = 'avatars');

-- Allow public access to avatars
create policy "Allow public access to avatars"
on storage.objects for select
to public
using (bucket_id = 'avatars');
```

---

## Vercel Deployment

### Step 1: Push to GitHub

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - VeXachat v2.0"

# Add remote (replace with your repo)
git remote add origin https://github.com/yourusername/vexachat.git

# Push
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### Step 3: Add Environment Variables

In Vercel project settings, add:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXTAUTH_SECRET=generate_random_32_char_string
NEXTAUTH_URL=https://your-app.vercel.app
```

Generate `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### Step 4: Deploy

1. Click "Deploy"
2. Wait for deployment (~2-3 minutes)
3. Visit your deployed site!

---

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://abc.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key | `eyJhbGc...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (secret!) | `eyJhbGc...` |
| `NEXTAUTH_SECRET` | Session encryption key | `random_32_chars` |
| `NEXTAUTH_URL` | Production URL | `https://app.vercel.app` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | Direct DB connection | From Supabase |
| `DIRECT_URL` | Pooler connection | From Supabase |

---

## Post-Deployment

### 1. Test Authentication

- [ ] Visit `/signup` and create a test account
- [ ] Check email for verification
- [ ] Verify email and login
- [ ] Check `/profile` page loads

### 2. Test Database

- [ ] Go to Supabase Table Editor
- [ ] Verify `profiles` table has your test user
- [ ] Check all RLS policies are active

### 3. Configure Domain (Optional)

1. In Vercel, go to **Settings** → **Domains**
2. Add custom domain
3. Follow DNS configuration steps
4. Update Supabase URLs to use custom domain

### 4. Setup Analytics (Optional)

1. Add Vercel Analytics:
   ```bash
   npm install @vercel/analytics
   ```

2. Update `src/app/layout.jsx`:
   ```jsx
   import { Analytics } from '@vercel/analytics/react';
   
   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     );
   }
   ```

### 5. Setup Monitoring

1. Go to Vercel **Monitoring**
2. Enable:
   - Real User Monitoring
   - Error Tracking
   - Performance Insights

---

## Troubleshooting

### Issue: "Invalid JWT" Error

**Solution:**
1. Check `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
2. Verify environment variables are set in Vercel
3. Redeploy after updating variables

### Issue: Database Connection Failed

**Solution:**
1. Check `DATABASE_URL` format
2. Verify IP whitelist in Supabase (set to `0.0.0.0/0` for Vercel)
3. Check database password is correct

### Issue: Redirect Loop on Login

**Solution:**
1. Verify `NEXTAUTH_URL` matches your production URL
2. Check Supabase redirect URLs include `/auth/callback`
3. Clear cookies and try again

### Issue: Images Not Loading

**Solution:**
1. Check Supabase Storage buckets are public
2. Verify storage policies allow `select` for `public`
3. Check image URLs use correct bucket name

### Issue: Middleware Not Working

**Solution:**
1. Verify `middleware.js` is in `src/` directory
2. Check `matcher` config includes all protected routes
3. Ensure Supabase client is correctly initialized

### Issue: Build Fails on Vercel

**Solution:**
1. Check `package.json` has all dependencies
2. Run `npm install` locally and fix any errors
3. Verify `next.config.js` is valid
4. Check build logs for specific errors

---

## Performance Optimization

### 1. Enable Edge Functions

Update `next.config.js`:
```javascript
module.exports = {
  experimental: {
    runtime: 'edge'
  }
}
```

### 2. Add Image Optimization

```javascript
// next.config.js
module.exports = {
  images: {
    domains: ['your-project.supabase.co'],
    formats: ['image/avif', 'image/webp']
  }
}
```

### 3. Enable Caching

Add `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

---

## Security Checklist

- [ ] RLS policies enabled on all tables
- [ ] Service role key never exposed to client
- [ ] HTTPS enforced on production
- [ ] CORS configured correctly
- [ ] Rate limiting enabled on API routes
- [ ] Input validation on all forms
- [ ] SQL injection protection (use parameterized queries)
- [ ] XSS protection (React escapes by default)
- [ ] CSRF protection (via SameSite cookies)

---

## Backup Strategy

### Daily Automated Backups

Supabase automatically backs up your database daily. To manually backup:

1. Go to **Database** → **Backups**
2. Click "Create Backup"
3. Download backup file

### Restore from Backup

```bash
# Using Supabase CLI
supabase db restore --db-url postgresql://...
```

---

## Scaling Considerations

### Database

- Free tier: 500MB storage, 2GB bandwidth
- Upgrade: Pro plan for 8GB storage, 50GB bandwidth

### Vercel

- Free tier: 100GB bandwidth
- Upgrade: Pro plan for 1TB bandwidth

### CDN

Consider adding Cloudflare for:
- DDoS protection
- CDN caching
- Better global performance

---

## Maintenance

### Weekly Tasks

- [ ] Check error logs in Vercel
- [ ] Monitor database size in Supabase
- [ ] Review API usage and costs

### Monthly Tasks

- [ ] Update dependencies (`npm update`)
- [ ] Review and optimize slow queries
- [ ] Backup database manually
- [ ] Check security alerts

---

## Support

For issues:
- Email: vexa@vexachat.world
- GitHub: [Issues](https://github.com/yourusername/vexachat/issues)
- Supabase: [Discord](https://discord.supabase.com)
- Vercel: [Support](https://vercel.com/support)

---

**🎉 Congratulations! Your VeXachat is now live!**

Visit your app at: `https://your-app.vercel.app`
