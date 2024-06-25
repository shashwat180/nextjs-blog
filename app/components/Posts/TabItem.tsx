import React from 'react';
import { TabItem } from './NewPostForm';
import { Flex, Icon,Text } from '@chakra-ui/react';
import { GrAnalytics } from 'react-icons/gr';

type TabItemProps = {
    item:TabItem;
    selected: boolean;
    setSelectedTab: (value:string)=>void
};

const TabItem:React.FC<TabItemProps> = ({item, selected, setSelectedTab}) => {
    
    return(
        <Flex justify='center' align='center' flexGrow={1} p="10px 0px"
        cursor='pointer' fontWeight={700}
        _hover={{bg:'#00495e',color:'white'}}
        color={selected?'white':'gray.500'}
        bg={selected?'#00495e':'white'}
        borderWidth={selected?'0px 1px 2px 0px':'0px 1px 1px 0px'}
        borderBottomColor={selected?'#00495e':'gray.500'}
        borderRightColor='gray.200'
        borderRadius={10}
        onClick={()=>setSelectedTab(item.title)}>
            <Flex align='center' height='20px' mr={2} >
                <Icon as={item.icon}/>
            </Flex>
            <Text fontSize='10pt'>{item.title}</Text>
        </Flex>
    )
}
export default TabItem;