import { DynamicTable, DynamicTableFormat } from '@gms-micro/table-utils';
import { LegacyUserPublic } from '@gms-micro/auth-types';
import RemoveMember from '../tabs/jobs/resources/RemoveMember';
import { useMemo } from 'react';

interface Props {
    members: LegacyUserPublic[];
    projectId: number;
}

const ResourcesTable = ({ members, projectId }: Props) => {

    const format: DynamicTableFormat[] = useMemo(() => [
        {
            header: 'Email',
            accessor: 'email',
        },
        {
            header: 'Fullname',
            accessor: 'fullName',
        },
        {
            header: 'DELETE',
            accessor: 'id',
            accessorFn: (id: number) => <RemoveMember memberId={id} projectId={projectId}/>,
        },
    ], [projectId, members]);
    return (
        <DynamicTable
            format={format}     
            data={members}
        />
    );
};

export default ResourcesTable;
