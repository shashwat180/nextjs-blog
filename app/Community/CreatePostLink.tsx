"use client";
import { authModalState } from "@/atoms/authModalAtom";
import { auth } from "@/Firebase/clientApp";
import { Flex, Icon, Input } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsLink45Deg, BsPeopleFill } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
import { useSetRecoilState } from "recoil";

const CreatePostLink: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const pathname = usePathname();

  const onClick = () => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    const communityId = pathname.split("/").pop();

    // Debugging step: Log the retrieved communityId
    console.log("Community ID:", communityId);
    if (communityId) {
      router.push(`/communities/${communityId}/submit`);
    } else {
      console.log("Community ID not found.");
    }
  };

  return (
    <Flex
      justify="space-evenly"
      align="center"
      bg="white"
      height="56px"
      borderRadius={4}
      border="1px solid"
      borderColor="gray.300"
      p={2}
      mb={4}
      mt={70}
    >
      <Icon as={BsPeopleFill} fontSize={36} color="gray.300" mr={4} />
      <Input
        position="sticky"
        placeholder="Create Post"
        fontSize="10pt"
        _placeholder={{ color: "gray.500" }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
        borderColor="gray.200"
        height="36px"
        borderRadius={4}
        mr={4}
        onClick={onClick}
      />
      <Icon
        as={IoImageOutline}
        fontSize={24}
        mr={4}
        color="gray.400"
        cursor="pointer"
      />
      <Icon as={BsLink45Deg} fontSize={24} color="gray.400" cursor="pointer" />
    </Flex>
  );
};
export default CreatePostLink;
