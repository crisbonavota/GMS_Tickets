import { Box, Text, Heading, chakra } from "@chakra-ui/react";
import { ProjectRevenueValues } from "../../../../../api/types";
import { useMemo } from "react";
import {
    Bar,
    BarChart,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

interface Props {
    revenueValues: ProjectRevenueValues;
}

const RevenueCalculationsChart = ({ revenueValues }: Props) => {
    const data = useMemo(
        () => [
            {
                label: "Sold for",
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
        <Box w="full" h={350}>
            <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                    <XAxis
                        height={70}
                        dataKey="label"
                        tick={({ x, y, payload }) => {
                            if (!payload) return <></>;

                            const dataItem = data.find(
                                (d) => d.label === payload.value
                            );

                            if (!dataItem) return <></>;

                            const percentage = Math.round(
                                (dataItem.value /
                                    revenueValues.project.income) *
                                    100
                            );

                            const value =
                                Math.round(dataItem.value * 100) / 100;

                            return (
                                <chakra.text
                                    x={x}
                                    y={y + 20}
                                    textAnchor="middle"
                                >
                                    <tspan x={x} y={y + 20}>
                                        {payload.value}
                                    </tspan>
                                    <tspan
                                        x={x}
                                        y={y + 40}
                                        fill={value > 0 ? "green" : "red"}
                                    >
                                        {value < 0 ? "-" : ""}$
                                        {value
                                            .toLocaleString("es-ES")
                                            .replace("-", "")}
                                    </tspan>
                                    <tspan
                                        x={x}
                                        y={y + 60}
                                        fill={percentage > 0 ? "green" : "red"}
                                    >
                                        {percentage < 0 ? "-" : ""}
                                        {percentage
                                            .toLocaleString("es-ES")
                                            .replace("-", "")}
                                        %
                                    </tspan>
                                </chakra.text>
                            );
                        }}
                    />
                    <YAxis />
                    <Tooltip
                        content={({ payload, label }) => {
                            if (!payload?.length) return <></>;

                            const value =
                                Math.round(
                                    (payload[0].payload.value as number) * 100
                                ) / 100;

                            return (
                                <Box
                                    bgColor={"white"}
                                    p={2}
                                    rounded="xl"
                                    borderColor={"gray.100"}
                                    borderWidth={1}
                                >
                                    <Heading
                                        color={
                                            value > 0 ? "#4ebf2c" : "#ad2626"
                                        }
                                        fontSize={"md"}
                                    >
                                        {label}
                                    </Heading>
                                    <Text>
                                        {value > 0 ? "+" : ""}
                                        {value.toLocaleString("es-ES")} USD
                                    </Text>
                                </Box>
                            );
                        }}
                    />
                    <ReferenceLine y={0} stroke="#000" />
                    <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default RevenueCalculationsChart;
