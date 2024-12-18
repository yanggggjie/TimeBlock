import React from 'react'
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts'
import { IChartDataItem } from './Summary.tsx'

interface Props {
  data: IChartDataItem[]
}
export default function SimplePie({ data }: Props) {
  return (
    <ResponsiveContainer width={400} height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label={(entry) => {
            return `${entry.name}: ${entry.ratio}%`
          }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [`${value} 小时`, name]} />
      </PieChart>
    </ResponsiveContainer>
  )
}
