import InfoBox, { InfoTitle } from "../InfoBox";
import { VStack, HStack } from "@chakra-ui/react";
import { Project } from "../../../../api/types";
import { momentToLocaleDateString } from '../../../../utils/datetime';
import moment from 'moment';

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
                        content={momentToLocaleDateString(moment(job.startDate))}
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
                        content={momentToLocaleDateString(moment(job.endDate))}
                    />
                </VStack>
            </HStack>
            <InfoTitle title={"Notes"} content={job.notes} />
        </InfoBox>
    );
};
export default Info;
