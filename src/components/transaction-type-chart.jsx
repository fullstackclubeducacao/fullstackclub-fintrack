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

import TransactionTypeIcon from './transaction-type-icon'

const chartConfig = {
  earnings: {
    label: 'Ganhos',
    color: 'hsl(var(--primary-green))',
  },
  expenses: {
    label: 'Gastos',
    color: 'hsl(var(--primary-red))',
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
      value: parseFloat(data?.expenses ?? 0),
      fill: 'hsl(var(--primary-red))',
    },
    {
      type: 'earnings',
      value: parseFloat(data?.earnings ?? 0),
      fill: 'hsl(var(--primary-green))',
    },
    {
      type: 'investments',
      value: parseFloat(data?.investments ?? 0),
      fill: 'hsl(var(--primary-blue))',
    },
  ]

  const chartDataIsEmpty = chartData.every((item) => !item.value)

  if (chartDataIsEmpty) {
    return null
  }

  console.log({ chartData })

  return (
    <Card className="flex flex-col">
      <CardContent className="flex flex-1 items-center gap-2 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] min-h-[250px]"
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
        <div className="space-y-4">
          <div className="flex items-center gap-6">
            <TransactionTypeIcon transactionType="expenses" label="Gastos" />
            <p className="w-full text-left text-sm font-bold">
              {formatCurrency(data?.expenses)}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <TransactionTypeIcon transactionType="earnings" label="Ganhos" />
            <p className="w-full text-left text-sm font-bold">
              {formatCurrency(data?.earnings)}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <TransactionTypeIcon
              transactionType="investments"
              label="Investimentos"
            />
            <p className="w-full text-left text-sm font-bold">
              {formatCurrency(data?.investments)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TransactionTypeChart
