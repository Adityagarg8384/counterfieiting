import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';
import Link from 'next/link';

function Register({login, setLogin ,name, setName}) {

    const [data, setData] = useState({
        firstname:"",
        lastname:"",
        emailid:"",
        password:""
    });

    const [cont, setCont]= useState(false);

    const FormHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const SubmitForm=(e)=>{
        e.preventDefault();
        
        const t= JSON.stringify(data);
        fetch("http://localhost:8000/register", {
            method:'POST',
            body:t,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
        })
        .then((res)=>{
            return res.json();
        })
        .catch((err)=>{
            console.log(err);
        })
        .then((res)=>{
            setName(res.firstname);
            setCont(true);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return (
        <HeadMain>
            <Head1>
                <form onSubmit={SubmitForm}>
                    <Text>Register</Text>
                    <InputWrapper>
                        <InputName>First Name:</InputName>
                        <Input
                            type="text"
                            name="input1"
                            value={data.firstname}
                            onChange={(e)=>setData(prevData=>({ ...prevData,firstname:e.target.value}))}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <InputName>Last Name:</InputName>
                        <Input
                            type="text"
                            name="input2"
                            value={data.lastname}
                            onChange={(e)=>setData(prevData=>({ ...prevData,lastname:e.target.value}))}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <InputName>Email Id:</InputName>
                        <Input
                            type="text"
                            name="input3"
                            value={data.emailid}
                            onChange={(e)=>setData(prevData=>({ ...prevData,emailid:e.target.value}))}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <InputName>Password:</InputName>
                        <Input
                            type="text"
                            name="input4"
                            value={data.password}
                            onChange={(e)=>setData(prevData=>({ ...prevData,password:e.target.value}))}
                        />
                    </InputWrapper>
                    <Button type="submit">Submit</Button>
                    <InputName>Already registered <Link href="login">Login</Link></InputName>
                </form>
                {cont==true? 
                <>
                <Link href='/'>
                <Button type="submit" onClick={setLogin}>Continue</Button>
                </Link>
                </>
                :
                <></>
                }
            </Head1>
        </HeadMain>
    )
}

const HeadMain = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #14161a; /* Background color */
`;

const Text = styled.h1`
    color: white;
    font-size: 3rem;
    margin-left: 3rem;
    margin-bottom: 10%;
`;

const Head1 = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh; /* Adjust height as needed */
    width:25rem; /* Adjust width as needed */
    background-color: #191b21; /* Updated background color */
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add box shadow */
`;

const InputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const InputName = styled.div`
    margin-right: 1.5rem;
    color: white;
    font-size: 1rem
`;

const Input = styled.input`
    padding: 10px;
    width: 8rem;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    background-color: #212631; /* Updated lighter shade */
    color: white; /* Text color */
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    margin-left: 30%;
`;

const Head = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh; /* Adjust height as needed */
    width: 30vw; /* Adjust width as needed */
    background-color: #191b21; /* Updated background color */
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add box shadow */

    @media screen and (max-width: 430px) and (max-height: 932px) {
        height: auto; /* Adjust height for smaller screens */
        width: 90vw; /* Adjust width for smaller screens */
    }
`;

export default Register;