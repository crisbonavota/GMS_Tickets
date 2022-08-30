import { Input } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { changeFilter } from "../../redux/slices/tt-reports";

const GeneralSearchFilter = () => {
    const [internalValue, setInternalValue] = useState("");
    const dispatch = useAppDispatch();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInternalValue(e.target.value);
    };

    // instead of dispatching on every input change, we wait for the user to stop typing for 750ms
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            dispatch({
                type: changeFilter,
                payload: {
                    key: "generalSearch",
                    value: internalValue,
                },
            });
        }, 750);
        return () => clearTimeout(delayDebounce);
    });

    return (
        <Input
            w={"full"}
            bgColor={"white"}
            value={internalValue}
            onChange={onChange}
            placeholder={"General search"}
        />
    );
};

export default GeneralSearchFilter;
