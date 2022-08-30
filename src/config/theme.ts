import { extendTheme } from "@chakra-ui/react";
import "@fontsource/quicksand";
import "@fontsource/b612";
import "@fontsource/b612-mono";

export const getTheme = () => {
    return extendTheme({
        fonts: {
            heading: "B612, sans-serif",
            body: "Quicksand, sans-serif",
            mono: "B612 Mono, monospace",
        },
    });
};
