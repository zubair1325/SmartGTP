import { v4 as uuidv4 } from "uuid";
import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "./MyContext.jsx";

function Sidebar() {
  const {
    allThreads,
    setAllThreads,
    currentThreadId,
    setNewChat,
    setPrompt,
    setReplay,
    setCurrentThreadId,
    setPrevChats,
    sidebarHideIcon,
    mobileSidebarOpen,
    setMobileSidebarOpen,
  } = useContext(MyContext);

  const navigate = useNavigate();

  const getAllThreads = async () => {
    const token = localStorage.getItem("smartgtp_token");
    console.log(token);
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/thread`,
        options,
      );
      const res = await response.json();
      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      setAllThreads(filteredData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllThreads();
  }, [currentThreadId]);

  const createNewChat = () => {
    const newId = uuidv4();
    setNewChat(true);
    setPrompt("");
    setReplay(null);
    setCurrentThreadId(newId);
    setPrevChats([]);
    setMobileSidebarOpen(false);
    navigate("/");
  };

  const changeThread = async (threadId) => {
    setMobileSidebarOpen(false);
    // Navigate to the thread URL — ChatLayout will load it
    navigate(`/thread/${threadId}`);
  };

  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/thread/${threadId}`,
        { method: "DELETE" },
      );
      const res = await response.json();
      console.log(res);
      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId !== threadId),
      );
      if (threadId === currentThreadId) {
        createNewChat();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      className={`sidebar ${sidebarHideIcon ? "collapsed" : ""} ${
        mobileSidebarOpen ? "mobile-open" : ""
      }`}
    >
      <button onClick={createNewChat}>
        <img
          className="logo"
          src="/src/assets/blacklogo.png"
          alt="SmartGTP Logo"
        />
        <span>
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
      </button>

      <ul className="history">
        {allThreads?.map((thread, index) => (
          <li
            key={index}
            onClick={() => changeThread(thread.threadId)}
            className={thread.threadId === currentThreadId ? "highlighted" : ""}
          >
            {thread.title}{" "}
            <span>
              <i
                className="fa-solid fa-trash"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteThread(thread.threadId);
                }}
              ></i>
            </span>
          </li>
        ))}
      </ul>

      <div className="sing">
        <p>By Md. Zubair Rahman</p>
        <div className="accountInfo">
          <a
            href="https://www.linkedin.com/in/md-zubair-rahman"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-square-linkedin"></i> Linkedin
          </a>
          &nbsp;&nbsp;&nbsp;
          <a
            href="https://github.com/zubair1325/SmartGTP.git"
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-brands fa-github"></i> GitHub
          </a>
          <p>
            <i class="fa-solid fa-envelope"></i> zubair01325@gmail.com
          </p>
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
