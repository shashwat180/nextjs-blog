import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGoogle } from "react-icons/fa";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "@/Firebase/clientApp";

const OAuthButtons: React.FC = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  return (
    <Flex>
      <Button mb={4} onClick={() => signInWithGoogle()}>
        <FaGoogle size="20px" className="ml-3" />
        <Text ml={4}>Continue with Google</Text>
      </Button>
    </Flex>
  );
};

export default OAuthButtons;
