import { useSearchParams } from 'react-router'
import { Pie, PieChart } from 'recharts'

import { useGetUserBalance } from '@/api/hooks/user'
import { Card, CardContent } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { formatCurrency } from '@/helpers/currency'

const chartConfig = {
  expenses: {
    label: 'Gastos',
    color: 'hsl(var(--primary-red))',
  },
  earnings: {
    label: 'Ganhos',
    color: 'hsl(var(--primary-green))',
  },
  investments: {
    label: 'Investimentos',
    color: 'hsl(var(--primary-blue))',
  },
}

const TransactionTypeChart = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from') // YYYY-MM-DD
  const to = searchParams.get('to') // YYYY-MM-DD
  const { data } = useGetUserBalance({ from, to })
  const chartData = [
    {
      type: 'expenses',
      value: parseFloat(data?.expenses),
      fill: 'hsl(var(--primary-red))',
    },
    {
      type: 'earnings',
      value: parseFloat(data?.earnings),
      fill: 'hsl(var(--primary-green))',
    },
    {
      type: 'investments',
      value: parseFloat(data?.investments),
      fill: 'hsl(var(--primary-blue))',
    },
  ]
  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  valueFormatter={(value) => formatCurrency(value)}
                />
              }
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default TransactionTypeChart
