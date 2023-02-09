import {
    Popover,
    PopoverTrigger,
    Button,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    chakra,
    VStack,
    Input,
    useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChildCreation } from "../../../../api/types";

interface Props {
    addChild: (child: ChildCreation) => void;
}

const AddChildPopover = ({ addChild }: Props) => {
    const [name, setName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Popover
            placement="auto-end"
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
        >
            <PopoverTrigger>
                <Button size={"xs"} colorScheme={"green"}>
                    Add
                </Button>
            </PopoverTrigger>
            <PopoverContent w="fit-content">
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Add child</PopoverHeader>
                <PopoverBody>
                    <VStack spacing={5}>
                        <Input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                        />
                        <Input
                            type="date"
                            placeholder="Birth date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                        />
                        <Button
                            size={"sm"}
                            colorScheme="green"
                            w="full"
                            isDisabled={name === "" || birthDate === ""}
                            onClick={() => {
                                addChild({
                                    name,
                                    birthDate,
                                });
                                setName("");
                                setBirthDate("");
                                onClose();
                            }}
                        >
                            Submit
                        </Button>
                    </VStack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
};
export default AddChildPopover;
