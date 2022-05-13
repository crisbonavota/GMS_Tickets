export const chakraSelectStyle = {
    control: (provided: any, state: any) => ({
        ...provided,
        borderColor: 'lightgray',
        borderWidth: 1,
        backgroundColor: 'white'
    }),
    dropdownIndicator: (provided: any) => ({
        ...provided,
        bgColor: 'white',
        color: '#3B8A7F',
        borderWidth: 0
    })
};
