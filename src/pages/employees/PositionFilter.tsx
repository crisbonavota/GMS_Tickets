import SyncSingleValueDropdownFilter from "../../components/SyncSingleValueDropdownFilter";
import { useAppDispatch } from "../../redux/hooks";
import { useCallback } from "react";
import { changeFilter } from "../../redux/slices/hr-employees";

const PositionFilter = () => {
    const dispatch = useAppDispatch();

    const changePosition = useCallback(
        (pos: number | null) =>
            dispatch({
                type: changeFilter,
                payload: {
                    key: "position",
                    value: pos,
                },
            }),
        [dispatch, changeFilter]
    );

    return (
        <SyncSingleValueDropdownFilter
            title="Position"
            resource="employees/positions"
            labelProp="name"
            valueProp="id"
            setter={changePosition}
            isClearable
            placeholder=""
        />
    );
};
export default PositionFilter;
