---
inclusion: manual
---

# Deploy React App to AWS Amplify Hosting

Steps to deploy a React (Vite) portfolio project to AWS Amplify Hosting with GitHub.

## Prerequisites

- AWS CLI installed and configured (`aws configure` with access key + secret)
- GitHub account with a personal access token (repo scope)
- PowerShell execution policy set: `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`

## Step 1: Prepare the App for Deployment

1. Remove any Amplify backend imports from `src/main.jsx` if not using Amplify backend features:
   ```js
   // Remove these if present:
   // import { Amplify } from 'aws-amplify';
   // import outputs from '../amplify_outputs.json';
   // Amplify.configure(outputs);
   ```

2. Add `amplify.yml` to the project root:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - rm -rf node_modules package-lock.json
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
   ```
   Note: We remove `package-lock.json` in the build because Windows lock files don't include Linux-specific optional dependencies (like `@rollup/rollup-linux-x64-gnu`).

3. Make sure `.gitignore` includes:
   ```
   node_modules
   dist
   amplify_outputs.json
   .amplify/
   ```

## Step 2: Push to GitHub

1. Create a new repo on GitHub (github.com/new) — public, no README
2. Add the remote and push:
   ```bash
   git remote add github https://USERNAME:TOKEN@github.com/USERNAME/REPO-NAME.git
   git add .
   git commit -m "initial-deploy"
   git push -u github main
   ```
   Note: Use `cmd /c "git ..."` if PowerShell has issues with git commands.

## Step 3: Connect to Amplify Hosting

1. Go to AWS Console → search "AWS Amplify"
2. Click "Create new app"
3. Select GitHub → authorize → select repo and branch
4. Build settings should auto-detect from `amplify.yml`
5. Click "Save and deploy"

## Step 4: Verify

- Build takes ~2 minutes
- Live URL will be: `https://main.XXXXXXXXX.amplifyapp.com`
- If build fails, check the build log for `[ERROR]` lines

## Common Issues

| Issue | Fix |
|-------|-----|
| `npm ci` fails with lock file sync error | Use `npm install` instead of `npm ci` in amplify.yml |
| `@rollup/rollup-linux-x64-gnu` not found | Add `rm -rf node_modules package-lock.json` before `npm install` |
| `amplify_outputs.json` not found | Remove Amplify imports from main.jsx if not using backend |
| Git push 403 | Embed token in remote URL: `https://user:token@github.com/...` |
| PowerShell blocks npm/npx | Run `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` |
| `aws` not recognized | Install AWS CLI from %TEMP%\AWSCLIV2.msi, restart terminal |

## Mock API for Dead Backends

If the original API is down, replace `src/api/axios.js` with a mock that intercepts all requests:
- Create `src/api/mockData.js` with fake data matching what components expect
- Replace axios export with a mock object that returns promises with `{ data, status: 200 }`
- Normalize URLs (add leading `/` if missing) to handle both `Vendor` and `/Vendor` patterns
- Prefill login form for easy recruiter access
