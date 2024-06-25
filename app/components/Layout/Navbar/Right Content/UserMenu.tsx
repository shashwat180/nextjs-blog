import { authModalState } from "@/atoms/authModalAtom";
import { communityState } from "@/atoms/communities/communitiesAtoms";
import { auth } from "@/Firebase/clientApp";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem, Icon, Flex } from "@chakra-ui/react";
import { User, signOut } from "firebase/auth";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { IoCreateOutline, IoLogOutOutline } from "react-icons/io5";
import { useResetRecoilState, useSetRecoilState } from "recoil";

type UserMenuProps ={
    user?: User |null;
};

const UserMenu: React.FC<UserMenuProps> = ({user}) => {
    const setAuthModalState= useSetRecoilState(authModalState);
    const resetCommunityState = useResetRecoilState(communityState);

    const logout= async()=>{
        await signOut(auth);
        resetCommunityState();
    }

    return(
        <Menu>
  <MenuButton ml={2}>
    {user? (
        <Flex align='center'>
            <Flex align='center'>
                <>
                <Icon
                as={FaUserCircle}
                fontSize='22'
                />
                <ChevronDownIcon />
                </>
            </Flex>
        </Flex>
        ):(
        <div></div>
        )}
  </MenuButton>
  <MenuList>
    <MenuItem fontSize='10pt' fontWeight={700} _hover={{bg: "#00495e", color: "white"}}>
    <Flex align='center'><Icon mr={2} as={CgProfile} fontSize={20}/>Profile</Flex>
    </MenuItem>

    <MenuItem fontSize='10pt' fontWeight={700} _hover={{bg: "#00495e", color: "white"}}>
    <Flex align='center'><Icon mr={2} as={IoCreateOutline} fontSize={20}/>New Post</Flex>
    </MenuItem>

    <MenuItem fontSize='10pt' fontWeight={700} _hover={{bg: "#00495e", color: "white"}} onClick={logout}>
    <Flex align='center'><Icon mr={2} as={IoLogOutOutline} fontSize={20}/>Log Out</Flex>
    </MenuItem>
  </MenuList>
</Menu>
    )
}

export default UserMenu;