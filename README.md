# Detail Genius Platform - Deployment Instructions

## Quick Deploy to Vercel (5 minutes)

### Step 1: Upload to Vercel

1. Go to **https://vercel.com/new**
2. Sign in with GitHub or email
3. Click **"Upload Project"** (or drag the `genius-web` folder)
4. Vercel will automatically detect Next.js

### Step 2: Configure Environment Variables

Click "Environment Variables" and add these:

```
NODE_ENV=production
```

(Supabase and Stripe keys will be added after you set those services up)

### Step 3: Deploy

1. Click **"Deploy"**
2. Wait ~60 seconds
3. You'll get a live URL: `https://genius-web-xxxxx.vercel.app`

---

## Next Steps After Deployment

### 1. Set Up Supabase Database

Follow: `directives/supabase_setup.md`

1. Create free Supabase project
2. Run the SQL in `directives/schema_definition.sql`
3. Get your API keys
4. Add to Vercel environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   ```

### 2. Set Up Stripe

1. Go to `stripe.com/dashboard`
2. Get your API keys
3. Add to Vercel:
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
   STRIPE_SECRET_KEY=sk_test_xxxxx
   ```

### 3. Set Up Twilio (Optional)

1. Buy phone number at `twilio.com`
2. Add to Vercel:
   ```
   TWILIO_ACCOUNT_SID=ACxxxxx
   TWILIO_AUTH_TOKEN=xxxxx
   TWILIO_PHONE_NUMBER=+12065551234
   ```

---

## View Your Live Site

**Admin Dashboard**: `https://your-url.vercel.app/`
**Booking Page**: `https://your-url.vercel.app/booking`

---

## Custom Domain (Optional)

To use `app.detailgenius.com`:

1. Go to Vercel project → Settings →domains
2. Add `app.detailgenius.com`
3. Follow DNS instructions

---

## Troubleshooting

**Build fails?**
- Check Vercel build logs
- Verify all dependencies in `package.json`

**Page loads but looks broken?**
- Check browser console for errors
- Verify Tailwind CSS is compiling

**Can't connect to database?**
- Verify Supabase URL and keys in environment variables
- Check Supabase project isn't paused (free tier)

---

## Local Development (Once Git is Installed)

```bash
npm install
npm run dev
```

Open `http://localhost:3000`
