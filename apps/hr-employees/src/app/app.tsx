import { useQuery } from "react-query"
import { Employee, getResourceListFilteredAndPaginated } from '@gms-micro/api-utils';
import { Heading, VStack, Text, Wrap, Flex, Input } from '@chakra-ui/react';
import TableComponent from './table/table';
import { TablePaginationWithChakra} from '@gms-micro/table-utils';
import { useState, useMemo, useEffect } from 'react';
import { Sort } from "@gms-micro/api-filters";
import PositionFilter from './position-filter/position-filter';
import { FilterItem } from '../../../../libs/api-filters/src/lib/api-filters';
import AfipIdInput from "./afip-id-filter/afip-id-filter";
import CountryFilter from "./country-filter/country-filter";
import FileNumberInput from "./file-number-filter/file-number-filter";
import { useDidMountEffect } from '@gms-micro/react-hooks';
import { useAuthHeader } from 'react-auth-kit';

const App = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [position, setPosition] = useState<string>("");
    const [afipId, setAfipId] = useState<string>("");
    const [birthCountry, setBirthCountry] = useState<string>("");
    const [fileNumber, setFileNumber] = useState<number>();
    const [fullName, setfullName] = useState("");
    const [refetchAux, setRefetchAux] = useState(0);
    const [sort, setSort] = useState<Sort>({ field: 'legacyUser.fullName', isAscending: true });
    const getAuthHeader = useAuthHeader();

    const onFullNameSearch = useMemo(() =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
        setfullName(e.target.value);
    }, []);

    useEffect(() => {
        setCurrentPage(0);
    }, [position, afipId, refetchAux, birthCountry, fileNumber, sort]);

    // Workaround for waiting 1500ms after user finished typing in the general searchbar for the search to be triggered
    useDidMountEffect(() => {
        // Instead of passing generalSearch directly to the query filter, we use an aux that's triggered after 1500 ms
        // This is to avoid refetching the query when the user is typing in the general searchbar
        const timeOutId = setTimeout(() => setRefetchAux(refetchAux + 1), 500);
        return () => clearTimeout(timeOutId);
    }, [fullName]);

    const filters: FilterItem[] = useMemo(() => [
        { field: 'position.Id', value: position !== "" ? position : undefined },
        { field: 'afipId', value: afipId !== "" ? afipId : undefined },
        { field: 'birthCountry.Id', value: birthCountry !== "" ? birthCountry : undefined },
        { field: 'fileNumber_cnt', value: fileNumber !== null ? fileNumber : undefined }
    ], [position, refetchAux,  afipId, birthCountry, fileNumber]);

    const customFilters = useMemo(() => [{ name: 'fullName', value: fullName }], [fullName]);

    const refetchTriggers = useMemo(() => [currentPage, sort, position, afipId, fileNumber, birthCountry, refetchAux], 
    [currentPage, sort, position, afipId, fileNumber, birthCountry, refetchAux]);

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
                <Heading fontSize={'2xl'}>Employees</Heading>
                <Flex justifyContent={'space-between'} alignItems={'flex-start'} w={'full'} flexDir={{ base: 'column-reverse', md: 'row' }}>
                    <Wrap w={'full'} spacing={5} justifyContent={'flex-start'} alignItems={'flex-end'}>
                    <Input
                        w={'full'}
                        bgColor={'white'}
                        value={fullName}
                        onChange={onFullNameSearch}
                        placeholder={'Search by employee'}
                    />
                <PositionFilter position={position} setPosition={setPosition} isLoading={employeesQuery.isLoading} />
                <AfipIdInput afipId={afipId} setAfipId={setAfipId} />
                <CountryFilter country={birthCountry} setCountry={setBirthCountry} isLoading={employeesQuery.isLoading}/> 
                <FileNumberInput fileNumber={fileNumber} setFileNumber={setFileNumber}/>
                    </Wrap>
                </Flex>
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

