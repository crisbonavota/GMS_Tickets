import { VStack } from "@chakra-ui/react";
import CountryFilter from "../CountryFilter";
import StatusFilter from "../StatusFilter";
import { useCallback } from "react";
import { useAppDispatch } from "../../../../redux/hooks";
import { changeFilter } from "../../../../redux/slices/pm";

const ClientsFilters = () => {
    const dispatch = useAppDispatch();

    const countrySetter = useCallback(
        (country: number | null) => {
            dispatch({
                type: changeFilter,
                payload: {
                    module: "clients",
                    value: {
                        key: "country",
                        value: country,
                    },
                },
            });
        },
        [dispatch, changeFilter]
    );

    const stateSetter = useCallback(
        (val: boolean) => {
            dispatch({
                type: changeFilter,
                payload: {
                    module: "clients",
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
            <CountryFilter setter={countrySetter} />
            <StatusFilter setter={stateSetter} />
        </VStack>
    );
};

export default ClientsFilters;
