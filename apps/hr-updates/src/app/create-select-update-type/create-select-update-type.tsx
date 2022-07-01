import { Text, Menu, MenuButton, MenuList, IconButton, VStack } from '@chakra-ui/react';
import { getResourceList, UpdateType } from '@gms-micro/api-utils';
import { useAuthHeader } from 'react-auth-kit';
import { VscNewFile } from 'react-icons/vsc';
import { useQuery } from 'react-query';
import CreateModal from '../create-modal/create-modal';


const CreateSelectUpdateType = () => {
    const getAuthHeader = useAuthHeader();
    const updateTypesQuery = useQuery(['updateTypes'], () => getResourceList<UpdateType>('updates/types', getAuthHeader()));

    if (updateTypesQuery.isError) return <Text>Error: {JSON.stringify(updateTypesQuery.error)}</Text>

    return (
        <Menu>
            <VStack>
                <Text fontSize={'sm'}>Create</Text>
                <MenuButton>
                    <IconButton isLoading={updateTypesQuery.isLoading} size={'lg'} icon={<VscNewFile />} aria-label="Create" colorScheme={'green'} />
                </MenuButton>
            </VStack>
            <MenuList maxH={'50vh'} overflowY={'auto'}>
                {updateTypesQuery.isSuccess && updateTypesQuery.data.data.map((type) => <CreateModal updateType={type} key={type.id} />)}
            </MenuList>
        </Menu>
    )
}

export default CreateSelectUpdateType;