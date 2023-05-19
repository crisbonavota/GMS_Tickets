import {
    Button,
    Checkbox,
    HStack,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Stack,
    useToast,
} from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { UseQueryResult } from "react-query";
import { downloadFile, generateExcelFileURL } from "../../utils/files";
import { exportModuleCheckBoxOptions } from "../../api/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeColumnsFilter } from "../../redux/slices/tt-reports";
import { useEffect, useState } from "react";
import { MdFileDownload } from "react-icons/md";

interface Props {
  reportQuery: UseQueryResult<AxiosResponse<string, any>, unknown>;
}

const PopoverExportButton = ({ reportQuery }: Props) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((col) => col.ttReports.filters.columns);
  const [options, setOptions] = useState<string[]>(exportModuleCheckBoxOptions);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const item = event.target.name;
    const isChecked = event.target.checked;
    const currentIndex = options.indexOf(item);
    let newOptions: string[];

    if (isChecked) {
      if (currentIndex === -1) {
        newOptions = [...options, item];
      } else {
        newOptions = options;
      }
    } else {
      if (currentIndex !== -1) {
        newOptions = [
          ...options.slice(0, currentIndex),
          ...options.slice(currentIndex + 1),
        ];
      } else {
        newOptions = options;
      }
    }

    const sortedColumns = exportModuleCheckBoxOptions.filter(
      (opt) => newOptions.includes(opt)
    );

    dispatch({
      type: changeColumnsFilter,
      payload: {
        key: "columns",
        value: sortedColumns,
      },
    });

    setOptions(newOptions);
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
    setIsPopoverOpen(false);
    toast({
      title: "Report exported",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleGenerateReport = async () => {
    setIsLoading(true);
    await reportQuery.refetch();
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(reportQuery.isLoading);
  }, [reportQuery.isLoading]);

  return (
    <Popover isOpen={isPopoverOpen} onClose={() => setIsPopoverOpen(false)}>
      <PopoverTrigger >
        <Button colorScheme={"orange"} w={"full"} disabled={reportQuery.isError} onClick={() => setIsPopoverOpen(true)}>
          Export
        </Button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent width={"full"} backgroundColor={"white"}>
          <PopoverArrow />
          <PopoverHeader>Select columns to include</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>
            <HStack>
              <Stack pl={6} mt={1} spacing={2}>
                {exportModuleCheckBoxOptions.slice(0, Math.ceil(exportModuleCheckBoxOptions.length / 3)).map((item) => (
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
              <Stack pl={6} pt={1} mt={1} spacing={2}>
                {exportModuleCheckBoxOptions.slice(Math.ceil(exportModuleCheckBoxOptions.length / 3), Math.ceil((exportModuleCheckBoxOptions.length / 3) * 2)).map((item) => (
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
              <Stack pl={6} mt={1} spacing={2}>
                {exportModuleCheckBoxOptions.slice(Math.ceil((exportModuleCheckBoxOptions.length / 3) * 2)).map((item) => (
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
            </HStack>
            <HStack pt={3}>
              <Button
                minW={"50%"}
                colorScheme="orange"
                isLoading={isLoading}
                onClick={() => handleGenerateReport()}
                isDisabled={!isAtLeastOneChecked()}
              >
                Generate report
              </Button>
              {reportQuery.isSuccess && isLoading === false &&
                <Button
                  minW={"50%"}
                  colorScheme="green"
                  onClick={() => onExport(reportQuery.data?.data)}
                  rightIcon={<MdFileDownload size={"1.3rem"} />}
                >
                  Download
                </Button>
              }
            </HStack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default PopoverExportButton;
