import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Login from "./container/Login";
import { Home } from "./container/Home";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "/home",
          element: <ProtectedRoute element={<Home />} />,
        },
      ])}
    />
  );
}

export default App;
