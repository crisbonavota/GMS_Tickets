import { Flex } from "@chakra-ui/react";
import AsyncMultiDropdownFilter from "../../components/AsyncMultiDropdownFilter";
import { useAppDispatch } from "../../redux/hooks";
import { changeFilter } from "../../redux/slices/tt-reports";
import { useCallback } from "react";

const DropdownFilters = () => {
    const dispatch = useAppDispatch();

    const setLegacyUsers = useCallback(
        (legacyUsers: number[]) => {
            dispatch({
                type: changeFilter,
                payload: {
                    key: "legacyUsers",
                    value: legacyUsers,
                },
            });
        },
        [changeFilter, dispatch]
    );

    const setBusinessUnits = useCallback(
        (businessUnits: number[]) => {
            dispatch({
                type: changeFilter,
                payload: {
                    key: "businessUnits",
                    value: businessUnits,
                },
            });
        },
        [dispatch, changeFilter]
    );

    const setProjects = useCallback(
        (projects: number[]) => {
            dispatch({
                type: changeFilter,
                payload: {
                    key: "projects",
                    value: projects,
                },
            });
        },
        [dispatch, changeFilter]
    );

    const setAccounts = useCallback(
        (accounts: number[]) => {
            dispatch({
                type: changeFilter,
                payload: {
                    key: "accounts",
                    value: accounts,
                },
            });
        },
        [dispatch, changeFilter]
    );

    return (
        <Flex
            alignItems={"flex-start"}
            w={"full"}
            flexDir={{ base: "column", md: "row" }}
            gap={5}
        >
            <AsyncMultiDropdownFilter
                placeholder="Employee"
                setter={setLegacyUsers}
                nameProp="fullName"
                valueProp="id"
                resource="users/legacy"
                disableNormalFilter={false}
            />
            <AsyncMultiDropdownFilter
                placeholder="Business Unit"
                setter={setBusinessUnits}
                nameProp="name"
                valueProp="id"
                resource="businessUnits"
                disableNormalFilter={false}
            />
            <AsyncMultiDropdownFilter
                placeholder="Project"
                setter={setProjects}
                nameProp="name"
                customFilter={true}
                disableNormalFilter={true}
                valueProp="id"
                resource="projects"
            />
            <AsyncMultiDropdownFilter
                placeholder="Account"
                setter={setAccounts}
                nameProp="name"
                valueProp="id"
                resource="accounts"
                disableNormalFilter={false}
            />
        </Flex>
    );
};

export default DropdownFilters;
