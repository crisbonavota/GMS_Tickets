import { Button, HStack, Link, Text } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { Link as RouterLink } from "react-router-dom";

interface Props {
    id: number;
    resource: string;
}

const DetailsCell = ({ id, resource }: Props) => {
    return (
        <Link as={RouterLink} to={`${resource}/${id}`} w={"fit-content"} textDecoration={"none !important"}>
            <Button
                colorScheme={"orange"}
                variant={"ghost"}
                leftIcon={<BsSearch size={"1.2rem"} />}
            >Details
            </Button>
        </Link>
    );
};

export default DetailsCell;
