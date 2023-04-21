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
import { changeColumnsFilter } from "../../redux/slices/tt-reports";

interface Props {
    reportQuery: UseQueryResult<AxiosResponse<string, any>, unknown>;
  }
  
  const PopoverExportButton = ({ reportQuery }: Props) => {
    const dispatch = useAppDispatch();
    const state = useAppSelector((col) => col.ttReports.filters.columns);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const item = event.target.name;
        const isChecked = event.target.checked;
        let newCheckedItems = [...state];
        if (isChecked) {
          newCheckedItems.push(item);
        } else {
          newCheckedItems = newCheckedItems.filter(val => val !== item);
        }
        dispatch({
          type: changeColumnsFilter,
          payload: {
            key: "columns",
            value: newCheckedItems,
          },
        });
      };
  
    const isChecked = (item: string) => {
      return state.includes(item);
    };
  
    const isAtLeastOneChecked = () => {
      return state.length === 0 ? false : true;
    };
  
    const onExport = (base64?: string) => {
      base64 &&
        downloadFile(
          generateExcelFileURL(base64),
          `gms_timetrack_report_${new Date(Date.now()).toISOString()}.xlsx`
        );
    };
  
    return (
      <Popover>
        <PopoverTrigger>
          <Button colorScheme={"green"} w={"full"} disabled={reportQuery.isError}>
            Export
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Select columns to include</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Stack pl={6} mt={1} spacing={1}>
                {exportModuleCheckBoxOptions.map((item) => (
                  <Checkbox
                    name={item}
                    key={item}
                    isChecked={isChecked(item)}
                    onChange={handleChange}
                    defaultChecked={true}
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
