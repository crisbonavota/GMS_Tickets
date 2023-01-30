import { Button, Link, Tooltip } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { Link as RouterLink } from "react-router-dom";

interface Props {
    id: number;
    resource: string;
}

const DetailsCell = ({ id, resource }: Props) => {
    return (
        <Link
            as={RouterLink}
            to={`${resource}/${id}`}
            w={"fit-content"}
            textDecoration={"none !important"}
        >
            <Tooltip hasArrow label={"Details"} bg={"teal.500"}>
                <Button
                    colorScheme={"orange"}
                    variant={"ghost"}
                    leftIcon={<BsSearch size={"1.2rem"} />}
                ></Button>
            </Tooltip>
        </Link>
    );
};

export default DetailsCell;
