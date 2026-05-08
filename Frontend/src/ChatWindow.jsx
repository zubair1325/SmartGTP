import { ScaleLoader } from "react-spinners";
import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
function ChatWindow() {
  const {
    prompt,
    setPrompt,
    replay,
    setReplay,
    currentThreadId,
    prevChats,
    setPrevChats,
  } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const getReplay = async () => {
    setLoading(true);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currentThreadId,
      }),
    };

    try {
      const response = await fetch("http://localhost:8080/api/chat/", options);
      const res = await response.json();
      console.log(res.reply);
      setReplay(res.reply);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (prompt && replay) {
      setPrevChats((prevChats) => {
        return [
          ...prevChats,
          { role: "user", content: prompt },
          { role: "assistant", content: replay },
        ];
      });
    }
    setPrompt("");
  }, [replay]);
  return (
    <div className="chatWindow">
      <div className="navbar">
        <span>
          SmartGTP <i className="fa-solid fa-angle-down"></i>
        </span>
        <div className="userIcon">
          <span>
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>
      <Chat></Chat>
      <ScaleLoader color="#ffffff" loading={loading} />
      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="Ask anythings"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? getReplay() : "")}
          ></input>
          <div id="submit" onClick={getReplay}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
        <p className="info">
          SmartGTP can make mistakes. Check important info.{" "}
          <a href="https://openai.com/policies/cookie-policy/">
            See Cookie Preferences
          </a>
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;
