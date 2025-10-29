📝 Task Management App

A full-stack Task Management Application built using React, Node.js, Express, and MongoDB, with Tailwind CSS for a modern and responsive UI.

The app allows users to create, read, update, and delete (CRUD) tasks, along with an AI-powered task creation feature integrated via OpenAI.

🚀 Features

✨ AI-Assisted Task Creation — Automatically generates task titles and descriptions using OpenAI.

📄 Read Tasks — View details for each saved task.

🔄 Update Tasks — Modify existing task information easily.

❌ Delete Tasks — Remove individual tasks with confirmation.

📱 Responsive UI — Fully optimized for both mobile and desktop.

🔐 Secure Backend — Integrated with MongoDB and supports planned bcrypt password encryption.

🧠 AI Feature Description

The AI feature is implemented on the Create Task page.
When the user enters a partial title or description, the app calls the OpenAI API to generate a suitable AI-based description and task suggestions automatically.

This feature enhances productivity by helping users quickly define their tasks with minimal manual input.

🛠️ Tech Stack
Frontend

React (Vite)

Tailwind CSS

Backend

Node.js

Express.js

MongoDB

AI Integration

OpenAI API

Hosting / Deployment

Vercel
(Configured via vite.config.js and vercel.json)

⚙️ Environment Variables

Create a .env file in both frontend and backend directories.

Backend (.env)
MONGO_URI=mongodb+srv://shivamti2222_db_user:jcikg7DioMgpOOdQ@cluster0.m3xkbg6.mongodb.net/task-management-app?retryWrites=true&w=majority
5034bc5fb3c23ef5799199fbcc284a4fc84f61600fcc72e206cfe8bde16c04d1e47abcccfb3b92102f57b8339ffbb7ef07dd4387afaa97abb2b9bdace8d29c20accdf92c167e33636f21dffbc02239685241218c4ab2a41353c4b3419e6e0dfb
OPENAI_API_KEY=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

Frontend (.env)
VITE_API_BASE_URL=https://task-management-backend-woad-seven.vercel.app

💻 Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/shivam13456/task-management/tree/main/frontend/task-management-frontend
cd task-management-app

2️⃣ Setup the Backend
cd backend
npm install
npm start

3️⃣ Setup the Frontend
cd frontend
npm install
npm run dev

🧩 Folder Structure
task-management-app/
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── models/
├── frontend/
│   ├── src/
│   ├── components/
│   └── pages/
└── README.md

Frontend URL: ====>
    https://task-management-fron-btrw1vyu3-shivam-tiwaris-projects-42c62f37.vercel.app