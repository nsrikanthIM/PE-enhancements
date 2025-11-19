# Medicare Plan Card - Local Setup Instructions

This is a **static UI application** that runs entirely in the browser with no backend dependencies.

## 📦 What You Need

- Node.js (version 18 or higher)
- npm (comes with Node.js)

## 🚀 How to Run Locally

After downloading and extracting the zip file:

### 1. Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

This will install all the required packages.

### 2. Run the Application

**For Static UI (No Backend - Recommended)**

Run Vite directly:

```bash
npx vite
```

The application will open at: **http://localhost:5173**

**Alternative: Use the convenience scripts**

Linux/Mac:
```bash
./run-static.sh
```

Windows:
```bash
run-static.bat
```

These scripts run the same `npx vite` command for you.

## 🏗️ Build for Production

To create a production build:

```bash
npm run build
```

This creates optimized files in the `dist` folder that you can deploy to any static hosting service.

To preview the production build locally:

```bash
npm run preview
```

## 📝 Note

This application uses:
- **Static mock data** (no database needed)
- **Frontend only** (no backend server)
- **React + Vite** for fast development
- **Tailwind CSS** for styling
- **Shadcn UI** components

All Medicare plan data is hardcoded in the `client/src/pages/home.tsx` file.

## 🎯 Features

- Medicare plan cards with circular progress indicators
- Plan comparison (up to 3 plans)
- PDF download modal with email form
- Separate modals for in-network doctors and pharmacies
- Fully responsive design
- Dark mode support

## ❓ Troubleshooting

If you get port conflicts, you can specify a different port:

```bash
npm run dev -- --port 3000
```

This will run the app on `http://localhost:3000` instead.
