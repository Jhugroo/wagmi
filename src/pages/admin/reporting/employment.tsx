import {
    Card,
    CardContent,
    CardDescription,
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
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

const chartConfig = {
    male: {
        label: "Male",
        color: "hsl(var(--chart-6))",
    },
    female: {
        label: "Female",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig
export default function ReportingEmploymentPage() {
    const { data: data, isLoading } = api.questionnaire.getEmploymentCountPerStates.useQuery()
    const barChartData = [] as {
        nationality: string;
        male: number;
        female: number;
    }[]


    if (!isLoading) {
        barChartData.push({
            nationality: "Mauritian", male: (data?.find(({ gender, nationality }) => gender === "male" && nationality === 'mauritian'))?._sum.number ?? 0,
            female: (data?.find(({ gender, nationality }) => gender === "female" && nationality === 'mauritian'))?._sum.number ?? 0
        })
        barChartData.push({
            nationality: "Foreigner", male: (data?.find(({ gender, nationality }) => gender === "male" && nationality !== 'mauritian'))?._sum.number ?? 0,
            female: (data?.find(({ gender, nationality }) => gender === "female" && nationality !== 'mauritian'))?._sum.number ?? 0
        })
    }
    return <>
        {(isLoading || data == undefined) ? <LoadingSpinner /> : <Component data={barChartData} />}
        <AdminDashboardLink link="/admin/reporting" />
    </>
}


export function Component({ data }: {
    data: {
        nationality: string;
        male: number;
        female: number;
    }[]
}) {
    return (
        <div className="flex space-x-4">
            <Card>
                <CardHeader>
                    <CardTitle>Employee Records</CardTitle>
                    <CardDescription>Gender and Nationality</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                        <BarChart accessibilityLayer data={data}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="nationality"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value: string) => value}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dashed" />}
                            />
                            <Bar dataKey="male" fill="var(--color-male)" radius={4} >
                                <LabelList
                                    className="fill-white"
                                    fontSize={12}
                                />
                            </Bar>
                            <Bar dataKey="female" fill="var(--color-female)" radius={4} >
                                <LabelList
                                    className="fill-white"
                                    fontSize={12}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                    <div className="leading-none text-muted-foreground">
                        Showing total questionnaires filled
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}