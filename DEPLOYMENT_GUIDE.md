# 🚀 Render Deployment Guide

## Step 1: Create PostgreSQL Database

1. Go to [render.com](https://render.com) → Click "New +"
2. Select **"PostgreSQL"**
3. Fill in:
   - **Name**: `carpool-social-db`
   - **Database Name**: `carpool_social`
   - **Region**: `Oregon (US West)`
   - **PostgreSQL Version**: `15`
   - **Plan**: `Free`
4. Click **"Create Database"**
5. **Wait 2-3 minutes** for database to be ready

## Step 2: Create Web Service

1. Click "New +" → Select **"Web Service"**
2. Click **"Build and deploy from a Git repository"**
3. Connect your GitHub: `neo4code/carpool-social`
4. Fill in settings:

### Basic Info
- **Name**: `carpool-social-backend`
- **Region**: `Oregon (US West)` (same as database)
- **Branch**: `main`
- **Root Directory**: `server`

### Build & Deploy
- **Runtime**: `Node`
- **Build Command**: `pnpm install && pnpm build`
- **Start Command**: `pnpm start`

### Environment Variables
Click "Advanced" → Add these environment variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `FIREBASE_PROJECT_ID` | `demo-project` |
| `PORT` | `10000` |

### Connect Database
- Click **"Add Environment Variable"**
- **Key**: `DATABASE_URL`
- **Value**: Select your `carpool-social-db` from dropdown

## Step 3: Deploy

1. Click **"Create Web Service"**
2. **Wait 5-10 minutes** for deployment
3. Your backend will be available at: `https://carpool-social-backend.onrender.com`

## Step 4: Test Your Backend

Once deployed, test these URLs:
- `https://your-backend-url.onrender.com/api/v1/hello`
- `https://your-backend-url.onrender.com/api/v1/db-test`

## Next Steps

After backend is deployed:
1. Deploy frontend to Vercel
2. Set `VITE_API_URL` to your backend URL
3. Configure your domain `carpoolsocial.com`

## Troubleshooting

If deployment fails:
1. Check build logs in Render dashboard
2. Make sure all environment variables are set
3. Verify database connection is working
