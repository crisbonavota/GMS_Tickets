import { Icon } from "@chakra-ui/react";
import { useMemo } from "react";
import { FiCopy } from "react-icons/fi";
import { TimetrackItem } from "../../../../api/types";
import { useAppDispatch } from "../../../../redux/hooks";
import { clearForm, fillForm } from "../../../../redux/slices/timetrackSlice";

export interface CopyEntryProps {
    item: TimetrackItem;
}

export function CopyEntry({ item }: CopyEntryProps) {
    const dispatch = useAppDispatch();
    const dateInput = useMemo(
        () => document.getElementById("tt-load-date-input") as HTMLInputElement,
        []
    );

    const onClick = () => {
        dispatch({
            type: clearForm,
        });
        dispatch({
            type: fillForm,
            payload: item,
        });
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });

        if ("showPicker" in HTMLInputElement.prototype) {
            // @ts-ignore
            dateInput.showPicker();
        } else {
            dateInput.focus();
        }
    };

    return (
        <Icon
            cursor={"pointer"}
            size={"sm"}
            color={"steelblue"}
            as={FiCopy}
            onClick={onClick}
        />
    );
}

export default CopyEntry;
