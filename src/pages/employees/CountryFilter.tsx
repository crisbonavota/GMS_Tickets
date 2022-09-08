import SyncSingleValueDropdownFilter from "../../components/SyncSingleValueDropdownFilter";
import { useAppDispatch } from "../../redux/hooks";
import { useCallback } from "react";
import { changeFilter } from "../../redux/slices/hr-employees";

const CountryFilter = () => {
    const dispatch = useAppDispatch();

    const changeCountry = useCallback(
        (pos: number | null) =>
            dispatch({
                type: changeFilter,
                payload: {
                    key: "birthCountry",
                    value: pos,
                },
            }),
        [dispatch, changeFilter]
    );

    return (
        <SyncSingleValueDropdownFilter
            title="Country"
            resource="employees/countries"
            labelProp="name"
            valueProp="id"
            setter={changeCountry}
            placeholder=""
            isClearable
        />
    );
};
export default CountryFilter;
