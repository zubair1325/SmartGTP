import { v4 as uuidv4 } from "uuid";

import "./App.css";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { MyContext } from "./MyContext";
import { useState } from "react";

function App() {
  const [prompt, setPrompt] = useState("");
  const [replay, setReplay] = useState(null);
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [currentThreadId, setCurrentThreadId] = useState(uuidv4());
  const [allThreads, setAllThreads] = useState([]);
  const provideValues = {
    prompt,
    setPrompt,
    replay,
    setReplay,
    currentThreadId,
    setCurrentThreadId,
    newChat,
    setNewChat,
    prevChats,
    setPrevChats,
    allThreads,
    setAllThreads,
  };
  return (
    <div className="app container-fluid">
      <MyContext.Provider value={provideValues}>
        <Sidebar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  );
}

export default App;
