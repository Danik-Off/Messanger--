import { useDispatch, useSelector } from "react-redux";
import { GetWSUrl } from "../routes/routes";
import { messageAdded } from "../features/msgs/msgsSlice";
import { json } from "react-router-dom";

function startWs() {
  
  const myWs = new WebSocket(GetWSUrl);
  const dispatch = useDispatch();
  
  myWs.onopen = function () {
    console.log("Connected");
    
  };
  
  myWs.onmessage = function (message) {
    console.log("Message: %s", message.data);
    const obj = JSON.parse(message.data)
    dispatch(messageAdded(obj.msg as Message));
  };

  myWs.onerror = function (error) {
    console.error("WebSocket Error: " + error);
  };

  myWs.onclose = function (event) {
    if (event.wasClean) {
      console.log("Connection closed cleanly, code=" + event.code + ", reason=" + event.reason);
    } else {
      console.error("Connection abruptly closed");
    }
  };

  function wsSendEcho(value:string) {
    myWs.send(JSON.stringify({ action: "ECHO", data: value }));
  }

  function wsSendPing() {
    myWs.send(JSON.stringify({ action: "PING" }));
  }
}

// Call the startWs function to initiate the WebSocket connection.
export default startWs;
