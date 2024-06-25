import { Community } from "@/atoms/communities/communitiesAtoms";
import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { RiCakeLine } from "react-icons/ri";

type AboutProps = {
  communityData: Community;
};

const About: React.FC<AboutProps> = ({ communityData }) => {
  return (
    <Box position="sticky" top="70px">
      <Flex
        justify="space-between"
        align="center"
        bg="#00495e"
        color="white"
        p={3}
        borderRadius="10px 10px 0px 0px"
      >
        <Text fontSize="10pt" fontWeight={700}>
          About Community
        </Text>
        <Icon as={HiOutlineDotsHorizontal} />
      </Flex>
      <Flex
        direction="column"
        p={3}
        bg="white"
        borderRadius="0px 0px 10px 10px"
      >
        <Stack>
          <Flex width="100%" p={2} fontSize="10pt">
            <Flex direction="column" flexGrow={1}>
              <Text>
                {communityData.numberofMembers !== undefined
                  ? communityData.numberofMembers.toLocaleString()
                  : "Loading..."}
              </Text>
              <Text>Members</Text>
            </Flex>
          </Flex>
          <Flex
            align="center"
            width="100%"
            p={1}
            fontWeight={500}
            fontSize="10pt"
          >
            <Icon as={RiCakeLine} fontSize="18pt" mr={2} />
            {communityData.createdAt && (
              <Text>
                Created{" "}
                {moment(
                  new Date(communityData.createdAt.seconds * 1000)
                ).format("MMM DD, YYYY")}
              </Text>
            )}
          </Flex>
        </Stack>
      </Flex>
    </Box>
  );
};
export default About;
