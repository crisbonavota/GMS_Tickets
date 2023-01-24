import { VStack } from "@chakra-ui/react";
import StatusFilter from "../StatusFilter";
import { useCallback } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import { changeFilter } from "../../../../redux/slices/hr";
import BusinessUnitFilter from "../BusinessUnitFilter";

const ProvidersFilters = () => {
    const dispatch = useAppDispatch();

    const stateSetter = useCallback(
        (val: boolean) => {
            dispatch({
                type: changeFilter,
                payload: {
                    module: "providers",
                    value: {
                        key: "active",
                        value: val,
                    },
                },
            });
        },
        [dispatch, changeFilter]
    );

    const businessUnitSetter = useCallback(
        (val: number | null) => {
            dispatch({
                type: changeFilter,
                payload: {
                    module: "providers",
                    value: {
                        key: "businessUnit",
                        value: val,
                    },
                },
            });
        },
        [dispatch, changeFilter]
    );

    return (
        <VStack w={"full"} spacing={5}>
            <StatusFilter setter={stateSetter} />
            <BusinessUnitFilter setter={businessUnitSetter} />
        </VStack>
    );
};

export default ProvidersFilters;
