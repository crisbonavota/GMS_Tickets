import { Icon } from "@chakra-ui/react";
import { MdModeEditOutline } from "react-icons/md";
import { TimetrackItem } from "../../../../api/types";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { momentToLocaleMoment } from "../../../../utils/datetime";
import moment from "moment";
import {
    clearForm,
    clearSelectedForEdit,
    setForEdit,
} from "../../../../redux/slices/timetrackSlice";

export interface EditEntryProps {
    item: TimetrackItem;
}

export function EditEntry({ item }: EditEntryProps) {
    const dispatch = useAppDispatch();

    const selectedForEdit = useAppSelector(
        (state) => state.timetrack.selectedForEdit
    );

    const onClick = () => {
        if (item.id === selectedForEdit) {
            dispatch({ type: clearForm });
            dispatch({ type: clearSelectedForEdit });
        } else {
            dispatch({
                type: setForEdit,
                payload: {
                    ...item,
                    date: moment.utc(item.date).format("YYYY-MM-DD"),
                },
            });

            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    return (
        <Icon
            cursor={"pointer"}
            size={"sm"}
            color={"steelblue"}
            as={MdModeEditOutline}
            onClick={onClick}
        />
    );
}

export default EditEntry;
