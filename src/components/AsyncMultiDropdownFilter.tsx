import {
  VStack,
  Text,
  Box,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";
import { useAuthHeader } from "react-auth-kit";
import { MultiValue } from "react-select";
import AsyncSelect from "react-select/async";
import { getResourceListFilteredAndPaginated } from "../api/api";

interface Props {
  setter: (value: number[]) => void;
  resource: string;
  nameProp: string;
  valueProp: string;
  customFilter?: boolean;
  disableNormalFilter: boolean;
  label?: string;
  placeholder?: string;
}

const CustomMultiValue = (props: any) => {
  const { data, innerProps, removeProps } = props;
  return (
    <Tag
      {...innerProps}
      size="md"
      borderRadius="full"
      variant="solid"
      colorScheme="teal"
    >
      <TagLabel>{data.label}</TagLabel>
      <TagCloseButton {...removeProps} />
    </Tag>
  );
};

const AsyncMultiDropdownFilter = ({
  setter,
  resource,
  nameProp,
  valueProp,
  customFilter,
  disableNormalFilter,
  label,
  placeholder,
}: Props) => {
  const getAuthHeader = useAuthHeader();

  const getOptions = async (input: string) => {
    const res = await getResourceListFilteredAndPaginated<any>(
      resource,
      getAuthHeader(),
      disableNormalFilter === false ? [{ field: nameProp, value: input }] : [],
      customFilter === true ? [{ name: "search", value: input }] : [],
      { field: nameProp, isAscending: true }
    );
    return res.data.map((c) => ({
      label: c[nameProp],
      value: c[valueProp],
    }));
  };

  const onChange = (items: MultiValue<{ label: string; value: number }>) => {
    setter(items ? items.map((c) => c.value) : []);
  };

  return (
    <VStack w={"full"} alignItems={"flex-start"}>
      {label && <Text>{label}</Text>}
      <AsyncSelect
        placeholder={placeholder}
        cacheOptions
        loadOptions={getOptions}
        isClearable
        components={{
          MultiValue: CustomMultiValue,
        }}
        styles={{
          container: (base) => ({
            ...base,
            width: "100%",
          }),
        }}
        noOptionsMessage={(props) =>
          props.inputValue !== ""
            ? "No results found, try different keywords"
            : "Start typing to search"
        }
        onChange={onChange}
        isMulti
      />
    </VStack>
  );
};

export default AsyncMultiDropdownFilter;
