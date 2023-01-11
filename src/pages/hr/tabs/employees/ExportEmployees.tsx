import { Button } from "@chakra-ui/react";
import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import { getReportFiltered } from "../../../../api/api";
import { useAppSelector } from "../../../../redux/hooks";
import { downloadFile, generateExcelFileURL } from "../../../../utils/files";
import { BiExport } from "react-icons/bi";


const onExport = (base64?: string) => {
  base64 &&
    downloadFile(
      generateExcelFileURL(base64),
      `gms_employees_report_${new Date(Date.now()).toISOString()}.xlsx`
    );
};

const ExportEmployees = () => {
  const getAuthHeader = useAuthHeader();
  const state = useAppSelector((s) => s.humanResources.employees);
  const reportQuery = useQuery(
    ["employeeReport", state.filters, state.sort, state.search],
    () => getReportFiltered("employees/report", getAuthHeader(), 
    [
        {field: "firstName", value: state.search},
        {field: "active", value: state.filters.active}
    ],
    [],
    state.sort
    )
  );

  return (
    <>
     <Button
          leftIcon={<BiExport color={"#3B8A7F"} size={"2rem"} />}
          variant={"ghost"}
          boxShadow={"none !important"}
          fontSize={"0.8rem"}
          textAlign={"center"}
          isLoading={reportQuery.isLoading}
          disabled={reportQuery.isError}
          onClick={() => onExport(reportQuery.data?.data)}
        >
          Export List
        </Button>
    </>
  );
};

export default ExportEmployees;
