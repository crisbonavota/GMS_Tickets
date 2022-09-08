import SyncSingleValueDropdownFilter from "../../components/SyncSingleValueDropdownFilter";
import { useAppDispatch } from "../../redux/hooks";
import { useCallback } from "react";
import { changeFilter } from "../../redux/slices/hr-updates";

const UpdateTypeFilter = () => {
    const dispatch = useAppDispatch();

    const setUpdateType = useCallback(
        (ut: number | null) =>
            dispatch({
                type: changeFilter,
                payload: {
                    key: "updateTypeId",
                    value: ut,
                },
            }),
        [dispatch, changeFilter]
    );

    return (
        <SyncSingleValueDropdownFilter
            resource="updates/types"
            setter={setUpdateType}
            title="Update Type"
            labelProp="caption"
            valueProp="id"
            isClearable
        />
    );
};

export default UpdateTypeFilter;
