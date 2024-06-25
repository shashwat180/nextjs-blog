/* theme.ts */
import { extendTheme } from "@chakra-ui/react";
import { Button } from "./buttons";

export const theme = extendTheme({
    fonts: {
      heading: 'var(--font-raleway)',
      body: 'var(--font-raleway)',
    },
    colors:{
        brand:{
            100:"#ff3c00",
        },
    },
    styles:{
        global: () => ({
            body: {
                bg:"white"
            },
        }),
    },
    components:{
        Button,
    },
});