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
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeFilter, checkAllColumns } from "../../redux/slices/tt-reports";

interface Props {
    reportQuery: UseQueryResult<AxiosResponse<string, any>, unknown>;
}

const PopoverExportButton = ({ reportQuery }: Props) => {
    const dispatch = useAppDispatch();
    const state = useAppSelector((col) => col.ttReports.filters.columns);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const item = event.target.name;
        const isChecked = event.target.checked;
        let newCheckedItems = { ...state, [item]: isChecked };
        dispatch({
            type: changeFilter,
            payload: {
                key: "columns",
                value: newCheckedItems,
            },
        });
    };

    const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: checkAllColumns,
        });
    };

    const isChecked = (item: string) => {
        return state[item];
    };

    const isAllChecked = () => {
        return Object.values(state).every((el) => el === true);
    };

    const isAtLeastOneChecked = () => {
        return Object.values(state).some((el) => el === true);
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
