import { chakra, SelectProps } from "@chakra-ui/react";
import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import { getResourceList } from "../../../../api/api";
import { Country } from "../../../../api/types";
import FormikSelectInput from "./FormikSelectInput";

interface Props extends SelectProps {
    error?: string;
    touched?: boolean;
    label?: string;
}

const CountryField = (props: Props) => {
    const getAuthHeader = useAuthHeader();
    const { data: countries, isLoading } = useQuery(
        "countries",
        () => getResourceList<Country>("employees/countries", getAuthHeader()),
        { select: (r) => r.data }
    );

    return (
        <FormikSelectInput
            {...props}
            children={
                <>
                    <option value={0}>Select a country</option>
                    {countries?.map((c) => (
                        <chakra.option value={c.id}>{c.name}</chakra.option>
                    ))}
                </>
            }
        />
    );
};

export default CountryField;
