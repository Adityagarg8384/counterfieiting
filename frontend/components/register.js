import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';
import Link from 'next/link';

function Register({ login, setLogin, name, setName }) {

    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        emailid: "",
        password: ""
    });

    const [cont, setCont] = useState(false);

    const FormHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const SubmitForm = (e) => {
        e.preventDefault();

        const t = JSON.stringify(data);
        fetch("https://counterfieiting.vercel.app/register", {
            method: 'POST',
            body: t,
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
                setName(res.firstname);
                setCont(true);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#14161a]">
            <div className="flex flex-col items-center justify-center h-[60vh] w-[25rem] bg-[#191b21] rounded-lg p-5 shadow-md">
                <form onSubmit={SubmitForm} className="w-full">
                    <h1 className="text-white text-3xl ml-12 mb-10">Register</h1>
                    <div className="flex justify-between items-center mb-5">
                        <div className="mr-6 text-white text-base">First Name:</div>
                        <input
                            type="text"
                            name="firstname"
                            value={data.firstname}
                            onChange={FormHandler}
                            className="p-2 w-32 rounded border-none text-base bg-[#212631] text-white"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-5">
                        <div className="mr-6 text-white text-base">Last Name:</div>
                        <input
                            type="text"
                            name="lastname"
                            value={data.lastname}
                            onChange={FormHandler}
                            className="p-2 w-32 rounded border-none text-base bg-[#212631] text-white"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-5">
                        <div className="mr-6 text-white text-base">Email Id:</div>
                        <input
                            type="text"
                            name="emailid"
                            value={data.emailid}
                            onChange={FormHandler}
                            className="p-2 w-32 rounded border-none text-base bg-[#212631] text-white"
                        />
                    </div>
                    <div className="flex justify-between items-center mb-5">
                        <div className="mr-6 text-white text-base">Password:</div>
                        <input
                            type="text"
                            name="password"
                            value={data.password}
                            onChange={FormHandler}
                            className="p-2 w-32 rounded border-none text-base bg-[#212631] text-white"
                        />
                    </div>
                    <button
                        type="submit"
                        className="py-2 px-5 bg-[#007bff] text-white rounded text-base cursor-pointer ml-[30%]"
                    >
                        Submit
                    </button>
                    <div className="mt-4 text-white text-base">
                        Already registered{" "}
                        <Link href="/login">
                            <span className="underline cursor-pointer">Login</span>
                        </Link>
                    </div>
                </form>
                {cont && (
                    <Link href="/">
                        <button
                            type="button"
                            onClick={setLogin}
                            className="mt-5 py-2 px-5 bg-[#007bff] text-white rounded text-base cursor-pointer ml-[30%]"
                        >
                            Continue
                        </button>
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Register;
