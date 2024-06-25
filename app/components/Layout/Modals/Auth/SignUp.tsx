import React, { useEffect, useState } from "react";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/authModalAtom";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from "@/Firebase/clientApp";
import { FIREBASE_ERRORS } from "@/Firebase/errors";
import { addDoc, collection } from "firebase/firestore";
import { User } from "firebase/auth";

const SignUp:React.FC=()=>{
    const setModalAuthState = useSetRecoilState(authModalState)
    const [signUpForm, setSignUpForm]=useState({
        email:"",
        password:"",
        confirmpassword:"",
    });
    const[error, setError]=useState(" ");
    const [createUserWithEmailAndPassword,
        user,
        loading,
        userError,
      ] = useCreateUserWithEmailAndPassword(auth);

    const onSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        if(error) setError("");
        if(signUpForm.password !== signUpForm.confirmpassword){
            setError('Passwords do not match.')
        return;
        }
        createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);

    };

    const onChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
        setSignUpForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const createUserDocument= async(user:User)=>{
        await addDoc(collection(firestore, 'users'), JSON.parse(JSON.stringify(user)));
    };

    useEffect(()=>{
        if(user){
            createUserDocument(user.user);
        }
    }, [user]);
    return(
        <form onSubmit={onSubmit}>
            <Input required fontSize='10pt'name="email" type="email" placeholder="Email Address" mb={2} onChange={onChange}></Input>
            <Input required fontSize='10pt'name="password" type="password" placeholder="Password" onChange={onChange}></Input>
            <Input required fontSize='10pt'name="confirmpassword" type="password" placeholder="Confirm Password" mb={2} onChange={onChange}></Input>
            {error || userError && 
            (<Text textAlign='center'>
                {error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
                </Text>)}
            <Button width='100%' height='36px' mt={2} mb={2} type="submit" isLoading={loading}>Sign Up</Button>
            <Flex fontSize='10pt' justifyContent='center'>
                <Text mr={2}>Already Signed In?</Text>
                <Text
                cursor="pointer"
                color='#00495e'
                fontWeight={700}
                onClick={() => 
                    setModalAuthState(prev => ({
                        ...prev,
                        view: 'login',
                    }))
                }>Login</Text>
            </Flex>
        </form>
    )
}

export default SignUp