"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type LineSeries = {
  key: string;
  color: string;
};

interface LineChartCardProps {
  title: string;
  data: any[];
  series: LineSeries[];
  height?: number;
  className?: string;
}

export function LineChartCard({
  title,
  data,
  series,
  height = 300,
  className,
}: LineChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
    >
      <Card className={cn("bg-transparent cursor-pointer", className)}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data} style={{ cursor: "pointer" }}>
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-slate-200"
              />
              <XAxis dataKey="day" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid var(--color-honeydew-300)",
                  borderRadius: "0.75rem",
                }}
              />
              <Legend />
              {series.map((serie, index) => (
                <Line
                  key={serie.key}
                  type="monotone"
                  dataKey={serie.key}
                  stroke={serie.color}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}
