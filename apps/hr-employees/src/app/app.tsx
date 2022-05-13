import { useQuery } from "react-query"
import { Employee, getResourceListFilteredAndPaginated } from '@gms-micro/api-utils';
import { Heading, VStack, Text, Wrap, Flex } from '@chakra-ui/react';
import TableComponent from './table/table';
import { TablePaginationWithChakra, TableSingleLegacyUserFilterWithChakra } from '@gms-micro/table-utils';
import { useState, useMemo, useEffect } from 'react';
import { Sort } from "@gms-micro/api-filters";
import PositionFilter from './position-filter/position-filter';
import { FilterItem } from '../../../../libs/api-filters/src/lib/api-filters';
import AfipIdInput from "./afip-id-filter/afip-id-filter";
import CountryFilter from "./country-filter/country-filter";
import FileNumberInput from "./file-number-filter/file-number-filter";

const App = ({ authHeader }: { authHeader: string }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [position, setPosition] = useState<string>("");
    const [afipId, setAfipId] = useState<string>("");
    const [birthCountry, setBirthCountry] = useState<string>("");
    const [fileNumber, setFileNumber] = useState<number>();
    const [legacyUser, setLegacyUser] = useState<string>("");
    const [sort, setSort] = useState<Sort>({ field: 'legacyUser.fullName', isAscending: true });

    useEffect(() => {
        setCurrentPage(0);
    }, [position, legacyUser, afipId, birthCountry, fileNumber, sort]);

    const filters: FilterItem[] = useMemo(() => [
        { field: 'position.Id', value: position !== "" ? position : undefined },
        { field: 'afipId', value: afipId !== "" ? afipId : undefined },
        { field: 'birthCountry.Id', value: birthCountry !== "" ? birthCountry : undefined },
        { field: 'fileNumber_cnt', value: fileNumber !== null ? fileNumber : undefined },
        { field: 'legacyUserId', value: legacyUser !== "" ? legacyUser : undefined }
    ], [position, legacyUser, afipId, birthCountry, fileNumber]);

    const refetchTriggers = useMemo(() => [currentPage, sort, position, legacyUser, afipId, fileNumber, birthCountry], 
    [currentPage, sort, position, legacyUser, afipId, fileNumber, birthCountry]);

    const employeesQuery = useQuery(['employees', refetchTriggers], () => getResourceListFilteredAndPaginated<Employee>(
        "employees",
        authHeader,
        filters,
        [],
        sort,
        currentPage
    ));

    return (
        <VStack w={'full'} maxW={'full'} p={5}>
            <VStack w={'90%'} spacing={5}>
                <Heading fontSize={'2xl'}>Employees</Heading>
                <Flex justifyContent={'space-between'} alignItems={'flex-start'} w={'full'} flexDir={{ base: 'column-reverse', md: 'row' }}>
                    <Wrap w={'full'} spacing={5} justifyContent={'flex-start'} alignItems={'flex-end'}>
                <TableSingleLegacyUserFilterWithChakra authHeader={authHeader} legacyUser={legacyUser} setLegacyUser={setLegacyUser} isLoading={employeesQuery.isLoading} />
                <PositionFilter authHeader={authHeader} position={position} setPosition={setPosition} isLoading={employeesQuery.isLoading} />
                <AfipIdInput afipId={afipId} setAfipId={setAfipId} />
                <CountryFilter authHeader={authHeader} country={birthCountry} setCountry={setBirthCountry} isLoading={employeesQuery.isLoading}/> 
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

export default App
