⚙️ Setup and Run Instructions
Prerequisites
Node.js (version 16 or higher)

npm or yarn package manager

Installation
Clone the repository

bash
Copy
Edit
git clone <repository-url>
cd calendar-event-commander
Install dependencies

bash
Copy
Edit
npm install
# or
yarn install
Running the Project
bash
Copy
Edit
npm run dev
# or
yarn dev
Open your browser and go to:
http://localhost:8080

📅 Features Overview
Monthly Calendar View: Navigate between months using arrow buttons

Event Management: Click any day to add events; edit or delete by clicking existing events

Recurring Events: Supports daily, weekly, monthly, and custom recurrence options

Drag & Drop: Drag events between days to reschedule them

Search & Filter: Filter events by title or description using the search bar

Conflict Detection: Displays warnings for overlapping or conflicting events

Data Persistence: Events are saved automatically to the browser's local storage

🧱 Project Structure & Stack
React 18 with TypeScript

Vite for fast development and builds

Tailwind CSS for utility-first styling

shadcn/ui for reusable UI components

date-fns for precise date/time manipulation

State Management: React Hooks + Local Storage (no external libraries)

📝 Special Notes
Events persist across sessions using browser local storage

The calendar automatically highlights today’s date

Fully responsive layout supports desktop and mobile

This is a frontend-only application — no backend or server required

