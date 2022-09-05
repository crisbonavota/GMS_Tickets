import AsyncSelect from "react-select/async";
import { useAuthHeader } from "react-auth-kit";
import {
    FormErrorMessage,
    FormControl,
    FormLabel,
    HStack,
    IconButton,
    useDisclosure,
} from "@chakra-ui/react";
import { SingleValue } from "react-select";
import { MdAddCircle } from "react-icons/md";
import CreateClientModal from "./CreateClientModal";
import { getResourceListFilteredAndPaginated } from "../../../api/api";
import { Company } from "../../../api/types";

interface Props {
    setter: (value: number | null) => void;
    value: number | null;
    error?: string;
    touched?: boolean;
    name: string;
}

const ClientField = ({ setter, name, error, touched }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const getAuthHeader = useAuthHeader();
    const getOptions = async (input: string) => {
        const res = await getResourceListFilteredAndPaginated<Company>(
            "companies",
            getAuthHeader(),
            [{ field: "name", value: input }],
            [],
            { field: "name", isAscending: true }
        );
        return res.data.map((c) => ({
            label: c.name,
            value: c.id,
        }));
    };

    const onChange = (
        client: SingleValue<{ label: string; value: number }>
    ) => {
        setter(client ? client.value : null);
    };

    return (
        <>
            <FormControl isInvalid={Boolean(error) && touched}>
                <FormLabel htmlFor={name}>Client</FormLabel>
                <HStack spacing={1}>
                    <AsyncSelect
                        id={name}
                        name={name}
                        placeholder="Type for results..."
                        cacheOptions
                        loadOptions={getOptions}
                        isClearable
                        styles={{
                            container: (base) => ({
                                ...base,
                                width: "100%",
                            }),
                        }}
                        noOptionsMessage={(props) =>
                            props.inputValue !== ""
                                ? "No results found, try different keywords"
                                : "Start typing to search for clients"
                        }
                        onChange={onChange}
                    />
                    <IconButton
                        icon={<MdAddCircle size={20} />}
                        aria-label="Create client"
                        variant="ghost"
                        colorScheme={"green"}
                        onClick={onOpen}
                    />
                </HStack>
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
            <CreateClientModal
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
            />
        </>
    );
};

export default ClientField;
