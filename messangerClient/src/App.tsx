import "./App.scss";
import "./Colors.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatPage from "./pages/chat-page";
import ErrorPage from "./pages/error-page";
import SettingsPage from "./pages/settings-page";
import startWs from "./ws/client";
import FileUploadWithProgressBar from "./pages/testUpload";


function App() {
  startWs();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ChatPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "contacts/:contactId",
      element: <SettingsPage />,
    },
  ]);  
  
   

 

 
 
  return (
    <div className="container" >
      <div className="page-container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
