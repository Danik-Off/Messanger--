import { createBrowserRouter } from "react-router-dom";
import ChatPage from "../pages/mainPage/main.page";
import ErrorPage from "../pages/error-page";
import LoginPage from "../pages/login-page";


const router = createBrowserRouter([
    {
      path: "/msg",
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