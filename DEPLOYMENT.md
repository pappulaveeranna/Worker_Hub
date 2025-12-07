# Deployment Guide

## Frontend Deployment (Netlify)

### Option 1: Deploy via Netlify CLI

1. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Deploy from frontend directory:
```bash
cd frontend/frontend_ui
netlify deploy --prod
```

### Option 2: Deploy via Netlify Website

1. Go to https://app.netlify.com/
2. Click "Add new site" → "Deploy manually"
3. Drag and drop the `frontend/frontend_ui/build` folder
4. After deployment, go to Site settings → Environment variables
5. Add: `REACT_APP_API_URL` = `YOUR_BACKEND_URL/api`

## Backend Deployment Options

### Option 1: Render.com (Recommended - Free)
1. Go to https://render.com/
2. Create new Web Service
3. Connect your GitHub repository
4. Set build command: `cd backend && npm install`
5. Set start command: `cd backend && npm start`
6. Add environment variables:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT=5000`

### Option 2: Railway.app (Free)
1. Go to https://railway.app/
2. Create new project from GitHub
3. Add environment variables
4. Deploy

### Option 3: Heroku
1. Install Heroku CLI
2. Create Procfile in backend folder:
```
web: node server.js
```
3. Deploy:
```bash
cd backend
heroku create your-app-name
git push heroku main
```

## Important Notes

- Backend must be deployed first to get the API URL
- Update `REACT_APP_API_URL` in Netlify with your backend URL
- Make sure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Update CORS settings in backend to include your Netlify domain
