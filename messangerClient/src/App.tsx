import Header from "./components/header";
import "./App.scss";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ChatPage from "./pages/chat-page";
import ErrorPage from "./pages/error-page";
import SettingsPage from "./pages/settings-page";
import LeftMainMenu from "./components/leftMainMenu";
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

  return (
    <div className="container">
      <Header></Header>
     
      <div className="page-container">
      <LeftMainMenu></LeftMainMenu>
      <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
