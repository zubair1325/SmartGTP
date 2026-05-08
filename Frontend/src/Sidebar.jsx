import "./Sidebar.css";
import { useContext, setState, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";

function Sidebar() {
  const { allThreads, setAllThreads, currentThreadId } = useContext(MyContext);

  const getAllThreads = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/thread/");
      const res = await response.json();
      console.log(res);
      const filteredData = res.map((thread) => ({
        threadId: thread.threadId,
        title: thread.title,
      }));
      console.log(filteredData);
      setAllThreads(filteredData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllThreads();
  }, [currentThreadId]);
  return (
    <section className="sidebar">
      <button>
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
          <li key={index}>{thread.title}</li>
        ))}
      </ul>
      <div className="sing">
        <p>By Md. Zubair Rahman</p>
      </div>
    </section>
  );
}

export default Sidebar;
