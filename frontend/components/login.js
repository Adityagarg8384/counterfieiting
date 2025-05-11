import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

function Login({ login, setLogin, name, setName }) {
    const [data, setData] = useState({
        emailid: "",
        password: "",
    });

    const [cont, setCont] = useState(false);

    const SubmitForm = (e) => {
        e.preventDefault();
        fetch("https://counterfieiting.vercel.app/login", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then((res) => {
                return res.json();
            })
            .catch((err) => {
                console.log(err);
            })
            .then((res) => {
                setName(res.user.firstname);
                // setLogin(true);
                // console.log(login);
                setCont(true);
            })
            .catch((err) => {
                console.log(err);
            });
    }


    return (
        <div className="flex flex-col items-center justify-center h-auto sm:h-screen bg-[#14161a] p-5">
            <div className="flex flex-col items-center justify-center h-auto sm:h-[60vh] w-[90%] sm:w-[25rem] bg-[#191b21] rounded-lg p-5 shadow-md">
                <form onSubmit={SubmitForm} className="w-full">
                    <h1 className="text-white text-[3rem] ml-12 mb-[10%]">Login</h1>
                    <div className="flex justify-between items-center mb-5">
                        <div className="mr-6 text-white text-base">Email Id :</div>
                        <input
                            type="text"
                            name="emailid"
                            value={data.emailid}
                            onChange={(e) =>
                                setData((prevData) => ({ ...prevData, emailid: e.target.value }))
                            }
                            className="p-2.5 w-[60vw] sm:w-32 border-none rounded text-base bg-[#212631] text-white"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-5">
                        <div className="mr-6 text-white text-base">Password :</div>
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) =>
                                setData((prevData) => ({ ...prevData, password: e.target.value }))
                            }
                            className="p-2.5 w-[60vw] sm:w-32 border-none rounded text-base bg-[#212631] text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="py-2 px-5 bg-[#007bff] text-white border-0 rounded text-base cursor-pointer sm:ml-[30%] ml-0 sm:mt-0 mt-5"
                    >
                        Submit
                    </button>
                    <div className="text-white text-base mt-4">
                        Not signup{' '}
                        <Link href="/register">
                            <span className="underline cursor-pointer">Register</span>
                        </Link>
                    </div>
                </form>
                {cont && (
                    <Link href="/">
                        <button
                            type="button"
                            onClick={setLogin}
                            className="py-2 px-5 bg-[#007bff] text-white border-0 rounded text-base cursor-pointer sm:ml-[30%] ml-0 sm:mt-0 mt-5"
                        >
                            Continue
                        </button>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Login;
