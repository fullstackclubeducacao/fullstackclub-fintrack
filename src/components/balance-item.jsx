import { formatCurrency } from '@/helpers/currency'

import { Card, CardContent } from './ui/card'

const BalanceItem = ({ icon, amount }) => {
  return (
    <Card>
      <CardContent className="space-y-2 p-6">
        <div className="flex items-center gap-2">{icon}</div>
        <h3 className="text-2xl font-semibold">{formatCurrency(amount)}</h3>
      </CardContent>
    </Card>
  )
}

export default BalanceItem
