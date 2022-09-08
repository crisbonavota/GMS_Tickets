import { useCallback } from "react";
import { useAppDispatch } from "../../redux/hooks";
import AsyncSingleDropdownFilter from "../../components/AsyncSingleDropdownFilter";
import { changeFilter } from "../../redux/slices/hr-updates";

const EmployeeFilter = () => {
    const dispatch = useAppDispatch();

    const setLegacyUser = useCallback(
        (user: number | null) =>
            dispatch({
                type: changeFilter,
                payload: {
                    key: "legacyUserId",
                    value: user,
                },
            }),
        [dispatch, changeFilter]
    );

    return (
        <AsyncSingleDropdownFilter
            setter={setLegacyUser}
            nameProp="fullName"
            valueProp="id"
            resource="users/legacy"
            label="Employee"
        />
    );
};
export default EmployeeFilter;
