TimeVerse – Custom Event Calendar
A dynamic, responsive event calendar built with React and Tailwind CSS. Users can add, edit, delete, and reschedule both one-time and recurring events. Designed with a warm modern UI and smooth interactions, this app showcases advanced front-end capabilities with polished user experience features.

Features
Core Functionality
Monthly, Weekly, and Daily Views

Add, Edit, and Delete Events

Recurring Events: Daily, Weekly, Monthly, and Custom Intervals

Drag-and-Drop Rescheduling

Event Conflict Detection

Search Events by Title or Description

Persistent Storage using LocalStorage

Polished User Interface
Empty state illustrations for days with no events

Smooth transitions and hover interactions

Fully responsive layout optimized for mobile and desktop

Color-coded event cards with fade-in animation

ARIA support for accessibility

Animated toast notifications

Footer credit: "Built with ❤️ by Sreeja Pothuganti"

Tech Stack
React + Vite + TypeScript

Tailwind CSS with a custom warm theme

date-fns for date and time manipulation

Radix UI Toast for notifications

Native HTML5 Drag-and-Drop API

Getting Started
1. Clone the repository
bash
Copy
Edit
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
Then visit the app at: http://localhost:5173

Build for Production
bash
Copy
Edit
npm run build
To preview the production build locally:

bash
Copy
Edit
npm run preview
Deployment
This project is deployable on any static hosting platform such as Vercel, Netlify, or GitHub Pages.

Build Command: npm run build

Output Directory: dist

No backend or database is required.

Notes
Events are stored in the browser's localStorage.

No authentication or user management is included.

All recurrence logic and conflict detection is handled on the client side.

Author
Sreeja Pothuganti
Frontend Developer
Passionate about building clean, accessible, and delightful web interfaces.
