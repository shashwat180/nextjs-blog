import React, { useState } from "react";
import CreateCommunityModal from "./CreateCommunityModal";
import { Box, Flex, Icon, MenuItem, Text } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";
import { communityState } from "@/atoms/communities/communitiesAtoms";
import { useRecoilValue } from "recoil";
import MenuListItem from "./MenuListItem";
import { FaReddit } from "react-icons/fa";

type CommunitiesProps = {};

const Communities: React.FC = () => {
  const [open, setOpen] = useState(false);
  const MySnippet = useRecoilValue(communityState).mySnippets;
  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false)} />
      <Box mt={3} mb={4}>
        <Text pl={3} mb={1} fontSize="8pt" fontWeight={500} color="gray.500">
          My Communities
        </Text>

        <MenuItem
          width="100%"
          fontSize="10pt"
          _hover={{ bg: "#00495E", color: "white" }}
          onClick={() => setOpen(true)}
        >
          <Flex align="center">
            <Icon as={GrAdd} fontSize={20} mr={2} />
            Create Community
          </Flex>
        </MenuItem>
        {MySnippet.map((snippet) => (
          <MenuListItem
            key={snippet.communityId}
            icon={FaReddit}
            displaytext={`${snippet.communityId}`}
            link={`/communities/${snippet.communityId}`}
            iconColor="blue.500"
            imageURL={snippet.imageURL}
          />
        ))}
      </Box>
    </>
  );
};

export default Communities;
