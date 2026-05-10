import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

import "highlight.js/styles/github-dark.css";
import "./Chat.css";

import { useContext, useEffect, useState } from "react";
import { MyContext } from "./MyContext.jsx";

function Chat() {
  const { newChat, prevChats, replay, sidebarHideIcon } = useContext(MyContext);

  const [latestReply, setLatestReply] = useState(null);

  // Format AI response into cleaner markdown
  const formatMarkdown = (text) => {
    if (!text) return "";

    return (
      text
        // Windows line endings
        .replace(/\r\n/g, "\n")

        // Convert HTML breaks
        .replace(/<br\s*\/?>/gi, "\n")

        // Convert bullets
        .replace(/•/g, "\n- ")

        // Remove excessive spacing
        .replace(/\n{3,}/g, "\n\n")

        // Convert tabs to markdown-style separators
        .replace(/\t/g, " | ")

        // Fix common broken markdown table rows
        .replace(/\| {2,}/g, "| ")

        // Prevent weird spacing
        .trim()
    );
  };

  // Typing animation

  useEffect(() => {
    if (replay == null) {
      return;
    }

    if (!prevChats?.length) return;

    let index = 0;

    const interval = setInterval(() => {
      setLatestReply(replay.slice(0, index + 1));

      index++;

      if (index >= replay.length) {
        clearInterval(interval);
      }
    }, 1);

    return () => clearInterval(interval);
  }, [replay]);

  return (
    <>
      {newChat && <h1>Start a New Chat!</h1>}

      <div className={sidebarHideIcon ? "chats expandChats" : "chats"}>
        {prevChats?.slice(0, -1).map((chat, index) => (
          <div
            key={index}
            className={chat.role === "user" ? "userDiv" : "gtpDiv"}
          >
            {chat.role === "user" ? (
              <p className="userMessage">{chat.content}</p>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {formatMarkdown(chat.content)}
              </ReactMarkdown>
            )}
          </div>
        ))}

        {prevChats.length > 0 && (
          <>
            {latestReply === null ? (
              <div className="gtpDiv">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {formatMarkdown(prevChats[prevChats.length - 1].content)}
                </ReactMarkdown>
              </div>
            ) : (
              <div className="gtpDiv">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {formatMarkdown(latestReply)}
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
