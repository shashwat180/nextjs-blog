import { Button, Flex,Image, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGoogle } from "react-icons/fa";
import React from "react";

const OAuthButtons: React.FC = ()=>{
    return(
        <Flex>
            <Button mb={4}><FaGoogle size='20px' className="ml-3"/><Text ml={4}>Continue with Google</Text></Button>
        </Flex>
    )
}

export default OAuthButtons;