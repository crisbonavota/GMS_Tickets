import { useQuery } from "react-query"
import { Employee, getResourceListFilteredAndPaginated } from '@gms-micro/api-utils';
import { VStack, Text, Wrap } from '@chakra-ui/react';
import TableComponent from './table/table';
import { TablePaginationWithChakra } from '@gms-micro/table-utils';
import { useState, useMemo, useEffect } from 'react';
import { Sort } from "@gms-micro/api-filters";
import PositionFilter from './position-filter/position-filter';
import { FilterItem } from '../../../../libs/api-filters/src/lib/api-filters';
import AfipIdInput from "./afip-id-filter/afip-id-filter";
import CountryFilter from "./country-filter/country-filter";
import FileNumberInput from "./file-number-filter/file-number-filter";
import { useAuthHeader } from 'react-auth-kit';
import NameInput from "./name-input/name-input";

const App = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [position, setPosition] = useState<string>("");
    const [afipId, setAfipId] = useState<string>("");
    const [birthCountry, setBirthCountry] = useState<string>("");
    const [fileNumber, setFileNumber] = useState<number>();
    const [fullName, setFullName] = useState("");
    const [sort, setSort] = useState<Sort>({ field: 'legacyUser.fullName', isAscending: true });
    const getAuthHeader = useAuthHeader();

    useEffect(() => {
        setCurrentPage(0);
    }, [position, afipId, fullName, birthCountry, fileNumber, sort]);

    const filters: FilterItem[] = useMemo(() => [
        { field: 'position.Id', value: position !== "" ? position : undefined },
        { field: 'afipId', value: afipId !== "" ? afipId : undefined },
        { field: 'birthCountry.Id', value: birthCountry !== "" ? birthCountry : undefined },
        { field: 'fileNumber_cnt', value: fileNumber !== null ? fileNumber : undefined }
    ], [position, fullName, afipId, birthCountry, fileNumber]);

    const customFilters = useMemo(() => [{ name: 'fullName', value: fullName }], [fullName]);

    const refetchTriggers = useMemo(() => [currentPage, sort, position, afipId, fileNumber, birthCountry, fullName],
        [currentPage, sort, position, afipId, fileNumber, birthCountry, fullName]);

    const employeesQuery = useQuery(['employees', refetchTriggers], () => getResourceListFilteredAndPaginated<Employee>(
        "employees",
        getAuthHeader(),
        filters,
        customFilters,
        sort,
        currentPage
    ));

    return (
        <VStack w={'full'} maxW={'full'} p={5}>
            <VStack w={'90%'} spacing={5}>
                <Wrap w={'full'} spacing={5} justifyContent={'flex-start'} alignItems={'flex-end'}>
                    <NameInput setter={setFullName} value={fullName} />
                    <PositionFilter position={position} setPosition={setPosition} isLoading={employeesQuery.isLoading} />
                    <AfipIdInput afipId={afipId} setAfipId={setAfipId} />
                    <CountryFilter country={birthCountry} setCountry={setBirthCountry} isLoading={employeesQuery.isLoading} />
                    <FileNumberInput fileNumber={fileNumber} setFileNumber={setFileNumber} />
                </Wrap>
                {employeesQuery.isLoading && <Text>Loading...</Text>}
                {employeesQuery.isError && <Text>There was an error generating the table, try again later</Text>}
                {employeesQuery.isSuccess && <TableComponent tableData={employeesQuery.data.data} sort={sort} setSort={setSort} />}
                <TablePaginationWithChakra
                    isLoading={employeesQuery.isLoading}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pagesAmountHeader={employeesQuery.data?.headers['pages-amount']}
                />
            </VStack>
        </VStack>
    )
}

export default App;

