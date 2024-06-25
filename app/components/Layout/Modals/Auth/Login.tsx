import React, { useState } from "react";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/Firebase/clientApp";
import { FIREBASE_ERRORS } from "@/Firebase/errors";

type LoginProps ={};

const Login:React.FC<LoginProps>=()=>{
    const setModalAuthState = useSetRecoilState(authModalState)
    const [loginForm, setLoginForm]=useState({
        email:"",
        password:"",
    });

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    const onSubmit=(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        signInWithEmailAndPassword(loginForm.email, loginForm.password);
    };

    const onChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
        setLoginForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };
    return(
        <form onSubmit={onSubmit}>
            <Input required fontSize='10pt'name="email" type="email" placeholder="Email Address" mb={2} onChange={onChange}></Input>
            <Input required fontSize='10pt'name="password" type="password" placeholder="Password" onChange={onChange}></Input>
            <Text>{FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}</Text>
            <Button width='100%' height='36px' mt={2} mb={2} type="submit" isLoading={loading}>Log In</Button>
            <Flex fontSize='10pt' justifyContent='center'>
                <Text mr={2}>Forgot your password?</Text>
                <Text
                cursor="pointer"
                color='#00495e'
                fontWeight={700}
                onClick={() => 
                    setModalAuthState(prev => ({
                        ...prev,
                        view: 'resetPassword',
                    }))
                }>Reset</Text>
            </Flex>

            <Flex fontSize='10pt' justifyContent='center' mt={2}>
                <Text mr={2}>New users</Text>
                <Text
                cursor="pointer"
                color='#00495e'
                fontWeight={700}
                onClick={() => 
                    setModalAuthState(prev => ({
                        ...prev,
                        view: 'signup',
                    }))
                }>SIGN UP</Text>
            </Flex>
        </form>
    )
}

export default Login