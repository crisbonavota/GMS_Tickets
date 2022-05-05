import { chakra, HStack, IconButton, Select, Text, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { useQuery } from 'react-query';
import { getResourceList } from '../../../api-utils/src/lib/api-utils';
import { LegacyUserPublic } from '../../../auth-types/src/lib/auth-types';

export interface TablePaginationWithChakraProps {
    currentPage: number,
    setCurrentPage: (page: number) => void,
    pagesAmountHeader?: string,
    isLoading: boolean
}

export const TablePaginationWithChakra = ({ currentPage, setCurrentPage, pagesAmountHeader, isLoading }: TablePaginationWithChakraProps) => {
    return (
        <HStack>
            <Text>Current page:</Text>
            <Text fontWeight={'bold'}>{currentPage + 1}</Text>
            <IconButton
                icon={<MdSkipPrevious color='black' />}
                onClick={() => setCurrentPage(currentPage - 5)}
                size={'s'}
                colorScheme={'whiteAlpha'}
                aria-label="Jump 5 pages back"
                disabled={currentPage <= 4 || isLoading}
            />
            <IconButton
                icon={<GrFormPrevious />}
                onClick={() => setCurrentPage(currentPage - 1)}
                size={'s'}
                colorScheme={'whiteAlpha'}
                aria-label="Previous page"
                disabled={currentPage === 0 || isLoading}
            />
            <IconButton
                icon={<GrFormNext />}
                onClick={() => setCurrentPage(currentPage + 1)}
                size={'s'}
                colorScheme={'whiteAlpha'}
                aria-label="Next page"
                disabled={pagesAmountHeader === (currentPage + 1).toString() || isLoading}
            />
            <IconButton
                icon={<MdSkipNext color='black' />}
                onClick={() => setCurrentPage(currentPage + 5)}
                size={'s'}
                colorScheme={'whiteAlpha'}
                aria-label="Jump 5 pages forward"
                // Disabled if there's at least 5 pages to jump forward from current page
                disabled={(pagesAmountHeader && (parseInt(pagesAmountHeader) - currentPage - 5) <= 0) || isLoading || !pagesAmountHeader}
            />
        </HStack>
    );
}

export interface TableDatesFilterWithChakraProps {
    from: string,
    to: string,
    setFrom: (date: string) => void,
    setTo: (date: string) => void,
    isLoading: boolean,
    full?: boolean
}

export const TableDatesFilterWithChakra = ({ from, to, setFrom, setTo, isLoading, full }: TableDatesFilterWithChakraProps) => {
    const onFromChange = useMemo(() =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setFrom(e.target.value);
            to && Date.parse(to) < Date.parse(e.target.value) && setTo("");
        }, []);

    const onToChange = useMemo(() =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setTo(e.target.value);
            from && Date.parse(from) > Date.parse(e.target.value) && setFrom("");
        }, []);

    return (
        <HStack w={full ? 'full' : undefined}>
            <VStack alignItems={'flex-start'} flex={full ? 1 : undefined}>
                <Text fontSize={'sm'}>From</Text>
                <chakra.input
                    disabled={isLoading}
                    onChange={onFromChange}
                    value={from}
                    p={1.5}
                    borderRadius={5}
                    borderColor={'lightgray'}
                    borderWidth={1}
                    type={'date'}
                    w={full ? 'full' : undefined}
                />
            </VStack>
            <VStack alignItems={'flex-start'} flex={full ? 1 : undefined}>
                <Text fontSize={'sm'}>To</Text>
                <chakra.input
                    disabled={isLoading}
                    onChange={onToChange}
                    value={to}
                    p={1.5}
                    borderRadius={5}
                    borderColor={'lightgray'}
                    borderWidth={1}
                    type={'date'}
                    w={full ? 'full' : undefined}
                />
            </VStack>
        </HStack>
    );
}

export interface TableLegacyUserFilterWithChakraProps {
    authHeader: string,
    legacyUser: string,
    setLegacyUser: (legacyUser: string) => void,
    isLoading: boolean
}

export const TableSingleLegacyUserFilterWithChakra = ({ authHeader , legacyUser, setLegacyUser, isLoading}: TableLegacyUserFilterWithChakraProps) => {
    const query = useQuery(['employees'], () => getResourceList<LegacyUserPublic>("users/legacy", authHeader));
    return (
        <VStack alignItems={'flex-start'} w={'15rem'}>
            <Text fontSize={'sm'}>Employee</Text>
            {query.isSuccess &&
                <Select w={'full'} bgColor={'white'} value={legacyUser} onChange={(e) => setLegacyUser(e.target.value)} disabled={isLoading}>
                    <option value={""}>All</option>
                    {query.data.data.map(user => <option key={user.id} value={user.id}>{user.fullName}</option>)}    
                </Select>}
        </VStack>
    );
}