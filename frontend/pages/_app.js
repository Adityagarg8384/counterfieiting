import "@/styles/globals.css";
// import Navbar from "../components/Navbar/Navbar"
import Layout from "@/components/layout";
import { LoginProvider } from "@/context/logincontex";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [login, setLogin]= useState(true);
  const [name, setName]= useState('Login');

  const setLogintrue=()=>{
    setLogin(true);
  }

  const setLoginfalse=()=>{
    setLogin(false);
  }

  const setNewName= (na)=>{
    setName(na);
  }

  return (
    <div>
      <LoginProvider value={{login, setLogintrue, setLoginfalse, name, setNewName}}>
      {login && <Layout login={login} setLogin={setLoginfalse} name={name} setName={setNewName}/>}
      <Component {...pageProps} login={login} setLogin={setLogintrue} name={name} setName={setNewName}/>
      </LoginProvider>
      {/* </Layout> */}
    </div>
  )
}
