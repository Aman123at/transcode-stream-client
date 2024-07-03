import axios from "axios";
import {
  IAxiosResponse,
  ISignInPayload,
  ISignUpPayload,
  User,
} from "../interfaces-ts/authInterfaces";
import { API_BASE_URL } from "../utils/constants";


export const fetchUser = async (): Promise<User | null> => {
  try {
    const result = await axios.get(
      `${API_BASE_URL}/user/loggedInUser`,
      {withCredentials:true}
    );
    if (result && result.status) {
      const resData: IAxiosResponse<User> = result.data;
      return resData.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
 
};

export const signUp = async (signupPayload: ISignUpPayload) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/register`,
      {
        email: signupPayload.email,
        username: signupPayload.username,
        password: signupPayload.password,
      },
      { withCredentials: true }
    );

    return { response, error: null };
  } catch (error) {
    console.log("Unable to register user : ", error);

    return { response: null, error };
  }
};

export const signIn = async (signinPayload: ISignInPayload) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/user/login`,
      {
        email: signinPayload.email,
        password: signinPayload.password,
      },
      { withCredentials: true }
    );

    return { response, error: null };
  } catch (error:any) {
    console.log("Unable to signin user : ", error);

    return { response: null, error };
  }
};
export const logout = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/user/logout`,
      { withCredentials: true }
    );

    return { response, error: null };
  } catch (error) {
    console.log("Unable to logout user : ", error);

    return { response: null, error };
  }
};

