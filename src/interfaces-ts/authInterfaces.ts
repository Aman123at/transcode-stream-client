export interface ISignUpFormState {
    email: string;
    password: string;
    username: string;
    cnfPassword: string;
  }
export interface ISignUpPayload {
    email: string;
    password: string;
    username: string;
  }
export interface ISignInPayload {
    email: string;
    password: string;
  }
  export interface ISignUpErrorFormState {
    emailError: string;
    passwordError: string;
    usernameError: string;
    cnfPasswordError: string;
  }
  
  export interface ISignInFormState {
    email: string;
    password: string;
  }
  
  export interface ISignInErrorFormState {
    emailError: string;
    passwordError: string;
  }

  export interface IAuthProviderProps {
    children?: React.ReactNode;
  }


  export interface IAuthContext {
    user: any;
    setUser?: Function;
    fetchLoggedInUser?: () => void;
    logoutUser?: () => void;
  }
 

  export interface Avatar {
    url: string;
    localPath: string;
    _id?: string;
  }


  export interface User {
    _id?: string;
    avatar: Avatar;
    username: string;
    email: string;
    loginType: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
  }


  export interface IAxiosResponse<T> {
    status: number;
    message?: string;
    success?: boolean;
    data: T;
    projects?: T;
    logs?: T;
  }
  
  

