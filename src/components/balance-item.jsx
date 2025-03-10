import { formatCurrency } from '@/helpers/currency'

import TransactionTypeIcon from './transaction-type-icon'
import { Card, CardContent } from './ui/card'

const BalanceItem = ({ label, icon, amount }) => {
  return (
    <Card>
      <CardContent className="space-y-2 p-6">
        {/* ÍCONE E LABEL */}
        <TransactionTypeIcon icon={icon} label={label} />
        <h3 className="text-2xl font-semibold">{formatCurrency(amount)}</h3>
      </CardContent>
    </Card>
  )
}

export default BalanceItem
