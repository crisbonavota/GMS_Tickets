import { Checkbox } from "@chakra-ui/react";
import { useAppDispatch } from "../../redux/hooks";
import { changeFilter } from "../../redux/slices/tt-reports";

const BorrowedFilter = () => {
    const dispatch = useAppDispatch();
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: changeFilter,
            payload: {
                key: "borrowed",
                value: e.target.checked,
            },
        });
    };

    return <Checkbox onChange={onChange}>Show only borrowed hours</Checkbox>;
};
export default BorrowedFilter;
