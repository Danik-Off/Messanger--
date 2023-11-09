import { useDispatch, useSelector } from "react-redux";
import {
  selectActiveDialog,
  selectDialogsState,
  setActiveDialogPeer,
} from "../features/dialogs/dialogSlice";
import "./chatWindow.scss";
import ItemMsg from "./itemMsg";
import MessageInput from "./messageInput";
import { useEffect, useRef, useState } from "react";
import {
  fetchMsgs,
  selectMsgs,
  selectMsgsState,
} from "../features/msgs/msgsSlice";
import LeftNavigation from "./leftMenu";
import logo from "../assets/logo.png";
import React from "react";

const ThemeContext = React.createContext(false);
function ChatWindow() {
  const dispatch = useDispatch();
  const actualDialog = useSelector(selectActiveDialog);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const msgs = useSelector(selectMsgs) as Message[];

  let VLB = false;
  if (window.innerWidth >= 600) {
    VLB = true;
  }
  const [visibleLeftMenu, setVisibleLeftMenu] = useState(VLB);

  const peer_id = actualDialog?.peer_id ?? 0;

  useEffect(() => {
    dispatch(fetchMsgs(peer_id) as any);
    scrollToBottom();
  }, [msgs.length, actualDialog]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const shoOrHide = () => {
    setVisibleLeftMenu(!visibleLeftMenu);
  };

  const newHeight = window.innerHeight;
  return (
    <>
      <div
        className="left-menu"
        style={{ display: visibleLeftMenu ? "flex" : "none" }}
      >
        <LeftNavigation onClickClose={shoOrHide}></LeftNavigation>
      </div>

      <div className="chat-window" style={{ height: newHeight + `px` }}>
        <div className="chat-header">
          <button onClick={shoOrHide}>☰</button>
          <h2>{actualDialog?.title}</h2>
          <a className="logo" href="https://lspu-lipetsk.ru/">
            <img src={logo}></img>
          </a>
        </div>
        <div className="chat-messages">
          {msgs.map((msg, i) => (
            <ItemMsg
              id={msg.id}
              text={msg.text}
              from={msg.from}
              dateTime={msg.dateTime}
              isRead={msg.isRead}
              attachments={msg.attachments}
              key={i}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
        <MessageInput></MessageInput>
      </div>
    </>
  );
}

export default ChatWindow;
