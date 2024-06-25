import { Flex } from "@chakra-ui/react";
import React from "react";

type PageContentProps = React.PropsWithChildren<{}>;

const PageContent:React.FC<PageContentProps>=({children})=>{
    console.log("Here is children", children)

    const childrenArray = React.Children.toArray(children);

    return(
        <Flex ml={260} justify='center' p='16px 0px'>
            <Flex  width='95%'justify='center' maxWidth='860px'>
                <Flex direction='column'
                width={{base: '100%', md:'65%' }}
                mr={{base: '0', md:'6' }}
                >
                    {childrenArray[0 as keyof typeof children]}
                </Flex>

                <Flex
                direction='column'
                display={{base:'none', md:'flex'}}
                flexGrow={1}>
                    {childrenArray[1 as keyof typeof children]}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default PageContent;