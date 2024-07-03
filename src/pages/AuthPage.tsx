import { FC, FormEvent, useEffect, useState } from "react";
import {
  ISignInErrorFormState,
  ISignInFormState,
  ISignUpErrorFormState,
  ISignUpFormState,
} from "../interfaces-ts/authInterfaces";
import { convertFieldErrorsToString } from "../utils/helper";
import {
  signInSchema,
  signUpSchema,
  validUserInput,
} from "../utils/zod/validateSchema";
import { useAuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../api-calls/authApis";
import { useCommonContext } from "../context/CommonContextProvider";

const AuthPage: FC = () => {
  const { user, fetchLoggedInUser } = useAuthContext();
  const navigate = useNavigate();
  const {setGlobalLoader,showErrorFromServer} = useCommonContext()
  useEffect(() => {
    if (user && user.hasOwnProperty("_id")) {
      navigate("/dashboard");
    }
  }, [user]);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [signupData, setSignupData] = useState<ISignUpFormState>({
    email: "",
    username: "",
    password: "",
    cnfPassword: "",
  });
  const [signupErrorData, setSignupErrorData] = useState<ISignUpErrorFormState>(
    {
      emailError: "",
      usernameError: "",
      passwordError: "",
      cnfPasswordError: "",
    }
  );
  const [signinData, setSigninData] = useState<ISignInFormState>({
    email: "",
    password: "",
  });
  const [signinErrorData, setSigninErrorData] = useState<ISignInErrorFormState>(
    {
      emailError: "",
      passwordError: "",
    }
  );
  const handleSignUpFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSignupErrorData(signupErrorData);
    if (signupData.password !== signupData.cnfPassword) {
      setSignupErrorData({
        ...signupErrorData,
        cnfPasswordError: "Password does not match",
      });
    } else {
      const { error, success } = validUserInput(signUpSchema, {
        email: signupData.email,
        username: signupData.username,
        password: signupData.password,
      });
      if (typeof error === "object" && !success) {
        if (typeof error === "object") {
          const fieldErrorObj = convertFieldErrorsToString(error!);
          if (fieldErrorObj) {
            setSignupErrorData({
              ...signupErrorData,
              emailError: fieldErrorObj.hasOwnProperty("email")
                ? fieldErrorObj.email
                : "",
              usernameError: fieldErrorObj.hasOwnProperty("username")
                ? fieldErrorObj.username
                : "",
              passwordError: fieldErrorObj.hasOwnProperty("password")
                ? fieldErrorObj.password
                : "",
            });
          }
        }
      } else {
        // signUpUser();
        setGlobalLoader(true)
        const { response, error } = await signUp({
          email: signupData.email,
          username: signupData.username,
          password: signupData.password,
        });
        if (error) {
          console.log("Something went wrong while sign up", error);
          setGlobalLoader(false)
          showErrorFromServer(error)
        }
        if (response && response.status) {
          setGlobalLoader(false)
          fetchLoggedInUser!();
        }
      }
    }
  };
  const handleSignInFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSigninErrorData(signinErrorData);

    const { error, success } = validUserInput(signInSchema, {
      email: signinData.email,
      password: signinData.password,
    });
    if (typeof error === "object" && !success) {
      if (typeof error === "object") {
        const fieldErrorObj = convertFieldErrorsToString(error!);
        if (fieldErrorObj) {
          setSigninErrorData({
            ...signinErrorData,
            emailError: fieldErrorObj.hasOwnProperty("email")
              ? fieldErrorObj.email
              : "",
            passwordError: fieldErrorObj.hasOwnProperty("password")
              ? fieldErrorObj.password
              : "",
          });
        }
      }
    } else {
      //   signInUser();
      setGlobalLoader(true)
      const { response, error } = await signIn({
        email: signinData.email,
        password: signinData.password,
      });
      if (error) {
        console.log("Something went wrong while sign in", error);
        setGlobalLoader(false)
        showErrorFromServer(error)
        }
        if (response && response.status) {
        setGlobalLoader(false)
        fetchLoggedInUser!();
      }
    }
  };
  const handleAuthToggle = () => {
    setIsLogin(!isLogin);
  };
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
  return (
    <div>
      <div className="flex bg-white dark:bg-black">
        <div className=" flex items-center justify-center ml-auto mr-10 mt-5">
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black">
        <div
          onClick={() => navigate("/")}
          className="flex items-center mb-[50px] cursor-pointer"
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
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 font-sans ml-2">
            Transcode Stream
          </h1>
        </div>
        <h2 className="text-lg font-bold mb-6 text-center text-black dark:text-white">
          {isLogin ? "Login" : "Create an Account"}
        </h2>
        <form
          onSubmit={isLogin ? handleSignInFormSubmit : handleSignUpFormSubmit}
        >
          {!isLogin && (
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-1 text-black dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="text-black w-[400px] px-3 py-2 border bg-gray-200 border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={signupData.username}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    username: e.target.value,
                  })
                }
              />
              {signupErrorData.usernameError && (
                <label
                  htmlFor="email"
                  className="block mb-2 text-md font-medium text-red-500"
                >
                  {signupErrorData.usernameError}
                </label>
              )}
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 text-black dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="text-black w-[400px] px-3 py-2 border bg-gray-200  border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={isLogin ? signinData.email : signupData.email}
              onChange={(e) =>
                isLogin
                  ? setSigninData({
                      ...signinData,
                      email: e.target.value,
                    })
                  : setSignupData({
                      ...signupData,
                      email: e.target.value,
                    })
              }
            />
            {(signupErrorData.emailError || signinErrorData.emailError) && (
              <label
                htmlFor="email"
                className="block mb-2 text-md font-medium text-red-500"
              >
                {isLogin
                  ? signinErrorData.emailError
                  : signupErrorData.emailError}
              </label>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 text-black dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="text-black w-[400px] px-3 py-2 border bg-gray-200 border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              value={isLogin ? signinData.password : signupData.password}
              onChange={(e) =>
                isLogin
                  ? setSigninData({
                      ...signinData,
                      password: e.target.value,
                    })
                  : setSignupData({
                      ...signupData,
                      password: e.target.value,
                    })
              }
            />
            {(signupErrorData.passwordError ||
              signinErrorData.passwordError) && (
              <label
                htmlFor="email"
                className="block mb-2 text-md font-medium text-red-500"
              >
                {isLogin
                  ? signinErrorData.passwordError
                  : signupErrorData.passwordError}
              </label>
            )}
          </div>
          {!isLogin && (
            <div className="mb-6">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium mb-1 text-black dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="text-black w-[400px] px-3 py-2 border bg-gray-200 border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={signupData.cnfPassword}
                onChange={(e) =>
                  setSignupData({
                    ...signupData,
                    cnfPassword: e.target.value,
                  })
                }
              />
              {signupErrorData.cnfPasswordError && (
                <label
                  htmlFor="email"
                  className="block mb-2 text-md font-medium text-red-500"
                >
                  {signupErrorData.cnfPasswordError}
                </label>
              )}
            </div>
          )}
          <button
            type="submit"
            className="w-[400px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <p className="text-black dark:text-white mt-2">
          {isLogin ? "Not registered ? " : "Already a user ? "}{" "}
          <span
            className="text-blue-600 dark:text-blue-400 font-bold cursor-pointer"
            onClick={handleAuthToggle}
          >
            {isLogin ? "Create an account" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
