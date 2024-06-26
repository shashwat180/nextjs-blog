import React from "react";
import { Divider, Flex, Image, Link, Text } from "@chakra-ui/react";
import SearchInput from "./Search";
import RightContent from "./Right Content/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/Firebase/clientApp";
import Directory from "./Directory/Directory";
import UserMenu from "./Right Content/UserMenu";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Flex
      zIndex="1"
      bg="white"
      height="65px"
      padding="6px 12px"
      position="fixed"
      width="100%"
      borderBottom="1px"
      borderBottomColor="gray.200"
    >
      <Flex>
        <Link href={"/"}>
          <Image src="/images/mozaic-web-logo.png" height="50px" />
        </Link>
        <Text
          fontWeight={700}
          mt={4}
          ml={2}
          fontSize="12pt"
          verticalAlign="center"
          justifyContent="center"
          color="#021229"
        >
          MOZAIC
        </Text>
      </Flex>

      <SearchInput user={user} />
      {user && <Directory />}
      <RightContent user={user} />
    </Flex>
  );
};
export default Navbar;
