import React from 'react'
import Register from '@/components/register'
import { LoginProvider } from '@/context/logincontex'
import { useState } from 'react';

function register({login, setLogin,name, setName}) {

  return (
    <div>
        <Register name={name} setName={setName} login={login} setLogin={setLogin}/>
    </div>
  )
}

export default register