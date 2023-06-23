import { VStack } from "@chakra-ui/react";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { changeFilter } from "../../../../redux/slices/pm";
import AccountFilter from "../AccountFilter";
import ClientFilter from "../ClientFilter";
import TypeFilter from "./TypeFilter";
import BusinessUnitFilter from "../../../hr/tabs/BusinessUnitFilter";
import StatusDropdownFilter from "./StatusDropdownFilter";

const JobsFilters = () => {
    const dispatch = useAppDispatch();
    const type = useAppSelector((s) => s.projectManagement.jobs.filters.type);
    const active = useAppSelector((s) => s.projectManagement.jobs.filters.active)

    const clientSetter = useCallback(
        (c: number | null) => {
            dispatch({
                type: changeFilter,
                payload: {
                    module: "jobs",
                    value: {
                        key: "client",
                        value: c,
                    },
                },
            });
        },
        [dispatch, changeFilter]
    );

    const accountSetter = useCallback(
        (a: number | null) => {
            dispatch({
                type: changeFilter,
                payload: {
                    module: "jobs",
                    value: {
                        key: "account",
                        value: a,
                    },
                },
            });
        },
        [dispatch, changeFilter]
    );

    const typeSetter = useCallback(
        (checked: string[]) => {
            const project = checked.includes("project");
            const proposal = checked.includes("proposal");

            // don't allow the user to uncheck both project and proposal
            if (!project && !proposal) return;

            dispatch({
                type: changeFilter,
                payload: {
                    module: "jobs",
                    value: {
                        key: "type",
                        value: {
                            project,
                            proposal,
                        },
                    },
                },
            });
        },
        [dispatch, changeFilter]
    );

    const stateSetter = useCallback(
        (checked: string[]) => {
            const active = checked.includes("active");
            const inactive = checked.includes("inactive");

            // don't allow the user to uncheck both active and inactive
            if (!active && !inactive) return;

            dispatch({
                type: changeFilter,
                payload: {
                    module: "jobs",
                    value: {
                        key: "active",
                        value: {
                            active,
                            inactive,
                        },
                    },
                },
            });
        },
        [dispatch, changeFilter]
    );

    const businessUnitSetter = useCallback(
        (val: number | null) => {
            dispatch({
                type: changeFilter,
                payload: {
                    module: "jobs",
                    value: {
                        key: "businessUnit",
                        value: val,
                    },
                },
            });
        },
        [dispatch, changeFilter]
    );

    return (
        <VStack w={"full"}>
            <ClientFilter setter={clientSetter} />
            <AccountFilter setter={accountSetter} />
            <BusinessUnitFilter setter={businessUnitSetter} />
            <TypeFilter setter={typeSetter} value={type} />
            <StatusDropdownFilter setter={stateSetter} value={active}/>
        </VStack>
    );
};

export default JobsFilters;
