import { Center, Stack } from "@chakra-ui/react";
import CreateForm from "./form/create-form";
import TableComponent from "./table/table";
import EditForm from "./form/edit-form";
import { useAppSelector } from "../../redux/hooks";

const Timetracker = () => {
    const type = useAppSelector((state) => state.timetrack.type);
    return (
        <Center
            w={"full"}
            minH={"92vh"}
            bgColor={"white"}
            position={"relative"}
        >
            <Stack
                w={{ base: "100%", md: "85%" }}
                flexDir={{ base: "column", md: "row" }}
                pt={5}
            >
                {type === "create" ? <CreateForm /> : <EditForm />}
                <TableComponent />
            </Stack>
        </Center>
    );
};

export default Timetracker;
