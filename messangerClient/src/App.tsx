import Header from "./components/header";
import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChatPage from "./pages/chat-page";
import ErrorPage from "./pages/error-page";
import SettingsPage from "./pages/settings-page";

function App() {
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
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  }

  return (
    <div className="container">
      <Header></Header>
      <div className="page-container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
