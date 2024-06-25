'use client';

import { Flex } from '@chakra-ui/react';

interface CommunityPageProps {
  communityData: {
    id: string;
    // Include other properties that your community object has
  };
}

const CommunityPage: React.FC<CommunityPageProps> = ({ communityData }) => {
  return (
    <Flex
      width="80%"
      height="full"
      border="1px solid"
      borderColor="black"
      justifyContent="flex-start"
      ml={275}
    >
      <div>Welcome to {communityData.id}</div>
    </Flex>
  );
};

export default CommunityPage;
