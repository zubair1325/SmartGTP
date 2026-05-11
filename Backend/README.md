# AI Chat Application 🚀

A full-stack AI-powered chat application built with **React**, **Node.js**, **Express**, **MongoDB**, and **Groq AI APIs**.
The application supports:

* 🔐 JWT Authentication
* 💬 Persistent Chat Threads
* 🧠 AI Chat Responses
* 🎤 Speech-to-Text Transcription
* 📁 Thread Management
* 👤 User-based Chat Ownership
* ⚡ Modern REST API Architecture

---

# 📌 Features

## 🔑 Authentication System

* User Signup
* User Login
* JWT-based Authentication
* Protected Routes
* Password Hashing using `bcryptjs`

---

## 💬 AI Chat System

* Create New Chat Threads
* Store Conversation History
* Persistent Messages in MongoDB
* AI-generated Responses using Groq API
* Thread Ownership Validation

---

## 🎤 Speech-to-Text

* Audio Upload using `multer`
* Audio Conversion using `ffmpeg`
* Speech Transcription using Groq Whisper API
* Supports `.webm` → `.wav` conversion

---

## 🗂 Chat Thread Management

* Fetch All User Threads
* Fetch Single Thread Messages
* Delete Chat Threads
* Check Thread Ownership

---

# 🛠 Tech Stack

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Authentication

* JWT
* bcryptjs

## AI & Speech

* Groq API
* Whisper Large V3 Turbo

## File Handling

* multer
* fluent-ffmpeg
* ffmpeg-static

---

# 📂 Project Structure

```bash
Backend/
│
├── middleware/
│   └── protect.js
│
├── models/
│   ├── User.js
│   └── thread.js
│
├── routers/
│   ├── auth.js
│   └── chat.js
│
├── utils/
│   ├── ExpressError.js
│   ├── openai.js
│   └── wrapAsync.js
│
├── uploads/
│
├── app.js
├── package.json
└── .env
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/zubair1325/SmartGTP.git
cd Backend
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=8080

MONGOOSE_URL=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GROQ_API_KEY=your_groq_api_key
```

---

# ▶️ Run The Server

## Development Mode

```bash
npm run dev
```

## Production Mode

```bash
npm start
```

---

# 📡 API Endpoints

# 🔐 Authentication Routes

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

## Get Current User

```http
GET /api/auth/me
```

### Headers

```http
Authorization: Bearer YOUR_TOKEN
```

---

# 💬 Chat Routes

## Get All Threads

```http
GET /api/thread
```

### Protected Route

---

## Get Single Thread

```http
GET /api/thread/:threadId
```

---

## Delete Thread

```http
DELETE /api/thread/:threadId
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
  "threadId": "thread-123",
  "message": "Hello AI"
}
```

---

## Check Thread Owner

```http
GET /api/thread/:threadId/owner
```

### Headers

```http
Authorization: Bearer YOUR_TOKEN
```

---

# 🎤 Speech-to-Text API

## Upload Audio

```http
POST /api/speech-to-text
```

### Form Data

| Key   | Type |
| ----- | ---- |
| audio | File |

### Supported Input

* `.webm`
* audio recordings from browser microphone

---

# 🧠 AI Model Used

## Chat Completion

```txt
groq/compound-mini
```

## Speech Recognition

```txt
whisper-large-v3-turbo
```

---

# 🔒 Security Features

* JWT Authentication
* Password Hashing
* Protected API Routes
* Ownership Validation
* Secure MongoDB Queries

---

# 📦 Important Packages

```json
{
  "bcryptjs": "^latest",
  "cors": "^latest",
  "dotenv": "^latest",
  "express": "^latest",
  "fluent-ffmpeg": "^latest",
  "ffmpeg-static": "^latest",
  "groq-sdk": "^latest",
  "jsonwebtoken": "^latest",
  "mongoose": "^latest",
  "multer": "^latest"
}
```

---

# 🧪 Example Authorization Header

```http
Authorization: Bearer eyJhbGciOiJIUzI1Ni...
```

---

# 🚀 Future Improvements

* Streaming AI Responses
* Real-time Typing Effect
* Image Upload Support
* Voice Chat
* Markdown Rendering
* Syntax Highlighting
* Multi-model AI Selection
* Chat Sharing
* Rate Limiting
* Refresh Tokens
* Docker Deployment

---

# 🐛 Error Handling

The application uses:

* Custom `ExpressError` class
* Async wrapper middleware
* Centralized error handling middleware

---

# 👨‍💻 Author

## Md. Zubair Rahman

Built with ❤️ using MERN Stack and Groq AI APIs.

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ Support

If you like this project:

* Give it a ⭐ on GitHub
* Fork the repository
* Contribute improvements

---

# 🙌 Acknowledgements

* Groq API
* MongoDB
* Express.js
* React.js
* Node.js
* OpenAI-compatible APIs
