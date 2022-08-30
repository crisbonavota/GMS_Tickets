import { Box } from "@chakra-ui/react";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setCustomFiltersProject } from "../../../../redux/slices/timetrackSlice";
import SyncSingleValueDropdownFilter from "../../../../components/SyncSingleValueDropdownFilter";

const CustomTabProjectFilter = () => {
    const dispatch = useAppDispatch();
    const project = useAppSelector(
        (state) => state.timetrack.table.custom.project
    );
    const setProject = useCallback(
        (project: number | null) => {
            dispatch({
                type: setCustomFiltersProject,
                payload: project,
            });
        },
        [setCustomFiltersProject, dispatch]
    );

    return (
        <Box w={"full"}>
            <SyncSingleValueDropdownFilter
                resource={"projects/for-timetrack"}
                title={"Project"}
                value={project}
                setter={setProject}
                valueProp={"id"}
                labelProp={"name"}
            />
        </Box>
    );
};
export default CustomTabProjectFilter;
