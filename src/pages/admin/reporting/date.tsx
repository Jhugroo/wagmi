import { Label, Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { AdminDashboardLink } from "..";
import { api } from "@/utils/api";
import { LoadingSpinner } from "@/components/ui/custom/icons";
import ReportingEmploymentPage from "./employment";

export default function ReportingDatePage() {
    const { data: data, isLoading } = api.questionnaire.getquestionnaireCountPerMonth.useQuery()
    return <>
        {(isLoading || data == undefined) ? <LoadingSpinner /> : <><Component data={data} /></>}
        <AdminDashboardLink link="/admin/reporting" />
    </>
}


const chartConfig = {
    noOfQuestionnaires: {
        label: "number of answers"
    },
    ceal1_manufacturing: {
        label: "CEAL1 – Manufacturing",
        color: "hsl(var(--chart-1))",
    },
    ceal2_construction: {
        label: "CEAL2 – Construction",
        color: "hsl(var(--chart-2))",
    },
    ceal3_wholesale_and_retail_trade: {
        label: "CEAL3 - Wholesale and retail trade",
        color: "hsl(var(--chart-3))",
    },
    ceal4_hotels_and_restaurants: {
        label: "CEAL4 - Hotels and restaurants",
        color: "hsl(var(--chart-4))",
    },
    ceal5_banking_and_other_financial_intermediation: {
        label: "CEAL5 - Banking and other financial intermediation",
        color: "hsl(var(--chart-5))",
    },
    ceal6_insurance: {
        label: "CEAL6 – Insurance",
        color: "hsl(var(--chart-6))",
    },
    ceal7_pension_funding: {
        label: "CEAL7 - Pension funding",
        color: "hsl(var(--chart-7))",
    },
    ceal8_other_services: {
        label: "CEAL8 - Other services",
        color: "hsl(var(--chart-8))",
    },
} as ChartConfig
export function Component({ data }: {
    data: {
        questionnaireTypeId: string,
        _count: {
            id: number;
        };
    }[]
}) {

    const totalVisitors = data.reduce((acc, { _count: { id } }) => acc + id, 0)
    const chartData = data.map((section) => {
        return {
            category: section.questionnaireTypeId,
            noOfQuestionnaires: section._count.id,
            fill: `var(--color-${section.questionnaireTypeId})`
        }
    })

    return (
        <div className="flex space-x-4">
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Total Number of questionnaires filled</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel className="w-56" />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="noOfQuestionnaires"
                                nameKey="category"
                                innerRadius={60}
                                strokeWidth={5}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-3xl font-bold"
                                                    >
                                                        {totalVisitors.toLocaleString()}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy ?? 0) + 24}
                                                        className="fill-muted-foreground"
                                                    >
                                                        Questionnaires
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                    <div className="leading-none text-muted-foreground">
                        Showing total questionnaires filled
                    </div>
                </CardFooter>
            </Card>
            <ReportingEmploymentPage />
            <Card className="">
                <CardHeader className="">
                    <CardTitle>Total Number of questionnaires filled Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="">
                    {chartData.map((data) => {
                        return <div key={data.category} className="text-sm my-2 py-1 bg-muted rounded-sm" >
                            <span >{chartConfig[data.category]?.label}</span> <span className="float-right mx-2 font-medium">{data.noOfQuestionnaires}</span>
                        </div>
                    })}
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                    <div className="leading-none text-muted-foreground">
                        Breakdown
                    </div>
                </CardFooter>
            </Card>

        </div >
    )
}