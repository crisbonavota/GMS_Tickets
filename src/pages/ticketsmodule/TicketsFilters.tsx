import {
  Box,
  Button,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  FormControl,
  Input,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { changeFilter } from "../../redux/slices/providers";
import BusinessUnitFilter from "../hr/tabs/BusinessUnitFilter";
import StatusFilter from "../hr/tabs/StatusFilter";
import StaticSelection from "../../components/TicketsModule/StaticSelection";
import { getOptionsFromEnum } from "../../api/utils";
import { Priorities, Status } from "../../api/types";
import { useFormik } from "formik";
import React from "react";
import { useQueryClient } from "react-query";

interface TicketsFilters {
  search: string;
  onSearchChange: (search: string) => void;
  onSearchParamsUpdate: (newSearchParams: any) => void;
}

const TicketsFilters = ({
  onSearchParamsUpdate,
  onSearchChange,
  search,
}: TicketsFilters) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement | null>(null);
  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      status: "",
      priorities: "",
    },
    onSubmit: (values) => {
      const newSearchParams = {
        filters: [
          ...(search !== ""
            ? [
                {
                  field: "Subject",
                  value: search,
                  operator: "=",
                },
              ]
            : []),
          ...(values.status !== ""
            ? [
                {
                  field: "Status",
                  value: values.status,
                  operator: "=",
                },
              ]
            : []),

          ...(values.priorities !== ""
            ? [
                {
                  field: "Priority",
                  value: values.priorities,
                  operator: "=",
                },
              ]
            : []),
        ],
        SortField: "",
        SortDirection: "",
        Limit: 10,
        Offset: 0,
      };

      onSearchParamsUpdate(newSearchParams);
      queryClient.resetQueries("tickets");
    },
  });

  return (
    <>
      <FormControl w={"full"}>
        <VStack alignItems={"flex-start"} spacing={2} w="full">
          <StaticSelection
            setValue={(value: number) => {
              formik.setFieldValue("status", value);
            }}
            value={formik.values.status}
            options={getOptionsFromEnum(Status)}
          />

          <StaticSelection
            setValue={(value: number) => {
              formik.setFieldValue("priorities", value);
            }}
            value={formik.values.priorities}
            options={getOptionsFromEnum(Priorities)}
          />

          <Box paddingTop={5} display="flex" justifyContent="flex-end" w="full">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              onClick={() => formik.handleSubmit()}
            >
              Apply
            </Button>
          </Box>
        </VStack>
      </FormControl>
    </>
  );
};

export default TicketsFilters;
