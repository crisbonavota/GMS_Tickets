import { VStack, Heading, Box, Text, Divider } from '@chakra-ui/react';
import { chakraSelectStyle } from '@gms-micro/chakra-react-select-styles';
import {
    components,
    OptionProps,
    Select,
    SingleValue,
} from 'chakra-react-select';
import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import {
    getResourceListFilteredAndPaginated,
    Project,
} from '@gms-micro/api-utils';
import { useAuthHeader } from 'react-auth-kit';
import { useState, useCallback, useMemo, useEffect } from 'react';

interface Props {
    projectId: number | null;
    setProjectId: (projectId: number | null) => void;
}

interface InternalValue {
    label: string;
    value: number;
}

const ProjectDropdown = ({ projectId, setProjectId }: Props) => {
    const [internalValue, setInternalValue] = useState<InternalValue | null>(
        null
    );
    const getAuthHeader = useAuthHeader();
    const query = useQuery<AxiosResponse<Project[]>, AxiosError, Project[]>(
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

    const { isSuccess, isLoading, data: projects } = query;

    const onChange = useCallback((v: SingleValue<InternalValue>) => {
        setInternalValue(v);
        setProjectId(v ? v.value : null);
    }, []);

    const options = useMemo(
        () =>
            isSuccess && projects
                ? projects.map((p) => ({
                      label: p.name,
                      value: p.id,
                  }))
                : [],
        [isSuccess, projects]
    );

    // This is for when the value gets changed from outside of the component (clicking on copy, edit, etc on the table)
    useEffect(() => {
        if (!projectId) return setInternalValue(null);
        // We find in the options the project that matches the id and update the internal value accordingly
        const element = options.find((item) => item.value === projectId);
        element && setInternalValue(element);
    }, [projectId, options]);

    const Option = useCallback(
        (props: OptionProps<InternalValue>) => {
            const project = projects?.find((pr) => pr.id === props.data.value);
            return (
                <components.Option {...props}>
                    <VStack
                        alignItems={'flex-start'}
                        spacing={1}
                        w={'full'}
                        borderLeftWidth={'5px'}
                        borderLeftColor={
                            project?.uiColor ? project.uiColor : 'steelblue'
                        }
                        ps={5}
                    >
                        <Text fontWeight={'bold'}>{props.data.label}</Text>
                        <Divider
                            w={'full'}
                            borderColor={
                                project?.uiColor ? project.uiColor : 'steelblue'
                            }
                        />
                        <Text fontSize={'xs'}>
                            {project?.proposal?.account?.name}
                        </Text>
                    </VStack>
                </components.Option>
            );
        },
        [projects]
    );

    return (
        <VStack alignItems={'flex-start'}>
            <Heading fontSize={'md'}>Project</Heading>
            <Box w={'full'}>
                <Select
                    size="md"
                    options={options}
                    //@ts-ignore
                    chakraStyles={chakraSelectStyle}
                    value={internalValue}
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
export default ProjectDropdown;
