import { SimpleGrid, HStack } from "@chakra-ui/react";
import moment from "moment";
import { SatisfactionLevel, Training } from "../../../../api/types";
import UserDetailedViewBodyComponent from "../UserDetailedViewBodyComponent";

interface Props {
    training: Training;
}

const TrainingInfo = ({ training }: Props) => {
    return (
        <HStack
            align={"center"}
            justify={"center"}
            bgColor={"#FFFFFF"}
            borderBottomLeftRadius={"1.18rem"}
            borderBottomRightRadius={"1.18rem"}
            boxShadow={"2xl"}
            padding={"2rem"}
            alignItems={"center"}
            marginTop={"0 !important"}
        >
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} width={"80%"}>
                <UserDetailedViewBodyComponent
                    resource={training.name}
                    label={"Name"}
                />
                <UserDetailedViewBodyComponent
                    resource={training.companyName}
                    label={"Company Name"}
                />
                <UserDetailedViewBodyComponent
                    resource={moment
                        .utc(training.startDate)
                        .format("yyyy-MM-DD")}
                    label={"Start Date"}
                />
                <UserDetailedViewBodyComponent
                    resource={
                        training.endDate
                            ? moment.utc(training.endDate).format("yyyy-MM-DD")
                            : "N/A"
                    }
                    label={"End Date"}
                />
                <UserDetailedViewBodyComponent
                    resource={training.numberOfHours.toString()}
                    label={"Number of Hours"}
                />
                <UserDetailedViewBodyComponent
                    resource={
                        training.satisfactionLevel
                            ? SatisfactionLevel[training.satisfactionLevel]
                            : "N/A"
                    }
                    label={"Satisfaction Level"}
                />
                <UserDetailedViewBodyComponent
                    resource={training.legacyUser.fullName}
                    label={"Full Name"}
                />
            </SimpleGrid>
        </HStack>
    );
};

export default TrainingInfo;
