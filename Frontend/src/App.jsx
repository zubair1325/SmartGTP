import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ChatLayout from "./pages/ChatLayout.jsx";
import { MyContext } from "./MyContext";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [prompt, setPrompt] = useState("");
  const [replay, setReplay] = useState(null);
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [currentThreadId, setCurrentThreadId] = useState(uuidv4());
  const [allThreads, setAllThreads] = useState([]);
  const [sidebarHideIcon, setSidebarHideIcon] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("smartgtp_user");
    return saved ? JSON.parse(saved) : null;
  });

  const provideValues = {
    prompt, setPrompt,
    replay, setReplay,
    currentThreadId, setCurrentThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads,
    sidebarHideIcon, setSidebarHideIcon,
    mobileSidebarOpen, setMobileSidebarOpen,
    user, setUser,
  };

  return (
    <MyContext.Provider value={provideValues}>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" replace />} />
        <Route
          path="/"
          element={user ? <ChatLayout /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/thread/:threadId"
          element={user ? <ChatLayout /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MyContext.Provider>
  );
}

export default App;
