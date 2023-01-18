import {
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    TabPanel,
    VStack,
    useDisclosure,
} from "@chakra-ui/react";
import { BsCurrencyExchange } from "react-icons/bs";
import TabsSelector from "./TabsSelector";
import { Tabs, TabPanels, Center, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { CurrencyExchange, Sort } from "../../../api/types";
import { useQuery } from "react-query";
import {
    getResourceListFilteredAndPaginated,
    getCurrencies,
} from "../../../api/api";
import { parseTotalPagesHeader } from "../../../utils/query";
import { useAuthHeader } from "react-auth-kit";
import CurrenciesExchangeTable from "./CurrenciesExchangeTable";
import AddCurrencyExchangeRate from "./AddCurrencyExchangeRate";

const CurrenciesExchangeModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedCurrency, setSelectedCurrency] = useState(
        getCurrencies()[0].id
    );
    const [currentPage, setCurrentPage] = useState(0);
    const [sort, setSort] = useState<Sort>({
        field: "date",
        isAscending: false,
    });
    const [totalPages, setTotalPages] = useState<number | null>(null);
    const getAuthHeader = useAuthHeader();

    const {
        isLoading,
        isSuccess,
        data: axiosRes,
    } = useQuery(
        ["currencies-exchange", selectedCurrency, currentPage, sort],
        () =>
            getResourceListFilteredAndPaginated<CurrencyExchange>(
                "currencies/exchange",
                getAuthHeader(),
                [{ field: "targetCurrencyId", value: selectedCurrency }],
                [],
                sort,
                currentPage,
                10
            ),
        {
            onSuccess: (res) =>
                parseTotalPagesHeader(
                    setTotalPages,
                    res.headers["pages-amount"]
                ),
        }
    );

    return (
        <>
            <IconButton
                aria-label="See currencies exchange rates"
                icon={<BsCurrencyExchange size={20} />}
                onClick={onOpen}
                colorScheme={"whiteAlpha"}
                variant={"ghost"}
                color="white"
            />

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={{ base: undefined, md: "xl" }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>USD exchange rates</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack w="full" alignItems={"flex-end"}>
                            <Tabs w="full">
                                <TabsSelector
                                    setSelectedCurrency={(value: number) => {
                                        setCurrentPage(0);
                                        setTotalPages(null);
                                        setSelectedCurrency(value);
                                    }}
                                />
                                <TabPanels>
                                    {getCurrencies().map((c) => (
                                        <TabPanel key={c.id}>
                                            {isSuccess && (
                                                <CurrenciesExchangeTable
                                                    data={axiosRes.data}
                                                    totalPages={totalPages}
                                                    page={currentPage}
                                                    setPage={setCurrentPage}
                                                    sort={sort}
                                                    setSort={setSort}
                                                />
                                            )}
                                            {isLoading && (
                                                <Center w="full" minH="20rem">
                                                    <Spinner />
                                                </Center>
                                            )}
                                        </TabPanel>
                                    ))}
                                </TabPanels>
                            </Tabs>
                            <AddCurrencyExchangeRate />
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
export default CurrenciesExchangeModal;
