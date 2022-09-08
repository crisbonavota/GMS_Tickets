import { Center, Spinner } from "@chakra-ui/react";

const LoadingOverlay = () => {
    return (
        <Center
            w={"100vw"}
            h={"100vh"}
            position={"absolute"}
            top={"50%"}
            left={"50%"}
            transform={"translate(-50%, -50%)"}
            bgColor={"rgba(0, 0, 0, 0.5)"}
            zIndex={1000}
        >
            <Spinner size={"xl"} color={"white"} />
        </Center>
    );
};

export default LoadingOverlay;
