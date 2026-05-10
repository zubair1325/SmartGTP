import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { MyContext } from "../MyContext.jsx";
import Sidebar from "../Sidebar.jsx";
import ChatWindow from "../ChatWindow.jsx";
import "../App.css";

function ChatLayout() {
  const { threadId: urlThreadId } = useParams();
  const navigate = useNavigate();

  const {
    setCurrentThreadId,
    setNewChat,
    setPrevChats,
    setReplay,
    setPrompt,
    mobileSidebarOpen,
    setMobileSidebarOpen,
  } = useContext(MyContext);

  useEffect(() => {
    if (urlThreadId) {
      setCurrentThreadId(urlThreadId);
      setNewChat(false);
      setReplay(null);

      fetch(`http://localhost:8080/api/thread/${urlThreadId}`)
        .then((r) => r.json())
        .then((messages) => {
          setPrevChats(messages);
        })
        .catch(() => {
          navigate("/", { replace: true });
        });
    } else {
      setCurrentThreadId(uuidv4());
      setNewChat(true);
      setPrevChats([]);
      setReplay(null);
      setPrompt("");
    }
  }, [urlThreadId]);

  return (
    <div className="app">
      <div
        className={`sidebar-overlay ${mobileSidebarOpen ? "active" : ""}`}
        onClick={() => setMobileSidebarOpen(false)}
      />
      <Sidebar />
      <ChatWindow />
    </div>
  );
}

export default ChatLayout;
