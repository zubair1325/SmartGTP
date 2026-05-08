// code from Chat.jsx

import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "./Chat.css";
import { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext.jsx";
function Chat() {
  const { newChat, prevChats, replay } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (replay == null) {
      setLatestReply(null);
      return;
    }
    if (!prevChats?.length) return;
    const content = replay.split(" ");
    let index = 0;
    const interval = setInterval(() => {
      setLatestReply(content.slice(0, index + 1).join(" "));
      index++;
      if (index >= content.length) clearInterval(interval);
    }, 3);

    return () => clearInterval(interval);
  }, [prevChats, replay]);

  return (
    <>
      {newChat && <h1>Start a New Chat!</h1>}

      <div className="chats">
        {prevChats?.slice(0, -1).map((chat, index) => (
          <div
            className={chat.role === "user" ? "userDiv" : "gtpDiv"}
            key={index}
          >
            {chat.role === "user" ? (
              <p className="userMessage">{chat.content}</p>
            ) : (
              <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                {chat.content}
              </ReactMarkdown>
            )}
          </div>
        ))}

        {prevChats.length > 0 && (
          <>
            {latestReply === null ? (
              <div className="gtpDiv" key={"non-typing"}>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {prevChats[prevChats.length - 1].content}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="gtpDiv" key={"typing"}>
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {latestReply}
                </ReactMarkdown>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Chat;
