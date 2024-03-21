import { createContext, useContext } from "react";

export const LoginContext= createContext({
    login: false,
    name:"login",

    setLogintrue:()=>{},
    setName:()=>{},
    setLoginfalse:()=>{}
})

export const LoginProvider= LoginContext.Provider;

export function useLoginContext(){
    return useContext(LoginProvider);
}