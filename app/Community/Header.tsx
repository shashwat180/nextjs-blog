"use client";
import { Community } from "@/atoms/communities/communitiesAtoms";
import useCommunityData from "@/hooks/useCommunityData";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import { BsPeopleFill } from "react-icons/bs";

type HeaderProps = {
  communityData: Community;
};

const Header: React.FC<HeaderProps> = ({ communityData }) => {
  const { communityStateValue, onJoinOrLeaveCommunity, loading } =
    useCommunityData();
  const isJoined = !!communityStateValue.mySnippets.find(
    (item) => item.communityId === communityData.id
  );
  return (
    <Flex
      direction="column"
      width="100%"
      height="146px"
      borderBottom="1px solid"
      borderBottomColor="gray.400"
    >
      <Box height="50%" bg="#00495e" />
      <Flex justify="center" bg="white" flexGrow={1}>
        <Flex width="95%" maxWidth="860px" ml={260}>
          {communityStateValue.currentCommunity?.imageURL ? (
            <Image
              src={communityStateValue.currentCommunity.imageURL}
              borderRadius="full"
              boxSize="70px"
              position="relative"
              top={-1}
              border="4px solid white"
            />
          ) : (
            <Icon
              as={BsPeopleFill}
              bg="#00495e"
              color="white"
              fontSize={64}
              position="relative"
              top={-1}
              borderRadius="full"
              border="4px solid white"
            />
          )}
          <Flex padding="10px 16px">
            <Flex direction="column" ml={2}>
              <Text fontWeight={800} fontSize="16pt">
                {communityData.id}
              </Text>
              <Text fontWeight={400} fontSize="10pt" color="gray.400">
                About {communityData.id}
              </Text>
            </Flex>
            <Button
              height="30px"
              ml={2}
              mt={1}
              pr={6}
              pl={6}
              variant={isJoined ? "outline" : "solid"}
              onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
              isLoading={loading}
            >
              {isJoined ? "Joined" : "Join"}
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
