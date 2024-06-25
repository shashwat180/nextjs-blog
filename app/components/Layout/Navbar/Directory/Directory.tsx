import { ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, Icon, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import React from "react";
import { CgMathPlus } from "react-icons/cg";
import Communities from "./Communities";
const UserMenu: React.FC = () => {
    return(
        <Menu>
  <MenuButton 
  ml={2}
  mr={2}
  cursor='pointer'
  padding='0px 6px'
  borderRadius={4}
  _hover={{outline: "1px solid", outlineColor:"gray.200"}}>
        <Flex align='center'>
        <Flex align='center'>
            <Icon as={CgMathPlus} fontSize={20}/>
        </Flex>
        </Flex>
  </MenuButton>
  <MenuList><Communities/>  </MenuList>
</Menu>
    )
}

export default UserMenu;