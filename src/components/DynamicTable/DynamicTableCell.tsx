import { Td } from "@chakra-ui/react";
import * as lodash from "lodash";
import { useMemo } from "react";
import { DynamicTableFormat } from "./DynamicTable";

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
        <Td>
            {format.accessorFn
                ? format.accessorFn(format.rawObject ? item : nestedProp)
                : format.rawObject
                ? item
                : nestedProp}
        </Td>
    );
};

export default DynamicTableCell;
