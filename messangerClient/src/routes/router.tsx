import { createBrowserRouter } from "react-router-dom";
import ChatPage from "../pages/chat-page";
import ErrorPage from "../pages/error-page";
import LoginPage from "../pages/login-page";


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

  ]);  
  export default router;