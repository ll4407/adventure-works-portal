# Adventure Works Portal

A responsive inventory management dashboard built with React. Features sales analytics, employee management, product catalog, vendor tracking, and purchasing workflows.

**Live Demo:** [https://main.d31nsucqb4vdhh.amplifyapp.com](https://main.d31nsucqb4vdhh.amplifyapp.com)

![React](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-6-purple) ![AWS](https://img.shields.io/badge/Deployed-AWS%20Amplify-orange)

## Features

- **Dashboard** — Sales summaries with weekly comparisons, low stock alerts, profit sparklines, and shift schedules
- **Products** — Catalog with product images and editable details; inventory tracking with quantity controls
- **Employees** — Sortable employee list with modal detail views and inline editing
- **Purchasing** — Vendor management with contacts/addresses; purchase order tracking
- **Sales** — Store and customer order views with pricing, shipping, and contact details
- **Settings** — Dark/light theme toggle with localStorage persistence
- **Authentication** — Protected routes with prefilled demo credentials for easy access

## Tech Stack

- **Frontend:** React, Redux Toolkit, React Router, React Hook Form
- **Styling:** CSS Modules, CSS Custom Properties (theming)
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Build:** Vite
- **Deployment:** AWS Amplify Hosting with CI/CD from GitHub

## Getting Started

```bash
# Clone the repo
git clone https://github.com/ll4407/adventure-works-portal.git
cd adventure-works-portal

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — login credentials are prefilled.

## Project Structure

```
src/
├── api/            # Mock API layer (axios interceptor + mock data)
├── components/     # UI components organized by feature
├── container/      # Page-level containers (Dashboard, Purchasing, etc.)
├── context/        # React context providers
├── hooks/          # Custom hooks
├── icons/          # SVG icon components
├── store/          # Redux slices
└── utilities/      # Shared constants and helpers
```

## Demo Credentials

The login form is prefilled for portfolio demonstration:
- **Email:** leuber.leuterio@company.com
- **Password:** demo1234

## Deployment

Deployed automatically via AWS Amplify on push to `main`. Build config is in `amplify.yml`.
