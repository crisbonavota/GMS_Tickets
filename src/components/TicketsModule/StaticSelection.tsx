import React from "react";
import Select from "react-select";

interface Props {
  setValue: (value: number) => void;
  value: number | string;
  options: {
    label: string;
    value: number;
  }[];
}

const StaticSelection = ({ setValue, value, options }: Props) => {
  const handleChange = (selectedOption: any) => {
    setValue(selectedOption.value);
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <Select
      options={options}
      placeholder="Select an option"
      onChange={handleChange}
      value={selectedOption}
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
        indicatorSeparator: () => ({
          display: "none",
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
    />
  );
};

export default StaticSelection;
