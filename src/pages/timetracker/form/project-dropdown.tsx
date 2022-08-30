import { VStack, Heading, Box, Text, Divider } from "@chakra-ui/react";
import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import { SingleValue, OptionProps, components } from "react-select";
import { getResourceListFilteredAndPaginated } from "../../../api/api";
import { Project } from "../../../api/types";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setFormProject } from "../../../redux/slices/timetrackSlice";
import Select from "react-select";

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
        ["projects/for-timetrack"],
        () =>
            getResourceListFilteredAndPaginated<Project>(
                "projects/for-timetrack",
                getAuthHeader(),
                [],
                [],
                { field: "name", isAscending: true },
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
        <VStack alignItems={"flex-start"}>
            <Heading fontSize={"md"}>Project</Heading>
            <Box w={"full"}>
                <Select
                    size="md"
                    options={getOptions()}
                    // @ts-ignore
                    value={getInternalValueFromId()}
                    // Typing for this option is wrong, it detects a MultiValue even if isMulti prop is not set
                    // @ts-ignore
                    onChange={onChange}
                    isLoading={isLoading}
                    // @ts-ignore
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
                alignItems={"flex-start"}
                spacing={1}
                w={"full"}
                borderLeftWidth={"5px"}
                borderLeftColor={
                    props.data.uiColor ? props.data.uiColor : "steelblue"
                }
                ps={5}
            >
                <Text fontWeight={"bold"}>{props.data.label}</Text>
                <Divider
                    w={"full"}
                    borderColor={
                        props.data.uiColor ? props.data.uiColor : "steelblue"
                    }
                />
                <Text fontSize={"xs"}>{props.data.accountName}</Text>
            </VStack>
        </components.Option>
    );
};

export default ProjectDropdown;
