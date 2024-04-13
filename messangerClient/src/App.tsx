import "./App.scss";
import "./Colors.scss";
import {RouterProvider } from "react-router-dom";
// import startWs from "./ws/client";
import router from "./routes/router";

function App() { 
  // startWs();//Функционал сокеты - не реализовано

  const token = localStorage.getItem("token");

  if (token) {
    router.navigate("/login");
  } else {
    router.navigate("/msgs");
  }

  return (
    <div className="container">
      <div className="page-container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
