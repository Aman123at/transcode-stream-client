import {  createContext, useContext, useEffect, useState } from "react";
import { IAuthContext, IAuthProviderProps, User } from "../interfaces-ts/authInterfaces";
import { fetchUser, logout } from "../api-calls/authApis";
import { useCommonContext } from "./CommonContextProvider";

const AuthContext = createContext<IAuthContext | null>(null)
export const useAuthContext = ()=>{
    const state = useContext(AuthContext);
  if (!state) throw new Error(`state is undefined`);

  return state;
}

export const AuthContextProvider:React.FC<IAuthProviderProps> = ({children})=>{
    const [user,setUser]=useState<User|null>(null)
    const {setGlobalLoader} = useCommonContext()
    const fetchLoggedInUser=async()=>{
        setGlobalLoader(true)
        const response:User | null = await fetchUser()
        setGlobalLoader(false)
        setUser(response)
        
    }
    useEffect(()=>{
        fetchLoggedInUser()
    },[])
    const logoutUser=async()=>{
        setGlobalLoader(true)
        const {response,error} = await logout()
        if(response && response.status){
            setUser(null)
            setGlobalLoader(false)
        }
        if(error){
            console.log("Something went wrong while logging user out",error)
            setGlobalLoader(false)
        }

    }
    return (
        <AuthContext.Provider value={{user,setUser,fetchLoggedInUser,logoutUser}}>
            {children}
        </AuthContext.Provider>
    )
}