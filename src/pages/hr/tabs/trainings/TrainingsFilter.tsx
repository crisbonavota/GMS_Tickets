import { VStack } from "@chakra-ui/react";
import { useCallback } from "react";
import AsyncSingleDropdownFilter from "../../../../components/AsyncSingleDropdownFilter";
import { useAppDispatch } from "../../../../redux/hooks";
import { changeFilter } from "../../../../redux/slices/hr";
import TrainingsStatusFilter from "../TrainingsStatusFilter";
import YearFilter from "../YearFilter";

const TrainingsFilter = () => {
    const dispatch = useAppDispatch();

    const stateSetter = useCallback(
        (val: number | null) => {
            dispatch({
                type: changeFilter,
                payload: {
                    module: "trainings",
                    value: {
                        key: "status",
                        value: val,
                    },
                },
            });
        },
        [dispatch, changeFilter]
    );

    const setLegacyUser = useCallback(
        (legacyUserId: number | null) =>
            dispatch({
                type: changeFilter,
                payload: {
                    module: "trainings",
                    value: {
                        key: "legacyUserId",
                        value: legacyUserId,
                    },  
                },
            }),
        [dispatch, changeFilter]
    );

    return (
        <VStack w={"full"} spacing={5}>
            <TrainingsStatusFilter setter={stateSetter} />
            <AsyncSingleDropdownFilter
                setter={setLegacyUser}
                nameProp="fullName"
                valueProp="id"
                resource="users/legacy"
                label="User"
            />
            <YearFilter />
        </VStack>
    );
}

export default TrainingsFilter;