import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Login from "./container/Login";
import { Home } from "./container/Home";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
