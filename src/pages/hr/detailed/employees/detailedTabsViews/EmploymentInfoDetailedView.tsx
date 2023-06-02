import { SimpleGrid, HStack } from "@chakra-ui/react";
import UserDetailedViewBodyComponent from "../../UserDetailedViewBodyComponent";
import { ApplicationUserPrivate, Employer, WorkTime } from "../../../../../api/types";
import { useAuthUser } from "react-auth-kit";

interface Props {
    salaryCurrency: string;
    medicalCoverage: string;
    businessUnit: string;
    position: string;
    salaryAmount: string;
    workTime: WorkTime;
    employer: Employer
}

const EmploymentInfoDetailedView = ({
    salaryCurrency,
    medicalCoverage,
    businessUnit,
    position,
    salaryAmount,
    workTime,
    employer
}: Props) => {
    const authUser = useAuthUser()() as ApplicationUserPrivate;
    return (
        <HStack
            align={"center"}
            justify={"center"}
            bgColor={"#FFFFFF"}
            borderBottomLeftRadius={"1.18rem"}
            borderBottomRightRadius={"1.18rem"}
            boxShadow={"2xl"}
            padding={"2rem"}
        >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} width={"80%"}>
                <UserDetailedViewBodyComponent
                    resource={salaryCurrency}
                    label={"Salary Currency"}
                />
                <UserDetailedViewBodyComponent
                    resource={medicalCoverage}
                    label={"Medical Coverage"}
                />
                <UserDetailedViewBodyComponent
                    resource={businessUnit}
                    label={"Business Unit"}
                />
                <UserDetailedViewBodyComponent
                    resource={position}
                    label={"Position"}
                />
                {!authUser.roles.includes("hr-limited") &&
                    <UserDetailedViewBodyComponent
                        resource={salaryAmount}
                        label={"Salary Amount"}
                    />
                }
                <UserDetailedViewBodyComponent
                    resource={WorkTime[workTime]}
                    label={"Work Time"}
                />
                <UserDetailedViewBodyComponent
                    resource={Employer[employer]}
                    label={"Employer"}
                />
            </SimpleGrid>
        </HStack>
    );
};

export default EmploymentInfoDetailedView;
