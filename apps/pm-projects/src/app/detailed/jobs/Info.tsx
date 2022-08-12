import { Project } from '@gms-micro/api-utils';
import InfoBox, { InfoTitle } from '../InfoBox';
import { VStack, HStack } from '@chakra-ui/react';
import EditButton from '../EditButton';

interface Props {
    job: Project;
}

const Info = ({ job }: Props) => {
    return (
        <InfoBox>
            <HStack>
                <VStack
                    h={'full'}
                    justifyContent={'space-between'}
                    alignItems={'flex-start'}
                >
                    <InfoTitle title={'Leader'} content={job.leaderLegacyUser.fullName} />
                    <InfoTitle title={'Contract Type'} content={job.contractType.toString()} />
                    <InfoTitle title={'Start Date'} content={job.startDate?.toString()} />
                </VStack>
                <VStack alignItems={'flex-start'} >
                    <InfoTitle title={'Currency'} content={job.currency?.code} />
                    <InfoTitle title={'Comments'} content={job.comments} />
                    <InfoTitle title={'End Date'} content={job.endDate?.toString()} />
                </VStack>
            </HStack>
            <VStack alignItems={"flex-start"} paddingTop={10}>
                <InfoTitle title={'Notes'} content={job.notes} />
                <HStack paddingTop={5}>
                    <EditButton />
                </HStack>
            </VStack>
            
            
            
        </InfoBox>
    );
};
export default Info;
