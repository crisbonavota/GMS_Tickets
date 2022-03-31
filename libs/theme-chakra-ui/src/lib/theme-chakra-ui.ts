import { extendTheme } from "@chakra-ui/react";

export const getTheme = () => {
    return extendTheme({
        fonts: {
            heading: 'B612, sans-serif',
            body: 'Quicksand, sans-serif',
            mono: 'B612 Mono, monospace'
        },
    });
}
