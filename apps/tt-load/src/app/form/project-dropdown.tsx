import { VStack, Heading, Box, Text, Divider } from '@chakra-ui/react';
import { chakraSelectStyle } from '@gms-micro/chakra-react-select-styles';
import {
    components,
    OptionProps,
    Select,
    SingleValue,
} from 'chakra-react-select';
import { useQuery } from 'react-query';
import {
    getResourceListFilteredAndPaginated,
    Project,
} from '@gms-micro/api-utils';
import { useAuthHeader } from 'react-auth-kit';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { setFormProject } from '../../redux/slices/timetrackSlice';

interface InternalValue {
    label: string;
    value: number | null;
    uiColor?: string;
    accountName?: string;
}

const ProjectDropdown = () => {
    const dispatch = useAppDispatch();
    const projectId = useAppSelector((state) => state.timetrack.form.project);

    const setProjectId = (v: SingleValue<InternalValue>) => {
        dispatch({
            type: setFormProject,
            payload: v ? v.value : null,
        });
    };

    const getAuthHeader = useAuthHeader();
    const {
        isSuccess,
        isLoading,
        data: projects,
    } = useQuery(
        ['projects/for-timetrack'],
        () =>
            getResourceListFilteredAndPaginated<Project>(
                'projects/for-timetrack',
                getAuthHeader(),
                [],
                [],
                { field: 'name', isAscending: true },
                0,
                1000
            ),
        { select: (r) => r.data }
    );

    const getInternalValueFromId = () => {
        if (!isSuccess || !projects) return null;
        const project = projects.find((p) => p.id === projectId);
        if (!project) return null;
        return {
            label: project.name,
            value: project.id,
            uiColor: project.uiColor,
            accountName: project.proposal?.account?.name,
        };
    };

    const getOptions = () => {
        if (!isSuccess || !projects) return [];
        return projects.map((p) => ({
            label: p.name,
            value: p.id,
            uiColor: p.uiColor,
            accountName: p.proposal?.account?.name,
        }));
    };

    const onChange = (v: SingleValue<InternalValue>) => {
        setProjectId(v);
    };

    return (
        <VStack alignItems={'flex-start'}>
            <Heading fontSize={'md'}>Project</Heading>
            <Box w={'full'}>
                <Select
                    size="md"
                    options={getOptions()}
                    //@ts-ignore
                    chakraStyles={chakraSelectStyle}
                    value={getInternalValueFromId()}
                    // Typing for this option is wrong, it detects a MultiValue even if isMulti prop is not set
                    // @ts-ignore
                    onChange={onChange}
                    isLoading={isLoading}
                    components={{ Option }}
                />
            </Box>
        </VStack>
    );
};

const Option = (props: OptionProps<InternalValue>) => {
    return (
        <components.Option {...props}>
            <VStack
                alignItems={'flex-start'}
                spacing={1}
                w={'full'}
                borderLeftWidth={'5px'}
                borderLeftColor={
                    props.data.uiColor ? props.data.uiColor : 'steelblue'
                }
                ps={5}
            >
                <Text fontWeight={'bold'}>{props.data.label}</Text>
                <Divider
                    w={'full'}
                    borderColor={
                        props.data.uiColor ? props.data.uiColor : 'steelblue'
                    }
                />
                <Text fontSize={'xs'}>{props.data.accountName}</Text>
            </VStack>
        </components.Option>
    );
};

export default ProjectDropdown;
