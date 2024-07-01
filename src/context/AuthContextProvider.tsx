import {  createContext, useContext, useEffect, useState } from "react";
import { IAuthContext, IAuthProviderProps, User } from "../interfaces-ts/authInterfaces";
import { fetchUser, logout } from "../api-calls/authApis";

const AuthContext = createContext<IAuthContext | null>(null)
export const useAuthContext = ()=>{
    const state = useContext(AuthContext);
  if (!state) throw new Error(`state is undefined`);

  return state;
}

export const AuthContextProvider:React.FC<IAuthProviderProps> = ({children})=>{
    const [user,setUser]=useState<User|null>(null)
    const fetchLoggedInUser=async()=>{
        const response:User | null = await fetchUser()
        setUser(response)
    }
    useEffect(()=>{
        fetchLoggedInUser()
    },[])
    const logoutUser=async()=>{
        const {response,error} = await logout()
        if(response && response.status){
            setUser(null)
        }
        if(error){
            console.log("Something went wrong while logging user out",error)
        }

    }
    return (
        <AuthContext.Provider value={{user,setUser,fetchLoggedInUser,logoutUser}}>
            {children}
        </AuthContext.Provider>
    )
}