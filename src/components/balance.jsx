import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'
import { useSearchParams } from 'react-router'

import { useGetUserBalance } from '@/api/hooks/user'

import BalanceItem from './balance-item'
import TransactionTypeIcon from './transaction-type-icon'

const Balance = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from') // YYYY-MM-DD
  const to = searchParams.get('to') // YYYY-MM-DD
  const { data } = useGetUserBalance({ from, to })
  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-6">
      <BalanceItem
        label="Saldo"
        amount={data?.balance}
        icon={<WalletIcon size={16} />}
      />
      <BalanceItem
        label="Ganhos"
        amount={data?.earnings}
        icon={
          <TransactionTypeIcon
            icon={<TrendingUpIcon className="text-primary-green" size={16} />}
            label="Ganhos"
          />
        }
      />
      <BalanceItem
        label="Gastos"
        amount={data?.expenses}
        icon={
          <TransactionTypeIcon
            icon={<TrendingDownIcon className="text-primary-red" size={16} />}
            label="Ganhos"
          />
        }
      />
      <BalanceItem
        label="Investimentos"
        amount={data?.investments}
        icon={
          <TransactionTypeIcon
            icon={<PiggyBankIcon className="text-primary-blue" size={16} />}
            label="Investimentos"
          />
        }
      />
    </div>
  )
}

export default Balance
