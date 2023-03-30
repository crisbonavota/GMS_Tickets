import {
    Button,
    Checkbox,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Stack,
} from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { UseQueryResult } from "react-query";
import { downloadFile, generateExcelFileURL } from "../../utils/files";
import { exportModuleCheckBoxOptions } from "../../api/api";
import { useAppDispatch } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { changeFilter } from "../../redux/slices/tt-reports";

interface Props {
    reportQuery: UseQueryResult<AxiosResponse<string, any>, unknown>;
    // checkedItems: Map<string, boolean>;
    // setCheckedItems: (checkedItems: Map<string, boolean>) => void;
}

const PopoverExportButton = ({
    reportQuery,
    // checkedItems,
    // setCheckedItems,
}: Props) => {
    const dispatch = useAppDispatch();
    const [checkedItems, setCheckedItems] = useState<Map<string, boolean>>(
        new Map()
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const item = event.target.name;
        const isChecked = event.target.checked;
        const newCheckedItems = new Map(checkedItems).set(item, isChecked);
        setCheckedItems(newCheckedItems);
    };

    const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked;
        const newCheckedItems = new Map<string, boolean>();
        exportModuleCheckBoxOptions.forEach((item) =>
            newCheckedItems.set(item, isChecked)
        );
        setCheckedItems(newCheckedItems);
    };

    const isChecked = (item: string) => {
        return checkedItems.get(item) || false;
    };

    const isAllChecked = () => {
        return exportModuleCheckBoxOptions.every((item) =>
            checkedItems.get(item)
        );
    };

    const isAtLeastOneChecked = () => {
        return Array.from(checkedItems.values()).some((item) => item);
    };

    const onExport = (base64?: string) => {
        base64 &&
            downloadFile(
                generateExcelFileURL(base64),
                `gms_timetrack_report_${new Date(
                    Date.now()
                ).toISOString()}.xlsx`
            );
    };

    useEffect(() => {
        dispatch({
            type: changeFilter,
            payload: {
                key: "columns",
                value: checkedItems,
            },
        });
    }, [checkedItems]);

    return (
        <Popover>
            <PopoverTrigger>
                <Button
                    colorScheme={"green"}
                    w={"full"}
                    disabled={reportQuery.isError}
                >
                    Export
                </Button>
            </PopoverTrigger>
            <Portal>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverHeader>Select columns to include</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                        <Checkbox
                            isChecked={isAllChecked()}
                            onChange={handleCheckAll}
                        >
                            Check All
                        </Checkbox>
                        <Stack pl={6} mt={1} spacing={1}>
                            {exportModuleCheckBoxOptions.map((item) => (
                                <Checkbox
                                    name={item}
                                    key={item}
                                    isChecked={isChecked(item)}
                                    onChange={handleChange}
                                >
                                    {item}
                                </Checkbox>
                            ))}
                        </Stack>
                        <Button
                            colorScheme="green"
                            isLoading={reportQuery.isLoading}
                            onClick={() => onExport(reportQuery.data?.data)}
                            isDisabled={!isAtLeastOneChecked()}
                        >
                            Export
                        </Button>
                    </PopoverBody>
                </PopoverContent>
            </Portal>
        </Popover>
    );
};

export default PopoverExportButton;
