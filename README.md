# SmartGTP 🚀

SmartGTP is a modern AI-powered chat application inspired by ChatGPT, built using the **MERN Stack** with **Groq AI APIs** for ultra-fast AI responses and speech-to-text transcription.

The project includes:

* 🔐 JWT Authentication
* 💬 Persistent AI Chat Threads
* 🎤 Voice-to-Text Support
* 📁 Chat History Management
* 📱 Responsive UI
* ⚡ Real-time Typing Animation
* 🧠 AI Responses with Groq

---

# 🌐 Live Features

✅ User Authentication
✅ AI Chat Interface
✅ Thread-based Conversations
✅ Speech Recognition
✅ Responsive Sidebar
✅ Shareable Thread Links
✅ Markdown Rendering
✅ Code Syntax Highlighting
✅ Mobile Responsive Design

---

# 🛠 Tech Stack

## Frontend

* React.js
* React Router DOM
* Context API
* React Markdown
* Rehype Highlight
* Remark GFM
* React Spinners
* UUID

---

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

---

## Authentication

* JWT (jsonwebtoken)
* bcryptjs

---

## AI & Speech APIs

* Groq Chat Completion API
* Groq Whisper API

---

## File Handling

* Multer
* Fluent-ffmpeg
* ffmpeg-static

---

# 📂 Project Structure

```bash
SmartGTP/
│
├── backend/
│   ├── middleware/
│   │   └── protect.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── thread.js
│   │
│   ├── routers/
│   │   ├── auth.js
│   │   └── chat.js
│   │
│   ├── utils/
│   │   ├── ExpressError.js
│   │   ├── openai.js
│   │   └── wrapAsync.js
│   │
│   ├── uploads/
│   │
│   ├── app.js
│   └── .env
│
├── frontend/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── ChatLayout.jsx
│   │
│   ├── assets/
│   │
│   ├── App.jsx
│   ├── Sidebar.jsx
│   ├── Chat.jsx
│   ├── ChatWindow.jsx
│   ├── MyContext.jsx
│   ├── index.css
│   └── main.jsx
│
└── README.md
```

---

# ⚙️ Installation Guide

# 1️⃣ Clone The Repository

```bash
git clone https://github.com/zubair1325/SmartGTP.git

cd SmartGTP
```

---

# 2️⃣ Install Frontend Dependencies

```bash
cd Frontend
npm install
```

---

# 3️⃣ Install Backend Dependencies

```bash
cd ../Backend
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the `backend` folder.

```env
PORT=8080

MONGOOSE_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key

GROQ_API_KEY=your_groq_api_key
```

---

# ▶️ Run The Project

## Start Backend

```bash
cd Backend
node server.js nodemon server.js
```

---

## Start Frontend

```bash
cd Frontend
npm run dev
```

---

# 📡 API Endpoints

# 🔐 Authentication APIs

## Signup

```http
POST /api/auth/signup
```

### Request Body

```json
{
  "name": "Zubair",
  "email": "zubair@example.com",
  "password": "123456"
}
```

---

## Login

```http
POST /api/auth/login
```

### Request Body

```json
{
  "email": "zubair@example.com",
  "password": "123456"
}
```

---

## Current User

```http
GET /api/auth/me
```

### Headers

```http
Authorization: Bearer YOUR_TOKEN
```

---

# 💬 Chat APIs

## Get All Threads

```http
GET /api/thread
```

---

## Get Single Thread

```http
GET /api/thread/:threadId
```

---

## Send Chat Message

```http
POST /api/chat
```

### Headers

```http
Authorization: Bearer YOUR_TOKEN
```

### Request Body

```json
{
  "threadId": "thread-id",
  "message": "Hello AI"
}
```

---

## Delete Thread

```http
DELETE /api/thread/:threadId
```

---

## Check Thread Ownership

```http
GET /api/thread/:threadId/owner
```

---

# 🎤 Speech To Text API

## Upload Audio

```http
POST /api/speech-to-text
```

### Form Data

| Key   | Type |
| ----- | ---- |
| audio | File |

---

# 🧠 AI Models Used

## Chat Model

```txt
groq/compound-mini
```

---

## Speech Recognition Model

```txt
whisper-large-v3-turbo
```

---

# ✨ Frontend Features

## 🔥 Modern Chat UI

* ChatGPT-like interface
* Responsive layout
* Dark theme UI

---

## 📝 Markdown Support

* Tables
* Lists
* Code blocks
* Syntax highlighting
* Links
* Blockquotes

---

## 🎤 Voice Input

Users can:

* Record audio
* Convert speech to text
* Auto-fill chat input

---

## 📱 Responsive Design

Optimized for:

* Desktop
* Tablet
* Mobile devices

---

# 🔒 Security Features

* JWT Authentication
* Protected Routes
* Password Hashing
* User-based Thread Access
* Secure MongoDB Queries

---

# 📦 Main Dependencies

## Backend

```json
{
  "bcryptjs": "^latest",
  "cors": "^latest",
  "dotenv": "^latest",
  "express": "^latest",
  "ffmpeg-static": "^latest",
  "fluent-ffmpeg": "^latest",
  "groq-sdk": "^latest",
  "jsonwebtoken": "^latest",
  "mongoose": "^latest",
  "multer": "^latest"
}
```

---

## Frontend

```json
{
  "react": "^latest",
  "react-dom": "^latest",
  "react-router-dom": "^latest",
  "react-markdown": "^latest",
  "rehype-highlight": "^latest",
  "remark-gfm": "^latest",
  "react-spinners": "^latest",
  "uuid": "^latest"
}
```

---

# 🚀 Future Improvements

* Streaming AI Responses
* Image Upload Support
* Multiple AI Models
* Voice Conversations
* Chat Export
* Thread Sharing Permissions
* Rate Limiting
* Refresh Tokens
* Docker Deployment
* PWA Support

---

# 🐛 Known Improvements Needed

* Protect public thread routes
* Add refresh token authentication
* Improve audio upload validation
* Better loading skeletons
* AI response streaming
* Optimize thread fetching

---

# 👨‍💻 Author

## Md. Zubair Rahman

### Connect With Me

* GitHub:
  `https://github.com/zubair1325`

* LinkedIn:
  `https://www.linkedin.com/in/md-zubair-rahman`

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ Support The Project

If you like this project:

⭐ Star the repository
🍴 Fork the project
🛠 Contribute improvements

---

# 🙌 Acknowledgements

* Groq
* MongoDB
* Express.js
* React.js
* Node.js
* OpenAI-compatible APIs
