import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
    Select,
} from "@chakra-ui/react";
import { Field, ErrorMessage, FormikErrors } from "formik";
import { updateTypesIds, getCurrencies } from "../../../api/api";
import { KeyValuePair } from "../../../api/types";

interface FormConditionalFieldsProps {
    updateTypeId: number;
    errors: FormikErrors<KeyValuePair>;
}

const FormConditionalFields = ({
    updateTypeId,
    errors,
}: FormConditionalFieldsProps) => {
    return (
        <>
            {(updateTypesIds.periodUpdateTypes.includes(updateTypeId) ||
                updateTypesIds.workAccidentUpdateTypes.includes(
                    updateTypeId
                )) && (
                <FormControl isInvalid={errors.endDate !== undefined}>
                    <FormLabel htmlFor="endDate">End Date</FormLabel>
                    <Field
                        as={Input}
                        type="date"
                        id={"endDate"}
                        name="endDate"
                    />
                    <ErrorMessage name="endDate" component={FormErrorMessage} />
                </FormControl>
            )}

            {updateTypesIds.dateChangeUpdateTypes.includes(updateTypeId) && (
                <FormControl isInvalid={errors.newDate !== undefined}>
                    <FormLabel htmlFor="newDate">New Date</FormLabel>
                    <Field
                        as={Input}
                        type="date"
                        id={"newDate"}
                        name="newDate"
                    />
                    <ErrorMessage name="newDate" component={FormErrorMessage} />
                </FormControl>
            )}

            {updateTypesIds.monetaryUpdateTypes.includes(updateTypeId) && (
                <>
                    <FormControl isInvalid={errors.amount !== undefined}>
                        <FormLabel htmlFor="amount">Amount</FormLabel>
                        <Field
                            as={Input}
                            type="number"
                            id={"amount"}
                            name="amount"
                        />
                        <ErrorMessage
                            name="amount"
                            component={FormErrorMessage}
                        />
                    </FormControl>

                    <FormControl
                        isInvalid={errors.amountCurrencyId !== undefined}
                    >
                        <FormLabel htmlFor="amountCurrencyId">
                            Currency
                        </FormLabel>
                        <Field
                            id="amountCurrencyId"
                            name="amountCurrencyId"
                            as={Select}
                            type="number"
                        >
                            {getCurrencies().map((currency) => (
                                <option key={currency.id} value={currency.id}>
                                    {currency.code}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage
                            name="amountCurrencyId"
                            component={FormErrorMessage}
                        />
                    </FormControl>
                </>
            )}

            {updateTypesIds.resignationUpdateTypes.includes(updateTypeId) && (
                <FormControl isInvalid={errors.dateTelegram !== undefined}>
                    <FormLabel htmlFor="dateTelegram">Date Telegram</FormLabel>
                    <Field
                        as={Input}
                        type="date"
                        id={"dateTelegram"}
                        name="dateTelegram"
                    />
                    <ErrorMessage
                        name="dateTelegram"
                        component={FormErrorMessage}
                    />
                </FormControl>
            )}

            {updateTypesIds.workAccidentUpdateTypes.includes(updateTypeId) && (
                <FormControl isInvalid={errors.reportNumber !== undefined}>
                    <FormLabel htmlFor="reportNumber">Report Number</FormLabel>
                    <Field
                        as={Input}
                        type="text"
                        id={"reportNumber"}
                        name="reportNumber"
                    />
                    <ErrorMessage
                        name="reportNumber"
                        component={FormErrorMessage}
                    />
                </FormControl>
            )}
        </>
    );
};

export default FormConditionalFields;
