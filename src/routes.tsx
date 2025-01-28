import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import VerifyAccount from "./pages/VerifyAccount";
import { useStore } from "./store/store";
import { useShallow } from "zustand/react/shallow";
import useAuth from "./hooks/use-auth";
import LoadingSpinner from "./components/ui/loadingSpinner";
import VerifyMasterPassword from "./pages/VerifyMasterPassword";
import CreateMasterPassword from "./pages/CreateMasterPassword";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Auth Required Routes */}
        <Route
          path="/verify-account"
          element={
            <VerifyEmailRoute>
              <VerifyAccount />
            </VerifyEmailRoute>
          }
        />
        <Route
          path="/master-password"
          element={
            <VerifyMasterPasswordRoute>
              <VerifyMasterPassword />
            </VerifyMasterPasswordRoute>
          }
        />

        <Route
          path="/create-master-password"
          element={
            <CreateMasterPasswordRoute>
              <CreateMasterPassword />
            </CreateMasterPasswordRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

// Protected Route Wrapper Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { isEmailVerified, isMasterPasswordSet } = useStore(
    useShallow((state) => ({
      isEmailVerified: state.isEmailVerified,
      isMasterPasswordSet: state.isMasterPasswordSet,
    }))
  );
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Check authentication
  if (isAuthenticated == false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isMasterPasswordSet) {
    return <Navigate to="master-password" state={{ from: location }} replace />;
  }

  if (isEmailVerified == false) {
    return <Navigate to="verify-account" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

// // Public Route Wrapper Component
// const PublicRoute = ({ children }: { children: React.ReactNode }) => {
//   const { isAuthenticated } = useAuth();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";

//   if (isAuthenticated == null) {
//     return <LoadingSpinner />;
//   }

//   if (isAuthenticated == false) {
//     return <Navigate to={from} replace />;
//   }

//   return <>{children}</>;
// };

// Verify Account Route Wrapper Component
const VerifyEmailRoute = ({ children }: { children: React.ReactNode }) => {
  const { isEmailVerified } = useStore(
    useShallow((state) => ({
      isEmailVerified: state.isEmailVerified,
    }))
  );
  if (isEmailVerified == null) {
    return <Navigate to="/master-password" replace />;
  }

  if (isEmailVerified) {
    return <Navigate to="/master-password" replace />;
  }

  return <>{children}</>;
};

// Master password Route Wrapper Component
const VerifyMasterPasswordRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isAuthenticated, userData, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated == false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userData?.masterKeyCreated == false) {
    return (
      <Navigate
        to="/create-master-password"
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
};

// Master password Route Wrapper Component
const CreateMasterPasswordRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isAuthenticated, userData, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated == false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userData?.masterKeyCreated == true) {
    return (
      <Navigate to="/master-password" state={{ from: location }} replace />
    );
  }

  return <>{children}</>;
};
