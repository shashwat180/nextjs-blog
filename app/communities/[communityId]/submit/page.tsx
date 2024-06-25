"use client";
import { auth } from "@/Firebase/clientApp";
import { communityState } from "@/atoms/communities/communitiesAtoms";
import PageContent from "@/components/Layout/PageContent";
import NewPostForm from "@/components/Posts/NewPostForm";
import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";

type SubmitPageProps = {};
const SubmitPostPage: React.FC<SubmitPageProps> = () => {
  const [user] = useAuthState(auth);
  const communityStateValue = useRecoilValue(communityState);
  console.log("COMMUNITY", communityStateValue);
  return (
    <PageContent>
      <>
        <Box p="14px 0px" borderBottom="1px solid" borderColor="gray.400">
          <Text>Create a post...</Text>
        </Box>
        {user && <NewPostForm user={user} />}
      </>
      <></>
    </PageContent>
  );
};
export default SubmitPostPage;
