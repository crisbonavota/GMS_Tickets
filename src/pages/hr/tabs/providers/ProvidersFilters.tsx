import { VStack } from "@chakra-ui/react";
import StatusFilter from "../StatusFilter";
import { useCallback } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import { changeFilter } from "../../../../redux/slices/hr";

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

    return (
        <VStack w={"full"} spacing={5}>
            <StatusFilter setter={stateSetter} />
        </VStack>
    );
};

export default ProvidersFilters;
