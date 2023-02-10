import moment from "moment";
import { SimpleGrid, HStack } from "@chakra-ui/react";
import UserDetailedViewBodyComponent from "../../UserDetailedViewBodyComponent";

interface Props {
    fileNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    entryDate: string;
    status: boolean;
    afipId: string;
    gender: boolean;
    birthDate: string;
    mobilePhone: string;
}

const PersonalInfoDetailedView = ({
    fileNumber,
    firstName,
    lastName,
    email,
    entryDate,
    status,
    afipId,
    gender,
    birthDate,
    mobilePhone,
}: Props) => {
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
                    resource={fileNumber}
                    label={"File Number"}
                />
                <UserDetailedViewBodyComponent
                    resource={firstName}
                    label={"First Name"}
                />
                <UserDetailedViewBodyComponent
                    resource={lastName}
                    label={"Last Name"}
                />
                <UserDetailedViewBodyComponent
                    resource={email}
                    label={"Email"}
                />
                <UserDetailedViewBodyComponent
                    resource={moment(entryDate).format("yyyy-MM-DD")}
                    label={"Date of Admission"}
                />
                <UserDetailedViewBodyComponent
                    resource={status === true ? "Active" : "Inactive"}
                    label={"Status"}
                />
                <UserDetailedViewBodyComponent
                    resource={afipId}
                    label={"DNI/CUIT/CUIL/Social Nº"}
                />
                <UserDetailedViewBodyComponent
                    resource={gender === true ? "Male" : "Female"}
                    label={"Gender"}
                />
                <UserDetailedViewBodyComponent
                    resource={moment(birthDate).format("yyyy-MM-DD")}
                    label={"Date of Birth"}
                />
                <UserDetailedViewBodyComponent
                    resource={mobilePhone}
                    label={"Mobile Phone"}
                />
            </SimpleGrid>
        </HStack>
    );
};

export default PersonalInfoDetailedView;
