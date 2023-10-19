import express from "express";
import { WebSocketServer } from "ws";
import http from "http";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(bodyParser.json());

// Create a map to store authorized users' WebSocket sessions
const authorizedSessions = new Map();

// Middleware for validating the token when connecting via WebSocket
wss.on("connection", (ws, req) => {
  const token = req.url.substring(1); // Extract the token from the URL
  let user_id; // Define user_id at a higher scope

  getUserData(token)
    .then((response) => {
      console.log("Response:", response.data);
      user_id = response.data.id; // Assign user_id here

      if (user_id) {
        authorizedSessions.set(user_id, ws);
      } else {
        ws.close();
      }
    })
    .catch((error) => {
      // Handle any errors that occur
      console.error("Error:", error);
      ws.close();
    });

  ws.on("message", (message) => {
    if (user_id) {
      console.log(`Received from user ${user_id}: ${message}`);
    } else {
      console.log("Received a message from an unauthorized user.");
    }
  });

  ws.on("close", () => {
    if (user_id) {
      authorizedSessions.delete(user_id);
    }
  });
});

app.post("/api/data", (req, res) => {

  const secret_key_up = "data";

  const { secret_key,data, user_id } = req.body;

  if (secret_key_up===secret_key)
  {
    const ws = authorizedSessions.get(user_id);
    ws.send(JSON.stringify(data));
    res.status(200).send("Data sent over WebSocket");
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

function getUserData(token) {
  const url = "http://new.lspu-lipetsk.ru/api/user.get.php";
  return axios.get(url, {
    params: {
      token: token,
    },
  });
}
