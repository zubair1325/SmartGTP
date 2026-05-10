import { ScaleLoader } from "react-spinners";
import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    replay,
    setReplay,
    currentThreadId,
    newChat,
    setNewChat,
    setPrevChats,
    sidebarHideIcon,
    setSidebarHideIcon,
    mobileSidebarOpen,
    setMobileSidebarOpen,
    user,
    setUser,
  } = useContext(MyContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isOpenProfileDetails, setIsOpenProfileDetails] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareLink, setShareLink] = useState(false);
  const [copyIcon, setCopyIcon] = useState(false);
  const [chatOwnerStatus, setChatOwnerStatus] = useState(true);

  useEffect(() => {
    if (!currentThreadId) return;
    if (newChat) return;

    const checkOwnerStatus = async () => {
      try {
        const token = localStorage.getItem("smartgtp_token");

        const response = await fetch(
          `http://localhost:8080/api/thread/${currentThreadId}/owner`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const res = await response.json();

        setChatOwnerStatus(res.isOwner);
      } catch (error) {
        console.log(error);
        setChatOwnerStatus(false);
      }
    };

    checkOwnerStatus();
  }, [currentThreadId]);

  const getReplay = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setNewChat(false);

    const token = localStorage.getItem("smartgtp_token");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: prompt, threadId: currentThreadId }),
    };

    try {
      const response = await fetch("http://localhost:8080/api/chat", options);
      const res = await response.json();
      setReplay(res.reply);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (prompt && replay) {
      setPrevChats((prevChats) => [
        ...prevChats,
        { role: "user", content: prompt },
        { role: "assistant", content: replay },
      ]);

      // Update URL to reflect the current thread after first message
      navigate(`/thread/${currentThreadId}`, { replace: true });
    }

    setPrompt("");
  }, [replay]);

  const handleLogout = () => {
    localStorage.removeItem("smartgtp_user");
    setUser(null);
    navigate("/login");
  };

  // Close dropdowns when clicking outside
  const handleWindowClick = () => {
    setIsOpenProfileDetails(false);
    setIsSharing(false);
  };

  const shareUrl = `http://localhost:5173/thread/${currentThreadId}`;

  return (
    <div className="chatWindow" onClick={handleWindowClick}>
      <div className={sidebarHideIcon ? "navbar expandNavbar" : "navbar"}>
        {/* Hamburger — mobile only */}
        <button
          className="hamburgerBtn"
          onClick={(e) => {
            e.stopPropagation();
            setMobileSidebarOpen(!mobileSidebarOpen);
            setSidebarHideIcon(false);
          }}
          aria-label="Toggle sidebar"
        >
          <i className="fa-solid fa-bars"></i>
        </button>

        <span onClick={(e) => e.stopPropagation()}>
          SmartGTP{" "}
          <i
            className="fa-solid fa-angle-down"
            onClick={() => setIsSharing((prev) => !prev)}
          ></i>
          {isSharing && (
            <div className="dropDownSharing">
              <div
                className="dropDownItem"
                onClick={() => {
                  setShareLink(true);
                  setIsSharing(false);
                }}
              >
                <i className="fa-solid fa-share-nodes"></i> Share chat
              </div>
            </div>
          )}
        </span>

        <div
          className="userIcon"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpenProfileDetails((prev) => !prev);
          }}
        >
          <span title={user?.email || "Profile"}>
            {user?.name ? (
              user.name[0].toUpperCase()
            ) : (
              <i className="fa-solid fa-user"></i>
            )}
          </span>
        </div>
      </div>

      {/* Share Link Modal */}
      {shareLink && (
        <div className="chatShareLink" onClick={(e) => e.stopPropagation()}>
          <i
            className="fa-solid fa-circle-minus closeIcon"
            onClick={() => {
              setShareLink(false);
              setCopyIcon(false);
            }}
          ></i>
          <p className="shareLinkLabel">Thread API URL</p>
          <p className="shareLinkUrl">{shareUrl}</p>
          <div className="copyIconWrapper">
            {copyIcon ? (
              <span className="copySuccessMsg">
                <i className="fa-solid fa-square-check"></i> Copied!
              </span>
            ) : (
              <button
                className="copyBtn"
                onClick={() => {
                  navigator.clipboard.writeText(shareUrl);
                  setCopyIcon(true);
                }}
              >
                <i className="fa-solid fa-copy"></i> Copy link
              </button>
            )}
          </div>
        </div>
      )}

      {/* Profile Dropdown */}
      {isOpenProfileDetails && (
        <div className="dropDown" onClick={(e) => e.stopPropagation()}>
          {user?.name && (
            <div className="dropDownUser">
              <strong>{user.name}</strong>
              <small>{user.email}</small>
            </div>
          )}
          <div className="dropDownItem">
            <i className="fa-solid fa-square-up-right"></i>{" "}
            <a
              href="https://openai.com/business/chatgpt-pricing/"
              target="_blank"
              rel="noreferrer"
            >
              Upgrade plan
            </a>
          </div>
          <div className="dropDownItem logoutItem" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </div>
        </div>
      )}

      <Chat />

      <ScaleLoader color="#ffffff" loading={loading} />

      <div className="chatInput">
        {chatOwnerStatus && (
          <div className="inputBox">
            {/* <div className="uploadFile">
              <label htmlFor="fileUpload" className="uploadIcon">
                <i className="fa-solid fa-plus"></i>
              </label>
              <input type="file" id="fileUpload" style={{ display: "none" }} />
            </div> */}
            <textarea
              rows="1"
              placeholder="Ask anything..."
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${Math.min(e.target.scrollHeight, 180)}px`;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  getReplay();
                }
              }}
            ></textarea>
            <div id="submit" onClick={getReplay}>
              <i className="fa-solid fa-paper-plane"></i>
            </div>
          </div>
        )}
        <p className="info">
          SmartGTP can make mistakes. Check important info.{" "}
          <a
            href="https://openai.com/policies/cookie-policy/"
            target="_blank"
            rel="noreferrer"
          >
            See Cookie Preferences
          </a>
        </p>
      </div>

      <div className="sideBarToggle">
        <i
          className={`fa-solid ${
            sidebarHideIcon ? "fa-angles-right" : "fa-angles-left"
          }`}
          onClick={() => setSidebarHideIcon(!sidebarHideIcon)}
        ></i>
      </div>
    </div>
  );
}

export default ChatWindow;
