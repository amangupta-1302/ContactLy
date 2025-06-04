import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, NotebookTabs, Settings, User } from "lucide-react";

export const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="border-b border-base-300 w-full fixed top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto p-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2.5 hover:opacity-80 transition-all "
            >
              <NotebookTabs className="size-8" />
              <h1 className="text-lg font-bold">ContactLy</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={"/userinfo"}
              className={`btn btn-sm gap-2 flex items-center transition-colors`}
            >
              <User className="size-5" />
              <span className="hidden sm:inline">Account</span>
            </Link>
            <Link
              to={"/settings"}
              className={`btn btn-sm gap-2 flex items-center transition-colors`}
            >
              <Settings className="size-5" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            {authUser && (
              <button
                className="btn btn-sm btn-outline gap-2 flex items-center transition-colors hover:bg-error hover:text-white "
                onClick={handleLogout}
              >
                <LogOut className="size-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
