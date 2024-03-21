import React from 'react'
import { LoginProvider } from "@/context/logincontex";
import Login from '@/components/login'
import { useState } from 'react';

function login({login, setLogin,name, setName}) {
 

  return (
    <div>
        <Login name={name} setName={setName} login={login} setLogin={setLogin} />
    </div>
  )
}

export default login