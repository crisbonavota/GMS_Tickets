import { HStack, IconButton, Input, Text, VStack } from "@chakra-ui/react";
import { ImportUpdate } from "../import-button/import-button";
import moment from 'moment';
import { useState, useEffect, useMemo } from 'react';
import { AiFillSave } from "react-icons/ai";

export interface ImportPreviewEditProps {
    update: ImportUpdate,
    setUpdates: (rows: ImportUpdate[]) => void,
    updates: ImportUpdate[],
    updateIndex: number,
    validation: { isValid: boolean, errors: string[] }
}

export function ImportPreviewEdit({ update, updateIndex, updates, setUpdates, validation }: ImportPreviewEditProps) {
    const [filenumber, setFileNumber] = useState<number | undefined>(update.filenumber);
    const [date, setDate] = useState(update.date ? moment(update.date, "DD/MM/yyyy").format('YYYY-MM-DD') : '');
    const [currency, setCurrency] = useState<string | undefined>(update.currency);
    const [amount, setAmount] = useState<number | undefined>(update.amount);

    useEffect(() => {
        setFileNumber(update.filenumber);
        setDate(update.date ? moment(update.date, "DD/MM/yyyy").format('YYYY-MM-DD') : '');
        setCurrency(update.currency);
        setAmount(update.amount);
    }, [update])

    const onSave = useMemo(() => {
        return () => {
            const updatedUpdate = { ...update, filenumber, date: moment(date).format("DD/MM/YYYY"), currency, amount }
            const updatedUpdates = [...updates]
            updatedUpdates[updateIndex] = updatedUpdate
            setUpdates(updatedUpdates)
        }
    }, [updates, filenumber, date, currency, amount, updateIndex]);

    return (
        <VStack alignItems={'flex-start'}>
            <Text>Update #{updateIndex + 1}</Text>
            <HStack w={'full'} justifyContent={'space-evenly'} p={2}>
                <Input type={'number'} value={filenumber} onChange={e => setFileNumber(parseInt(e.target.value))} />
                <Input type={'date'} value={date} onChange={e => setDate(e.target.value)} />
                <Input type={'text'} value={currency} onChange={e => setCurrency(e.target.value)} />
                <Input type={'number'} value={amount} onChange={e => setAmount(parseFloat(e.target.value))} />
                <IconButton colorScheme={'green'} icon={<AiFillSave size={20} />} aria-label="Save" onClick={onSave} />
            </HStack>
            <Text fontSize={'sm'} color={'red'}>{validation.errors.join(", ")}</Text>
        </VStack>
    )
}

export default ImportPreviewEdit;
