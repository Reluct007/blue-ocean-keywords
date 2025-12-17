# 🚀 Deployment Guide

**Deploy Blue Ocean Keywords to Cloudflare Pages in 5 minutes.**

## Prerequisites

- GitHub account
- Cloudflare account (free tier works)
- Node.js 20+ (for local testing)

---

## Step 1: Upload to GitHub (2 minutes)

### Option A: GitHub Web Interface
1. Go to **github.com/new**
2. Repository name: `blue-ocean-keywords`
3. Upload all project files
4. Click **Create repository**

### Option B: Command Line
```bash
cd /Users/darling/Downloads/xiaomi
git init
git add .
git commit -m "🚀 Initial commit"
git branch -M main

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/blue-ocean-keywords.git
git push -u origin main
```

---

## Step 2: Connect to Cloudflare (2 minutes)

1. **Login to Cloudflare** → [dash.cloudflare.com](https://dash.cloudflare.com)

2. **Navigate to**: Workers & Pages → Create → Pages

3. **Connect to Git** → Select your repository

4. **Configure Build Settings**:
   ```
   Build command:      npm run export
   Build output dir:   out
   Root directory:     /
   ```

5. **Save and Deploy**
   → Cloudflare will automatically build and deploy
   → You'll get a `.pages.dev` domain instantly

---

## Step 3: Verify Deployment

### Access your site:
- **URL**: `https://your-project.pages.dev`
- **Custom domain**: Optional (Settings → Custom domains)

### Quick Tests:
1. ✅ Homepage loads
2. ✅ Input "fitness" and press Enter
3. ✅ See 15+ keywords appear
4. ✅ Filter shows Blue Ocean tags in green
5. ✅ Click a keyword for strategy popup
6. ✅ Chart visualizes data

---

## Advanced Configuration

### Custom Domain (Optional)

1. Cloudflare Dashboard → Pages → Your project
2. **Custom domains** → **Add domain**
3. Enter your domain (e.g., `keywords.yourdomain.com`)
4. Update DNS if needed

### Environment Variables (If using real APIs later)

```bash
# In Cloudflare Pages settings
NEXT_PUBLIC_API_KEY=your_key_here
```

---

## GitHub Actions Automation (Optional)

If you want auto-deploy on every push:

1. **Get Cloudflare API Token**:
   - Cloudflare → Profile → API Tokens
   - Create token with `Pages:Edit` permission

2. **Add GitHub Secrets**:
   - Repository → Settings → Secrets and variables → Actions
   - Add: `CLOUDFLARE_API_TOKEN`
   - Add: `CLOUDFLARE_ACCOUNT_ID`

3. **Push is now automatic!**

The `.github/workflows/deploy.yml` file is already included.

---

## Local Testing (Before Deploy)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# Visit http://localhost:3000

# 3. Test build
npm run export
# Check ./out folder for files

# 4. Preview build (optional)
npx serve out
```

---

## Troubleshooting

### Build Fails
- Check `package.json` scripts
- Verify Node.js version: `node -v`
- Check GitHub Actions logs

### Styles Not Loading
- Ensure `globals.css` is imported in `layout.jsx`
- Verify Tailwind config is correct

### Functionality Issues
- Check browser console for errors
- Test locally first: `npm run dev`

---

## Performance Optimization

### What Cloudflare provides automatically:
- ✅ Global CDN (200+ locations)
- ✅ Automatic HTTPS
- ✅ DDoS protection
- ✅ Brotli compression
- ✅ Edge caching

---

## Success Checklist

- [ ] Repository created on GitHub
- [ ] All files pushed to `main` branch
- [ ] Cloudflare Pages project created
- [ ] Build command: `npm run export`
- [ ] Build directory: `out`
- [ ] Site deployed successfully
- [ ] Homepage loads in <3 seconds
- [ ] Analysis works (test with "fitness")

---

## Next Steps After Deploy

1. **Monitor**: Cloudflare Analytics → Performance data
2. **Update**: Push changes to GitHub → Auto-deploys
3. **Share**: Share URL with users
4. **Scale**: Handles millions of requests for free

---

**Cost**: $0/month for standard usage
**Time**: ~5 minutes total
**Difficulty**: Low

*Ready to go live! 🎉*