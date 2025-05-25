# 🗓️ TimeVerse – Custom Event Calendar

A dynamic, responsive event calendar built with React and Tailwind CSS. Users can add, edit, delete, and reschedule both one-time and recurring events. Designed to provide a polished user experience with modern UI, drag-and-drop interactions, and offline persistence.

---

## 🚀 Features

### ✅ Core Functionality
- **Monthly, Weekly, and Daily Views**
- **Add/Edit/Delete Events**
- **Recurring Events** (Daily / Weekly / Monthly / Custom)
- **Drag-and-Drop Rescheduling**
- **Event Conflict Detection**
- **Live Search by Title or Description**
- **Persistent Local Storage**

### 🎨 UX Enhancements
- Empty state illustrations (e.g. “No events”)
- Color-coded events with fade-in animation
- ARIA accessibility for calendar and events
- Toast notifications with smooth transitions
- Fully responsive design for mobile + desktop
- Warm-themed UI with subtle gradients and modern styling
- Footer credits: Built with ❤️ by Sreeja Pothuganti

---

## 🛠️ Tech Stack

- **React + Vite**
- **TypeScript**
- **Tailwind CSS** (with custom warm theme)
- **date-fns** (for all date logic)
- **Radix UI Toast** (for accessible notifications)
- **HTML5 Drag-and-Drop** (native)

---

## 🧪 Setup Instructions

### 1. **Clone the repository**
```bash
git clone https://github.com/your-username/timeverse-calendar.git
cd timeverse-calendar

2. Install dependencies
bash
Copy
Edit
npm install
3. Start the development server
bash
Copy
Edit
npm run dev
Your app will be live at http://localhost:5173

📦 Build for Production
To build a production-ready static site:

bash
Copy
Edit
npm run build
To preview the built site:

bash
Copy
Edit
npm run preview
🌐 Deployment Notes
This app is ready to deploy on any static hosting platform like Vercel, Netlify, or GitHub Pages.
If using Vercel:

No extra config needed; just import your GitHub repo.

Make sure the build command is npm run build

Set output directory to dist

📄 Special Notes
No external backend or database is required — events are persisted locally using localStorage.

All recurring logic is computed at runtime and rendered dynamically.

The calendar is fully responsive and optimized for both desktop and mobile views.
