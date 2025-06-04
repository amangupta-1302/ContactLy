import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import SettingsPage from "./pages/SettingsPage";
import { Navbar } from "./components/Navbar";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { useThemeStore } from "./store/useThemeStore";
import UserInfo from "./pages/UserInfo";

function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="items-center justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="h-screen flex flex-col " data-theme={theme}>
        <Navbar />
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route
              path="/"
              element={authUser ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!authUser ? <SignupPage /> : <Navigate to="/" />}
            />
            <Route path="/settings" element={<SettingsPage />} />
            <Route
              path="/userinfo"
              element={
                authUser ? (
                  <UserInfo user={authUser} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
        <Toaster />
      </div>
    </>
  );
}

export default App;
