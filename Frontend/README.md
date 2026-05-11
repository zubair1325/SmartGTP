# SmartGTP Frontend 🚀

The SmartGTP Frontend is a modern AI chat interface inspired by ChatGPT, built using **React.js**.
It provides a smooth conversational experience with:

* 💬 AI Chat UI
* 🔐 Authentication Pages
* 📱 Fully Responsive Design
* 🎤 Voice-to-Text Input
* 📝 Markdown Rendering
* ✨ Typing Animation
* 📂 Thread-based Conversations

---

# 🌟 Features

## 🔐 Authentication

* Login Page
* Signup Page
* Protected Routes
* User Session Persistence using `localStorage`

---

## 💬 AI Chat Interface

* ChatGPT-style UI
* Real-time conversation rendering
* Dynamic thread routing
* Shareable chat links
* Responsive message layout

---

## 🧠 Markdown Support

AI responses support:

* Tables
* Lists
* Code blocks
* Syntax Highlighting
* Links
* Blockquotes
* Headings

Implemented using:

* `react-markdown`
* `remark-gfm`
* `rehype-highlight`

---

# 🎤 Speech-to-Text

Users can:

* Record voice messages
* Convert speech into text
* Automatically fill chat input

Built using:

* Browser MediaRecorder API
* Microphone access
* Backend transcription API

---

# 📱 Responsive Design

The application is fully responsive and optimized for:

* Desktop
* Tablet
* Mobile devices

Features include:

* Mobile sidebar toggle
* Adaptive chat width
* Responsive auth forms
* Mobile-friendly navigation

---

# ⚡ Typing Animation

AI responses appear with a smooth typing effect for a more natural conversational experience.

---

# 🧰 Tech Stack

## Core

* React.js
* React Router DOM
* Context API

---

## Markdown Rendering

* react-markdown
* remark-gfm
* rehype-highlight

---

## Utilities

* UUID
* React Spinners

---

## Styling

* CSS3
* Responsive Flexbox Layout
* Custom Animations

---

# 📂 Frontend Folder Structure

```bash id="xwnvl0"
Frontend/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── ChatLayout.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   │
│   ├── Chat.jsx
│   ├── Chat.css
│   │
│   ├── ChatWindow.jsx
│   ├── ChatWindow.css
│   │
│   ├── Sidebar.jsx
│   ├── Sidebar.css
│   │
│   ├── MyContext.jsx
│   │
│   └── Auth.css
│
├── package.json
└── vite.config.js
```

---

# ⚙️ Installation

# 1️⃣ Clone Repository

```bash id="8b7ybd"
git clone https://github.com/zubair1325/SmartGTP.git
```

---

# 2️⃣ Navigate To Frontend

```bash id="p85sp8"
cd SmartGTP/Frontend
```

---

# 3️⃣ Install Dependencies

```bash id="jlwmj8"
npm install
```

---

# ▶️ Run Frontend

```bash id="5rhnkc"
npm run dev
```

The app will run on:

```txt id="8b6ocp"
http://localhost:5173
```

---

# 🔑 Frontend Dependencies

```json id="nwl4uv"
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

# 🧠 Main Components

# App.jsx

Handles:

* Global routes
* Protected routes
* Context provider
* User session state

---

# ChatWindow.jsx

Handles:

* Sending messages
* Speech recording
* AI response loading
* Share links
* User profile dropdown
* Chat input area

---

# Chat.jsx

Handles:

* Chat rendering
* Markdown formatting
* Syntax highlighting
* Typing animation

---

# Sidebar.jsx

Handles:

* Thread history
* Thread switching
* New chat creation
* Thread deletion
* Mobile sidebar toggle

---

# Login.jsx & Signup.jsx

Handles:

* Authentication forms
* Validation
* Error handling
* API requests

---

# 🎨 Styling System

The project uses pure CSS with:

* Responsive breakpoints
* Flexbox layouts
* Custom loaders
* Smooth transitions
* Dark mode UI

Main style files:

* `index.css`
* `Auth.css`
* `Chat.css`
* `Sidebar.css`
* `ChatWindow.css`

---

# 🔄 Routing System

Implemented using `react-router-dom`.

## Routes

```txt id="q5bbvm"
/login
/signup
/
/thread/:threadId
```

Protected routes automatically redirect unauthenticated users to the login page.

---

# 🧠 State Management

Global state is managed using:

```txt id="f7x4wy"
React Context API
```

Stored states include:

* Current user
* Current thread
* Previous chats
* Sidebar state
* Loading states
* Replay animation state

---

# 📡 Backend Connection

Frontend communicates with the backend using:

```txt id="w5rkrv"
Fetch API
```

Backend default URL:

```txt id="cbr2vp"
http://localhost:8080
```

---

# 🔒 Authentication Flow

1. User logs in/signup
2. JWT token received
3. Token stored in `localStorage`
4. Protected routes validate user existence
5. Token attached to API requests

---

# 🎤 Voice Recording Flow

1. User clicks microphone
2. Browser records audio
3. Audio converted to Blob
4. Sent to backend API
5. Transcribed text returned
6. Text auto-filled into chat input

---

# ✨ UI Highlights

* Smooth hover animations
* Dynamic textarea resizing
* Responsive sidebar
* Chat bubble styling
* Syntax-highlighted code blocks
* Loading spinner animations

---

# 🚀 Future Improvements

* Streaming AI responses
* Image upload support
* Voice conversations
* Theme switching
* PWA support
* Drag & drop uploads
* Chat export
* Better mobile gestures

---

# 🐛 Known Issues

* Initial typing animation may delay on first render
* Shared thread ownership validation can be improved
* Some markdown tables may overflow on very small screens

---

# 👨‍💻 Author

## Md. Zubair Rahman

### Links

GitHub:

```txt id="92h2dd"
https://github.com/zubair1325
```

LinkedIn:

```txt id="y3z7dh"
https://www.linkedin.com/in/md-zubair-rahman
```

---

# 📄 License

This project is licensed under the MIT License.

---

# ⭐ Support

If you like this project:

⭐ Star the repository
🍴 Fork the project
🛠 Contribute improvements

---

# 🙌 Acknowledgements

* React.js
* Vite
* Groq AI
* React Markdown
* Highlight.js
* OpenAI-inspired UI Design
