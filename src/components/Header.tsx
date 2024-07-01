import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContextProvider";

const Header: FC<{ isUserLoggedIn?: boolean }> = ({ isUserLoggedIn }) => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  //   const isDashboardPage = () => window.location.pathname === "/dashboard";
  const isAuthPage = () => window.location.pathname === "/auth";
  //   const modal: HTMLDialogElement | null = document.getElementById('modal') as HTMLDialogElement;
  const {logoutUser} = useAuthContext()
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("dark");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark", JSON.stringify(true));
    }
  };

  useEffect(() => {
    const dark = localStorage.getItem("dark");
    if (dark) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const handleLogout=()=>{
    logoutUser!()
  }
  return (
    <header className="w-full">
      <nav className="container mx-auto p-4 flex justify-between items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#FFA500"
            className="size-10"
          >
            <path
              fill-rule="evenodd"
              d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 18.375V5.625Zm1.5 0v1.5c0 .207.168.375.375.375h1.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-1.5A.375.375 0 0 0 3 5.625Zm16.125-.375a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h1.5A.375.375 0 0 0 21 7.125v-1.5a.375.375 0 0 0-.375-.375h-1.5ZM21 9.375A.375.375 0 0 0 20.625 9h-1.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-1.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 0 0 .375-.375v-1.5Zm0 3.75a.375.375 0 0 0-.375-.375h-1.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h1.5a.375.375 0 0 0 .375-.375v-1.5ZM4.875 18.75a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-1.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375h1.5ZM3.375 15h1.5a.375.375 0 0 0 .375-.375v-1.5a.375.375 0 0 0-.375-.375h-1.5a.375.375 0 0 0-.375.375v1.5c0 .207.168.375.375.375Zm0-3.75h1.5a.375.375 0 0 0 .375-.375v-1.5A.375.375 0 0 0 4.875 9h-1.5A.375.375 0 0 0 3 9.375v1.5c0 .207.168.375.375.375Zm4.125 0a.75.75 0 0 0 0 1.5h9a.75.75 0 0 0 0-1.5h-9Z"
              clip-rule="evenodd"
            />
          </svg>

          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-sans ml-2">
            Transcode Stream
          </h1>
          {/* {isUserLoggedIn && isLogPage() && (
            <p onClick={(e)=>{
              e.stopPropagation()  // To prevent event bubbling
              navigate('/dashboard')}} className="ml-5 text-blue-400 underline hover:text-blue-600 cursor-pointer">
              dashboard
            </p>
          )} */}
        </div>

        <div className="flex items-center">
          {/* {isDashboardPage() &&
          <button
            className="inline-block align-baseline border dark:border-gray-300 border-black px-3 rounded py-1 mx-2 dark:hover:bg-slate-600 hover:bg-gray-300 font-semibold text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800"
            type="button"
            onClick={()=> modal.showModal()}
            
          >
            + Create Project
          </button>
          } */}
          {!isAuthPage() && (
            <button
              className="flex items-center align-baseline border dark:border-gray-300 border-black px-3 rounded py-1 mx-5 dark:hover:bg-slate-400 hover:bg-gray-300 font-semibold text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 "
              type="button"
              onClick={isUserLoggedIn ? handleLogout : () => navigate("/auth")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#ff0000"
                className="size-4 mr-2"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z"
                  clip-rule="evenodd"
                />
              </svg>
              {isUserLoggedIn ? "Logout" : "Login"}
            </button>
          )}

          <div className=" flex items-center justify-center">
            <label className="swap swap-rotate">
              {/* this hidden checkbox controls the state */}
              <input
                checked={!isDarkMode}
                type="checkbox"
                onChange={() => {
                  toggleDarkMode();
                }}
                className="theme-controller"
                value="dark"
              />

              {/* moon icon */}
              <svg
                className="swap-on h-10 w-10 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
              {/* sun icon */}
              <svg
                className="swap-off h-10 w-10 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            </label>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
