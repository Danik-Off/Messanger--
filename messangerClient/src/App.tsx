import "./App.scss";
import "./Colors.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatPage from "./pages/chat-page";
import ErrorPage from "./pages/error-page";
import SettingsPage from "./pages/settings-page";
import startWs from "./ws/client";
import LoginPage from "./pages/login-page";


function App() {
  startWs();
  const router = createBrowserRouter([
    {
      path: "/msgs",
      element: <ChatPage/>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: < LoginPage/>,
      errorElement: <ErrorPage />,
    },
    {
      path: "contacts/:contactId",
      element: <SettingsPage />,
    },
  ]);  
  
   

 const token = localStorage.getItem("token");
 
 if(!token)
 {
router.navigate("/login");
 }
 else{
  router.navigate("/msgs");
 }

 
 
  return (
    <div className="container" >
      <div className="page-container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
