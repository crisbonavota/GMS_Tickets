import { Input, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface Props {
    setSearch: (search: string) => void;
    search: string;
}

const GeneralSearchFilter = ({ search, setSearch }: Props) => {
    return (
        <VStack alignItems={'flex-start'} minW={'15rem'}>
            <Text fontSize={'sm'}>Name</Text>
            <Input
                type={'text'}
                placeholder={'Search'}
                bgColor={'white'}
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearch(e.target.value)
                }
            />
            ;
        </VStack>
    );
};
export default GeneralSearchFilter;
