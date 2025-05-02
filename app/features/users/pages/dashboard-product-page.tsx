"use client"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, Line, LineChart, XAxis } from "recharts";
import type { MetaFunction } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/common/components/ui/chart"

const chartData = [
  { month: "January", views: 186 , visitors: 100},
  { month: "February", views: 305, visitors: 200 },
  { month: "March", views: 237 , visitors: 130},
  { month: "April", views: 73 , visitors: 420},
  { month: "May", views: 209, visitors: 100 },
  { month: "June", views: 214, visitors: 600 },
]

const chartConfig = {
  views: {
    label: "Views",
    color: "hsl(var(--chart-1))",
  },
  visitors: {
    label: "Visitors",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard | WeMake" },
    { name: "description", content: "View your dashboard" },
  ];
};

export default function MyDashboardProductPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <Card className="w-1/2">
        <CardHeader className="font-semibold text-2xl">Performance</CardHeader>
        <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Area
              dataKey="views"
              type="natural"
              stroke="var(--color-chart-1)"
              fill="var(--color-chart-1)"
              strokeWidth={2}
              dot={false}
            />
            <Area
              dataKey="visitors"
              type="natural"
              stroke="var(--color-chart-2)"
              strokeWidth={2}
              fill="var(--color-chart-2)"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      </Card>
    </div>
  );
} 