import React, { ReactNode } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Divider,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiInfo,
  FiFileText,
  FiHelpCircle,
  FiShield,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";

interface LinkItemProps {
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome },
  { name: "Trending", icon: FiTrendingUp },
  { name: "Explore", icon: FiCompass },
  { name: "Favourites", icon: FiStar },
  { name: "Settings", icon: FiSettings },
];

const AdditionalLinkItems: Array<LinkItemProps> = [
  { name: "Help", icon: FiHelpCircle }, // Replace with appropriate icons
  { name: "Privacy Policy", icon: FiShield },
  { name: "User Agreement", icon: FiFileText },
  { name: "About Us", icon: FiInfo },
];

export default function SimpleSidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      mt={65}
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w="20%"
      pos="fixed"
      h="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      {...rest}
    >
      {LinkItems.map((link, index) => (
        <React.Fragment key={link.name}>
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
          {index === LinkItems.length - 1 && (
            <Divider borderColor="gray.400" mt={2} />
          )}
          {index === LinkItems.length - 1 && (
            <Text mt={2} align="center" fontSize="10pt" color="gray.400">
              Resources
            </Text>
          )}
        </React.Fragment>
      ))}
      {AdditionalLinkItems.map((link, index) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        mt={4}
        align="center"
        p="2"
        mx="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#00495e",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
