import { FormControl, FormLabel, Input, FormErrorMessage, Select } from "@chakra-ui/react";
import { getCurrencies, KeyValuePair, Update, UpdateType, updateTypesIds } from "@gms-micro/api-utils";
import { Field, ErrorMessage, FormikErrors } from 'formik';

interface FormConditionalFieldsProps {
    updateType: UpdateType,
    errors: FormikErrors<KeyValuePair>
}

const FormConditionalFields = ({ updateType, errors }: FormConditionalFieldsProps) => {
    return (
        <>
            {updateTypesIds.periodUpdateTypes.includes(updateType.id) &&
                <FormControl isInvalid={errors.endDate !== undefined}>
                    <FormLabel htmlFor="endDate">End Date</FormLabel>
                    <Field as={Input} type="date" id={"endDate"} name="endDate" />
                    <ErrorMessage name='endDate' component={FormErrorMessage} />
                </FormControl>}

            {updateTypesIds.dateChangeUpdateTypes.includes(updateType.id) &&
                <FormControl isInvalid={errors.newDate !== undefined}>
                    <FormLabel htmlFor="newDate">New Date</FormLabel>
                    <Field as={Input} type="date" id={"newDate"} name="newDate" />
                    <ErrorMessage name='newDate' component={FormErrorMessage} />
                </FormControl>}

            {updateTypesIds.monetaryUpdateTypes.includes(updateType.id) &&
                <>
                    <FormControl isInvalid={errors.amount !== undefined}>
                        <FormLabel htmlFor="amount">Amount</FormLabel>
                        <Field as={Input} type="number" id={"amount"} name="amount" />
                        <ErrorMessage name='amount' component={FormErrorMessage} />
                    </FormControl>

                    <FormControl isInvalid={errors.amountCurrencyId !== undefined}>
                        <FormLabel htmlFor="amountCurrencyId">Currency</FormLabel>
                        <Field id="amountCurrencyId" name="amountCurrencyId" as={Select} type="number">
                            {getCurrencies().map(currency => <option key={currency.id} value={currency.id}>{currency.code}</option>)}
                        </Field>
                        <ErrorMessage name='amountCurrencyId' component={FormErrorMessage} />
                    </FormControl>
                </>}

            {updateTypesIds.resignationUpdateTypes.includes(updateType.id) &&
                <FormControl isInvalid={errors.dateTelegram !== undefined}>
                    <FormLabel htmlFor="dateTelegram">Date Telegram</FormLabel>
                    <Field as={Input} type="date" id={"dateTelegram"} name="dateTelegram" />
                    <ErrorMessage name='dateTelegram' component={FormErrorMessage} />
                </FormControl>}

            {updateTypesIds.workAccidentUpdateTypes.includes(updateType.id) &&
                <FormControl isInvalid={errors.reportNumber !== undefined}>
                    <FormLabel htmlFor="reportNumber">Report Number</FormLabel>
                    <Field as={Input} type="text" id={"reportNumber"} name="reportNumber" />
                    <ErrorMessage name='reportNumber' component={FormErrorMessage} />
                </FormControl>}
        </>
    )
}

export const renderConditionalValues = (initialValues: KeyValuePair, update: Update) => {
    if (updateTypesIds.periodUpdateTypes.includes(update.updateType.id))
        initialValues.endDate = update.endDate ? new Date(update.endDate).toISOString().split("T")[0] : undefined;

    if (updateTypesIds.dateChangeUpdateTypes.includes(update.updateType.id))
        initialValues.newDate = update.newDate ? new Date(update.newDate).toISOString().split("T")[0] : undefined;

    if (updateTypesIds.monetaryUpdateTypes.includes(update.updateType.id)) {
        initialValues.amount = update.amount;
        initialValues.amountCurrencyId = update.amountCurrency?.id;
    }

    if (updateTypesIds.resignationUpdateTypes.includes(update.updateType.id))
        initialValues.dateTelegram = update.dateTelegram;

    if (updateTypesIds.workAccidentUpdateTypes.includes(update.updateType.id)) {
        initialValues.reportNumber = update.reportNumber;
        initialValues.endDate = update.endDate ? new Date(update.endDate).toISOString().split("T")[0] : undefined;
    }

    return initialValues;
}

export default FormConditionalFields;
