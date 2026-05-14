TaskHub 🚀

TaskHub is a modern full-stack task management web application built with Next.js (App Router), Supabase, and Tailwind CSS. It helps users manage tasks efficiently with authentication, real-time database support, and a clean UI.


---

✨ Features

🔐 Authentication (Supabase Auth: login / register)

📝 Task Management (Create, update, delete tasks)

🔎 Search & Filter Tasks (debounced search via URL params)

📊 Priority System (low, medium, high)

📅 Due Date Tracking

👤 User-based Data Isolation (RLS)

🌙 Dark / Light Mode Support

📱 Responsive UI (mobile + desktop)



---

🛠️ Tech Stack

Framework: Next.js (App Router)

Language: TypeScript

Styling: Tailwind CSS

UI Components: shadcn/ui

Backend: Supabase (Auth + Database + RLS)

State Management: React Hooks

Validation: Zod

Notifications: Sonner Toast


---

🚀 Getting Started

1. Clone repository

git clone https://github.com/chitkokoaung1056/taskhub.git
cd taskhub

2. Install dependencies

npm install

3. Setup environment variables

NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

4. Run development server

npm run dev

5. Open in browser

http://localhost:3000


---

⚙️ Features in Detail

🔎 Smart Search

Debounced search input

Syncs with URL query parameters


🔐 Authentication Flow

Email/password signup

Login session persistence

Protected routes via middleware


🧠 Server Actions

Create task

Update task

Delete task

Export user data



---

📦 Build for Production

npm run build
npm start


---

📈 Future Improvements

📌 Drag & drop task board (Kanban)

📱 Mobile app (React Native)

🤖 AI task suggestions

📊 Analytics dashboard

👥 Team collaboration mode



---

🧑‍💻 Author

Built with ❤️ by Chit Ko Ko Aung


---

📄 License

This project is licensed under the MIT License.