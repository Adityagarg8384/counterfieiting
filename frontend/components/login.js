import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

function Login({  login, setLogin ,name, setName}) {
    const [data, setData] = useState({
        emailid: "",
        password: "",
    });

    const [cont, setCont]= useState(false);

    const SubmitForm = (e) => {
        e.preventDefault(); 
        fetch("http://localhost:8000/login", {
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
        .catch((err)=>{
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
        <HeadMain>
            <Head1>
                <form onSubmit={SubmitForm}>
                    <Text>Login</Text>
                    <InputWrapper>
                        <InputName>Email Id :</InputName>
                        <Input
                            type="text"
                            name="emailid"
                            value={data.emailid}
                            onChange={(e) => setData(prevData => ({ ...prevData, emailid: e.target.value }))}
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <InputName>Password :</InputName>
                        <Input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData(prevData => ({ ...prevData, password: e.target.value }))}
                        />
                    </InputWrapper>
                    
                    <Button type="submit" >Submit</Button>
                    <InputName>Not signup <Link href="/register">Register</Link></InputName>
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
    );
}

const HeadMain = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #14161a; /* Background color */

    @media only screen and (max-width: 430px) and (max-height: 932px) {
        height: auto;
        padding: 20px;
    }
`;

const Text = styled.h1`
    color: white;
    font-size: 3rem;
    margin-left: 3rem;
    margin-bottom: 10%;

    @media only screen and (max-width: 430px) and (max-height: 932px) {
        font-size: 3rem; /* Adjust font size for mobile view */
        margin-left: 3rem;
    }
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

    @media only screen and (max-width: 430px) and (max-height: 932px) {
        height: auto;
        width: 90rem; /* Adjust width for mobile view */
    }
`;

const InputWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const InputName = styled.div`
    margin-right: 1.5rem;
    color:white;
    font-size: 1rem;

    @media only screen and (max-width: 430px) and (max-height: 932px) {
        font-size: 1rem; /* Adjust font size for mobile view */
    }
`;

const Input = styled.input`
    padding: 10px;
    width: 8rem;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    background-color: #212631; /* Updated lighter shade */
    color: white; /* Text color */

    @media only screen and (max-width: 430px) and (max-height: 932px) {
        width: 60vw; /* Adjust width for mobile view */
    }
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

    @media only screen and (max-width: 430px) and (max-height: 932px) {
        margin-left: 0; /* Center align for mobile view */
        margin-top: 20px; /* Add some space between input and button for mobile view */
    }
`;

export default Login;
