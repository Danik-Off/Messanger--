import { GetWSUrl } from "../routes/routes";

function startWs() {
  
  const myWs = new WebSocket(GetWSUrl);
 
  myWs.onopen = function () {
    console.log("Connected");
    // You can send initial data after the WebSocket connection is established.
    wsSendPing();
  };

  myWs.onmessage = function (message) {
    console.log("Message: %s", message.data);
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
