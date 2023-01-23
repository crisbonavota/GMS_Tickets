import { TabList, Tab } from "@chakra-ui/react";
import { getCurrencies } from "../../../api/api";

interface Props {
    setSelectedCurrency: (currencyId: number) => void;
}

const TabsSelector = ({ setSelectedCurrency }: Props) => {
    return (
        <TabList>
            {getCurrencies()
                .filter((c) => c.code !== "USD")
                .map((c) => (
                    <Tab
                        onClick={() => setSelectedCurrency(c.id)}
                        tabIndex={c.id}
                        flex={1}
                        key={c.id}
                    >
                        {c.code}
                    </Tab>
                ))}
        </TabList>
    );
};
export default TabsSelector;
