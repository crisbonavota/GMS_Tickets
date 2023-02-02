import { VStack, FormLabel } from "@chakra-ui/react";
import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import Select, { SingleValue } from "react-select";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";
import { getResourceList } from "../api/api";
interface Props extends StateManagerProps {
    setter: (value: number | null) => void;
    resource: string;
    labelProp: string;
    valueProp: string;
    title?: string;
}

const SyncSingleValueDropdownFilter = (props: Props) => {
    const { setter, resource, labelProp, valueProp, title, styles, ...rest } =
        props;

    const getAuthHeader = useAuthHeader();
    const { data: items, isLoading } = useQuery(
        resource,
        () => getResourceList<any>(resource, getAuthHeader()),
        { select: (r) => r.data }
    );

    const onChange = (
        newValue: SingleValue<{ label: string; value: number }>
    ) => {
        setter(newValue ? newValue.value : null);
    };

    return (
        <VStack alignItems={"flex-start"} w={"full"}>
            {title && <FormLabel>{title}</FormLabel>}
            <Select
                isLoading={isLoading}
                options={
                    items
                        ? items.map((item) => ({
                              label: item[labelProp],
                              value: item[valueProp],
                          }))
                        : []
                }
                onChange={(v: any) => onChange(v)}
                styles={
                    styles
                        ? styles
                        : {
                              container: (base) => ({
                                  ...base,
                                  width: "100%",
                              }),
                          }
                }
                {...rest}
            />
        </VStack>
    );
};

export default SyncSingleValueDropdownFilter;
