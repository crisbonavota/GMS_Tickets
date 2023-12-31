import { buildYup } from "schema-to-yup";
import { updateTypesIds } from "../api/api";

export const generateDinamicYupSchema = (
    updateTypeId: number,
    isCreation: boolean = false
) => {
    const schema: any = {
        type: "object",
        properties: {
            legacyUserId: {
                type: "string",
                required: true,
            },
            date: {
                type: "string",
                format: "date",
                required: true,
            },
        },
    };

    if (isCreation)
        schema.properties.updateTypeId = { type: "number", required: true };

    const config: any = {
        errMessages: {
            legacyUserId: {
                required: "Employee is required",
            },
            date: {
                required: "Date is required",
            },
        },
    };

    if (updateTypesIds.dateChangeUpdateTypes.includes(updateTypeId)) {
        schema.properties.newDate = {
            type: "string",
            format: "date",
            required: true,
        };

        config.errMessages.newDate = {
            required: "New Date is required",
        };
    }

    if (
        updateTypesIds.periodUpdateTypes.includes(updateTypeId) ||
        updateTypesIds.workAccidentUpdateTypes.includes(updateTypeId)
    ) {
        schema.properties.endDate = {
            type: "string",
            format: "date",
            required: true,
        };

        config.errMessages.endDate = {
            required: "End Date is required",
        };
    }

    if (updateTypesIds.monetaryUpdateTypes.includes(updateTypeId)) {
        schema.properties.amount = {
            type: "number",
            required: true,
        };

        config.errMessages.amount = {
            required: "Amount is required",
        };

        schema.properties.amountCurrencyId = {
            type: "number",
            required: true,
        };

        config.errMessages.amountCurrencyId = {
            required: "Currency is required",
        };
    }

    if (updateTypesIds.structureUpdateTypes.includes(updateTypeId)) {
        schema.properties.amount = {
            type: "number",
            required: true,
            maximum: 100,
            minimum: 0,
        };

        config.errMessages.amount = {
            required: "Amount is required",
            maximum: "Amount must be less than 100",
            minimum: "Amount must be greater than 0",
        };

        config.errMessages;
    }

    if (updateTypesIds.resignationUpdateTypes.includes(updateTypeId)) {
        schema.properties.dateTelegram = {
            type: "string",
            format: "date",
            required: true,
        };

        config.errMessages.dateTelegram = {
            required: "Date Telegram is required",
        };
    }

    if (updateTypesIds.workAccidentUpdateTypes.includes(updateTypeId)) {
        schema.properties.reportNumber = {
            type: "string",
            required: true,
        };

        config.errMessages.reportNumber = {
            required: "Report Number is required",
        };
    }

    return buildYup(schema, config);
};
