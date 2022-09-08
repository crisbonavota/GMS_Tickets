import { Th, HStack, Text } from "@chakra-ui/react";
import { useCallback } from "react";
import { Sort } from "../../api/types";
import { DynamicTableFormat } from "./DynamicTable";
import SortIcons from "./SortIcons";

interface Props {
    item: DynamicTableFormat;
    sort?: Sort;
    setSort?: (sort: Sort) => void;
}

const DynamicTableHeader = ({ item, sort, setSort }: Props) => {
    const onSortClick = useCallback(
        (accessor: string) => {
            if (!sort || !setSort) return;
            if (sort.field === accessor)
                setSort({ ...sort, isAscending: !sort.isAscending });
            else setSort({ field: accessor, isAscending: true });
        },
        [sort, setSort]
    );

    return (
        <Th>
            <HStack spacing={1}>
                <Text>{item.header}</Text>
                {sort && setSort && !item.disableSort && (
                    <SortIcons
                        onClick={() => onSortClick(item.accessor)}
                        isSorted={item.accessor === sort.field}
                        isSortedAscending={sort.isAscending}
                    />
                )}
            </HStack>
        </Th>
    );
};

export default DynamicTableHeader;
