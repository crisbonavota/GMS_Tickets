import { Text } from "@chakra-ui/react";
import { useAuthHeader } from "react-auth-kit";
import AsyncSelect from "react-select/async";
import clienteAxios from "../../services/axios";
import { filtersToAPIFormat } from "../../api/utils";

interface Props {
  setter: (value: number[]) => void;
  resource: string;
  nameProp: string;
  valueProp: string;
  label?: string;
  placeholder?: string;
  defaultValue?: { label: string; value: string }[];
}

const MultiUserSelection = ({
  setter,
  resource,
  nameProp,
  valueProp,
  label,
  placeholder,
  defaultValue,
}: Props) => {
  const getAuthHeader = useAuthHeader();

  // Fill options with the data from initial selection
  const getOptions = async (inputValue: string) => {
    const { data } = await clienteAxios.get<any>(resource, {
      params: {
        filters: filtersToAPIFormat([
          { field: nameProp, value: inputValue, operator: "=" },
        ]),
        "Sort.Field": "Name",
        "Sort.IsAscending": "true",
        "Range.Start": "0",
        "Range.End": "4",
      },
      headers: { Authorization: getAuthHeader() },
    });
    return data.items.map((user: any) => ({
      label: user.name,
      value: user.id,
    }));
  };

  const handleSelectChange = (selectedOptions: any) => {
    setter(selectedOptions ? selectedOptions.map((c: any) => c.value) : []);
  };

  return (
    <div style={{ width: "100%" }}>
      {label && <Text>{label}</Text>}
      <AsyncSelect
        placeholder={placeholder}
        isClearable={false}
        styles={{
          control: (provided, state) => ({
            ...provided,
            borderWidth: 1,
            borderRadius: "5px",
            borderColor: state.isFocused ? "gray.400" : "gray.300",
            _hover: {
              borderColor: "gray.400",
            },
          }),
          multiValue: (provided) => ({
            ...provided,
            background: "#E2E8F0",
            borderRadius: "50px",
          }),
          multiValueLabel: (provided) => ({
            ...provided,
            color: "gray.600",
          }),
          multiValueRemove: (provided) => ({
            ...provided,
            color: "gray",
            ":hover": { background: "gray.200" },
          }),

          indicatorSeparator: (provided) => ({
            ...provided,
            display: "none",
          }),
          menu: (provided) => ({
            ...provided,
            zIndex: 2,
          }),
          option: (provided, state) => ({
            ...provided,
            background: state.isSelected ? "gray.100" : "white",
            color: state.isSelected ? "gray.800" : "gray.600",
            _hover: {
              background: "gray.100",
            },
          }),
        }}
        loadOptions={getOptions}
        noOptionsMessage={(props: any) =>
          props.inputValue !== ""
            ? "No results found, try different keywords"
            : "Start typing to search"
        }
        onChange={handleSelectChange}
        isMulti
        closeMenuOnSelect={false}
        defaultValue={defaultValue} // Set the defaultValue prop here
      />
    </div>
  );
};

export default MultiUserSelection;
