import InfoBox, { InfoTitle } from "../InfoBox";
import { VStack, HStack } from "@chakra-ui/react";
import EditButton from "../EditButton";
import { Project } from "../../../../api/types";

interface Props {
    job: Project;
}

const Info = ({ job }: Props) => {
    return (
        <InfoBox>
            <HStack>
                <VStack
                    h={"full"}
                    justifyContent={"space-between"}
                    alignItems={"flex-start"}
                >
                    <InfoTitle
                        title={"Leader"}
                        content={job.leaderLegacyUser.fullName}
                    />
                    <InfoTitle
                        title={"Contract Type"}
                        content={job.contractType.toString()}
                    />
                    <InfoTitle
                        title={"Start Date"}
                        content={job.startDate?.toString()}
                    />
                </VStack>
                <VStack alignItems={"flex-start"}>
                    <InfoTitle
                        title={"Currency"}
                        content={job.currency?.code}
                    />
                    <InfoTitle title={"Comments"} content={job.comments} />
                    <InfoTitle
                        title={"End Date"}
                        content={job.endDate?.toString()}
                    />
                </VStack>
            </HStack>
            <InfoTitle title={"Notes"} content={job.notes} />
        </InfoBox>
    );
};
export default Info;
