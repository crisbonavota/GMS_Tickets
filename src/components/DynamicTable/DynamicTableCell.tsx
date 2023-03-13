import { Td } from "@chakra-ui/react";
import * as lodash from "lodash";
import { useMemo } from "react";
import { DynamicTableFormat } from "./DynamicTable";
import { Text, Tooltip } from "@chakra-ui/react";

interface Props {
    format: DynamicTableFormat;
    item: any;
}

const DynamicTableCell = ({ item, format }: Props) => {
    const nestedProp = useMemo(
        () => lodash.get(item, format.accessor),
        [item, format]
    );
    return (
        <Td
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={format.withTooltip ? "nowrap" : "normal"}
            maxWidth={format.withTooltip ? "7rem" : "none"}
        >
            {format.withTooltip ? (
                <Tooltip hasArrow label={nestedProp} bg={"teal.500"}>
                    <Text
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        whiteSpace={"nowrap"}
                        cursor={"default"}
                    >
                        {format.rawObject ? item : nestedProp}
                    </Text>
                </Tooltip>
            ) : format.accessorFn ? (
                format.accessorFn(format.rawObject ? item : nestedProp)
            ) : format.rawObject ? (
                item
            ) : (
                nestedProp
            )}
        </Td>
    );
};

export default DynamicTableCell;
