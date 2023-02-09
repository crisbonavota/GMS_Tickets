import { GridItem, HStack, Text } from "@chakra-ui/react";
import { useAuthHeader } from "react-auth-kit";
import { useQuery } from "react-query";
import { getResourceListFilteredAndPaginated } from "../../../../api/api";
import { Child } from "../../../../api/types";
import DeleteButton from "../../../../components/DeleteButton";
import moment from "moment";

interface Props {
    employeeId: number;
}

const Childs = ({ employeeId }: Props) => {
    const getAuthHeader = useAuthHeader();

    const { data: children } = useQuery(
        [`children-${employeeId}`],
        () =>
            getResourceListFilteredAndPaginated<Child>(
                `children/${employeeId}`,
                getAuthHeader()
            ),
        { select: (r) => r.data }
    );

    return (
        <>
            {children &&
                children?.map((child) => (
                    <GridItem colSpan={1}>
                        <Text fontWeight={"bold"}>
                            Child #{children.indexOf(child) + 1}
                        </Text>
                        <HStack
                            background={"#F5F5F5"}
                            borderRadius={"5px"}
                            width={"100%"}
                            height={"2rem"}
                            cursor={"default"}
                            paddingLeft={"1rem"}
                            color={"#EF810E"}
                            fontWeight={"bold"}
                            spacing={5}
                        >
                            <Text>
                                {moment(child.birthDate).format("yyyy-MM-DD")}
                            </Text>
                            <DeleteButton
                                id={child.id}
                                resetQueries={`children-${employeeId}`}
                                resource={"children"}
                            />
                        </HStack>
                    </GridItem>
                ))}
        </>
    );
};

export default Childs;
