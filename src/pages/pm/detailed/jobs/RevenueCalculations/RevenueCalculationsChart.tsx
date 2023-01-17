import { Box, Text, Heading } from "@chakra-ui/react";
import { ProjectRevenueValues } from "../../../../../api/types";
import { useMemo } from "react";
import {
    Bar,
    BarChart,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    TooltipProps,
    XAxis,
    YAxis,
} from "recharts";
import {
    NameType,
    ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface Props {
    revenueValues: ProjectRevenueValues;
}

const RevenueCalculationsChart = ({ revenueValues }: Props) => {
    const data = useMemo(
        () => [
            {
                label: "Income",
                value: revenueValues.project.income,
                fill: "#4ebf2c",
            },
            {
                label: "Resources cost",
                value: -revenueValues.resourcesCost,
                fill: "#ad2626",
            },
            {
                label: "Indirect cost",
                value: -revenueValues.indirectCost,
                fill: "#ad2626",
            },
            {
                label: "Profit",
                value: revenueValues.profit,
                fill: revenueValues.profit > 0 ? "#4ebf2c" : "#ad2626",
            },
        ],
        [revenueValues]
    );

    return (
        <Box w="full" h={300}>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip content={CustomTooltip} />
                    <ReferenceLine y={0} stroke="#000" />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

const CustomTooltip = ({
    payload,
    label,
}: TooltipProps<ValueType, NameType>) => {
    if (!payload?.length) return <></>;

    const value = Math.round((payload[0].payload.value as number) * 100) / 100;

    return (
        <Box
            bgColor={"white"}
            p={2}
            rounded="xl"
            borderColor={"gray.100"}
            borderWidth={1}
        >
            <Heading color={value > 0 ? "#4ebf2c" : "#ad2626"} fontSize={"md"}>
                {label}
            </Heading>
            <Text>
                {value > 0 ? "+" : ""}
                {value.toLocaleString("es-ES")} USD
            </Text>
        </Box>
    );
};

export default RevenueCalculationsChart;
