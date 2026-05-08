import { v4 as uuidv4 } from "uuid";
import "./Sidebar.css";
import { useContext, useEffect } from "react";
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
    setSidebarHideIcon,
  } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thread/");
      const res = await response.json();
      console.log(res);
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
    setNewChat(true);
    setPrompt("");
    setReplay(null);
    setCurrentThreadId(uuidv4());
    setPrevChats([]);
  };
  const changeThread = async (threadId) => {
    console.log(threadId);
    setCurrentThreadId(threadId);
    try {
      const response = await fetch(
        `http://localhost:8080/api/thread/${threadId}`,
      );
      const res = await response.json();
      setPrevChats(res);
      setNewChat(false);
      setReplay(null);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteThread = async (threadId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/thread/${threadId}`,
        { method: "DELEte" },
      );
      const res = await response.json();
      console.log(res);
      setAllThreads((prev) =>
        prev.filter((thread) => thread.threadId != threadId),
      );
      if (threadId === currentThreadId) {
        createNewChat();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSideBarIcon = () => {
    setSidebarHideIcon(!sidebarHideIcon);
  };
  return (
    <section className="sidebar">
      <button onClick={createNewChat}>
        <img
          className="logo"
          src="../src/assets/blacklogo.png"
          alt="SmartGTP LoGo"
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
      </div>
      <div className="sideBarToggle">
        {sidebarHideIcon ? (
          <i
            className="fa-solid fa-angles-right showSideBar"
            onClick={toggleSideBarIcon}
          ></i>
        ) : (
          <i
            className="fa-solid fa-angles-left hideSideBar"
            onClick={toggleSideBarIcon}
          ></i>
        )}
      </div>
    </section>
  );
}

export default Sidebar;
