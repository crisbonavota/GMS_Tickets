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
import CreateAccountModal from "./CreateAccountModal";
import { getResourceListFilteredAndPaginated } from "../../../api/api";
import { Account, Company } from "../../../api/types";

interface Props {
    setter: (value: number | null) => void;
    error?: string;
    touched?: boolean;
    name: string;
    defaultValue?: { label: string; value: number };
    preset?: boolean;
    predefinedCompany?: Company;
    presetAccount?: boolean;
}

const AccountField = ({
    setter,
    error,
    touched,
    name,
    defaultValue,
    preset,
    predefinedCompany,
    presetAccount,
}: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const getAuthHeader = useAuthHeader();
    const getOptions = async (input: string) => {
        const res = await getResourceListFilteredAndPaginated<Account>(
            "accounts",
            getAuthHeader(),
            [
                { field: "name", value: input },
                {field: "companyId", value: predefinedCompany?.id}
            ],
            [],
            { field: "name", isAscending: true }
        );
        return res.data.map((c) => ({
            label: c.name,
            value: c.id,
        }));
    };

    const onChange = (
        account: SingleValue<{ label: string; value: number }>
    ) => {
        setter(account ? account.value : null);
    };

    return (
        <>
            <FormControl isInvalid={Boolean(error) && touched}>
                <FormLabel htmlFor={name}>Account</FormLabel>
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
                                : "Start typing to search for accounts"
                        }
                        onChange={onChange}
                        defaultValue={defaultValue}
                        isDisabled={presetAccount}
                    />
                    <IconButton
                        icon={<MdAddCircle size={20} />}
                        aria-label="Create account"
                        variant="ghost"
                        colorScheme={"green"}
                        onClick={onOpen}
                        isDisabled={preset}
                    />
                </HStack>
                <FormErrorMessage>{error}</FormErrorMessage>
            </FormControl>
            <CreateAccountModal
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
            />
        </>
    );
};

export default AccountField;
