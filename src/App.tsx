import { Toaster } from "@/components/ui/toaster.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProvider } from "./components/ThemeProvider.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import MasterPassword from "./pages/MasterPassword.tsx";
import SignUp from "./pages/SignUp.tsx";
import VerifyAccount from "./pages/VerifyAccount.tsx";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/verify-account",
    element: <VerifyAccount />,
  },
  {
    path: "/master-password",
    element: <MasterPassword />,
  },
]);

export function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
