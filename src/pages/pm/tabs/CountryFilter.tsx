import { VStack, Text } from "@chakra-ui/react";
import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import Select, { SingleValue } from "react-select";
import { getResourceList } from "../../../api/api";
import { Country } from "../../../api/types";

interface Props {
    setter: (value: number | null) => void;
}

const CountryFilter = ({ setter }: Props) => {
    const getAuthHeader = useAuthHeader();
    const { data: countries, isLoading } = useQuery(
        "countries",
        () => getResourceList<Country>("employees/countries", getAuthHeader()),
        { select: (r) => r.data }
    );

    const onChange = (
        country: SingleValue<{ label: string; value: number }>
    ) => {
        setter(country ? country.value : null);
    };

    return (
        <VStack alignItems={"flex-start"} w={"full"}>
            <Text>Country</Text>
            <Select
                isLoading={isLoading}
                options={countries?.map((c) => ({
                    label: c.name,
                    value: c.id,
                }))}
                styles={{
                    container: (base) => ({
                        ...base,
                        width: "100%",
                    }),
                }}
                onChange={onChange}
                isClearable
            />
        </VStack>
    );
};
export default CountryFilter;
