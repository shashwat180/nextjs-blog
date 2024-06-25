import { Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { BiFontSize } from "react-icons/bi";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";

type IconProps={

};

const Icons: React.FC<IconProps> =() =>{
    return(
        <Flex align={"center"} borderRight="1px solid" borderColor='gray.200'>
            
            <>
            <Flex mr={2} cursor={"pointer"} borderRadius={4} _hover={{bg:"gray.200"}}>
                <Icon as={IoNotificationsOutline} fontSize={20} />
            </Flex>
            </>
        </Flex>
    );
};

export default Icons;