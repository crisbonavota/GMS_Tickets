import {
    VStack,
    Text,
    IconButton,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
    chakra,
} from "@chakra-ui/react";
import { BiImport } from "react-icons/bi";
import { useCallback, useState } from "react";
import { parse } from "papaparse";
import { useMutation, useQueryClient } from "react-query";
import { useAuthHeader } from "react-auth-kit";
import moment from "moment";
import { postResource } from "../../../../api/api";
import MonetaryFormat from "./MonetaryFormat";
import ImportPreview from "./ImportPreview";
import StructureFormat from "./StructureFormat";
import FormatNotes from "./FormatNotes";

export interface ImportUpdate {
    currency?: string;
    date?: string;
    filenumber?: number;
    amount?: number;
    valid: boolean;
}

export function ImportButton() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [updateType, setUpdateType] = useState<
        "monetary" | "structure" | null
    >(null);
    const [updates, setUpdates] = useState<ImportUpdate[]>([]);
    const toast = useToast();
    const getAuthHeader = useAuthHeader();
    const queryClient = useQueryClient();

    const changeHandler = (event: any) => {
        parse<ImportUpdate>(event.target.files[0], {
            header: true,
            skipEmptyLines: "greedy",
            transformHeader: (h) => h.trim().toLowerCase().replace(/\s/g, ""),
            transform: (r) =>
                r.replace(",", ".").replace(/-/g, "/").replace("%", ""),
            complete: (results) => {
                setUpdates(results.data.map((u) => ({ ...u, valid: false })));
                setUpdateType(
                    results.data.some((u) => u.currency)
                        ? "monetary"
                        : "structure"
                );
            },
            error: (error) => {
                toast({
                    title: "Error parsing the file, try again",
                    description: error.message,
                    status: "error",
                    position: "top",
                    duration: 2000,
                });
                console.log(error);
            },
        });
    };

    const { mutateAsync: createUpdates, isLoading } = useMutation(
        async () =>
            await postResource(
                `updates/${updateType}/bulk`,
                getAuthHeader(),
                updates.map((u) => {
                    return {
                        ...u,
                        date: moment(u.date, "DD/MM/YYYY").format("YYYY-MM-DD"),
                    };
                })
            ),
        {
            onMutate: () => {
                queryClient.cancelQueries("updates");
                queryClient.cancelQueries("updatesReport");
            },
            onSuccess: () => {
                onClose();
                toast({
                    title: "Successfully imported",
                    status: "success",
                    position: "top",
                    duration: 2000,
                });
                setUpdates([]);
                queryClient.resetQueries("updates");
                queryClient.resetQueries("updatesReport");
            },
            onError: (err: any) => {
                toast({
                    title: "Error importing, try again later",
                    description: err.message | err,
                    status: "error",
                    position: "top",
                    duration: 2000,
                });
                console.log(err);
            },
        }
    );

    const onCancel = useCallback(() => {
        setUpdates([]);
        onClose();
    }, []);

    return (
        <>
            <VStack alignItems={"flex-start"}>
                <Text fontSize={"sm"}>Import</Text>
                <IconButton
                    onClick={onOpen}
                    size={"lg"}
                    colorScheme={"teal"}
                    aria-label="Import"
                    icon={<BiImport size={20} />}
                />
            </VStack>

            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
                <ModalOverlay />
                <ModalContent maxW={"fit-content"}>
                    <ModalHeader>
                        Bulk import hourly cost/structure updates
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={5} alignItems={"flex-start"}>
                            <chakra.input
                                type="file"
                                accept=".csv"
                                onChange={changeHandler}
                                justifyContent={"center"}
                            />
                            {updates.length && (
                                <ImportPreview
                                    updates={updates}
                                    setUpdates={setUpdates}
                                    updateType={updateType}
                                />
                            )}
                            {!updates.length && (
                                <VStack w="full" spacing={5}>
                                    <MonetaryFormat />
                                    <StructureFormat />
                                    <FormatNotes />
                                </VStack>
                            )}
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            isDisabled={
                                !updates.length ||
                                updates.some((u) => !u.valid) ||
                                isLoading
                            }
                            onClick={async () => await createUpdates()}
                            isLoading={isLoading}
                        >
                            Upload
                        </Button>
                        <Button variant="ghost" onClick={onCancel}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default ImportButton;
