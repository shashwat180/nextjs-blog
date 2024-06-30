import { firestore } from "@/Firebase/clientApp";
import { Community } from "@/atoms/communities/communitiesAtoms";
import useCommunityData from "@/hooks/useCommunityData";
import { Box, Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdPeopleAlt } from "react-icons/md";

const Recommendation: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(false);
  const { communityStateValue, onJoinOrLeaveCommunity } = useCommunityData();

  const getCommunityRecommendations = async () => {
    setLoading(true);
    try {
      const communityQuery = query(
        collection(firestore, "communities"),
        orderBy("numberOfMembers", "desc"),
        limit(5)
      );
      const communityDocs = await getDocs(communityQuery);
      const communities = communityDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCommunities(communities as Community[]);
    } catch (error) {
      console.log("getCommunityRecommendations error", error);
    }
  };
  useEffect(() => {
    getCommunityRecommendations();
  }, []);

  return (
    <Flex
      mt={70}
      direction="column"
      bg="white"
      borderRadius={10}
      border="1px solid"
      borderColor="gray.400"
    >
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        height="70px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={700}
        bgImage="url(/images/communities.jpg)"
        backgroundSize="cover"
        bgGradient="linear(to-b, #178994, #00495e)"
      >
        Top Communities
      </Flex>
      <Flex direction="column">
        <>
          {communities.map((item, index) => {
            const isJoined = !!communityStateValue.mySnippets.find(
              (snippet) => snippet.communityId === item.id
            );
            return (
              <Link key={item.id} href={`/communities/${item.id}`}>
                <Flex
                  position="sticky"
                  align="center"
                  fontSize="10pt"
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  p="10px 12px"
                >
                  <Flex width="80%" align="center">
                    <Flex width="15%">
                      <Text>{index + 1}</Text>
                    </Flex>
                    <Flex align="center" width="80%">
                      {item.imageURL ? (
                        <Image
                          src={item.imageURL}
                          borderRadius="full"
                          boxSize="25px"
                          mr={2}
                        />
                      ) : (
                        <Icon
                          as={MdPeopleAlt}
                          fontSize={25}
                          color="white"
                          bg="#00495e"
                          borderRadius="full"
                          mr={4}
                        />
                      )}
                      <span
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {`${item.id}`}
                      </span>
                    </Flex>
                  </Flex>
                  <Box position="absolute" right="10px">
                    <Button
                      height="22px"
                      fontSize="8pt"
                      variant={isJoined ? "outline" : "solid"}
                      onClick={(event) => {
                        event.stopPropagation();
                        onJoinOrLeaveCommunity(item, isJoined);
                      }}
                    >
                      {isJoined ? "Joined" : "Join"}
                    </Button>
                  </Box>
                </Flex>
              </Link>
            );
          })}
        </>
      </Flex>
    </Flex>
  );
};
export default Recommendation;
