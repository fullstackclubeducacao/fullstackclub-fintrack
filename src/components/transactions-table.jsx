import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { useSearchParams } from 'react-router'

import { useGetTransactions } from '@/api/hooks/transaction'
import { formatCurrency } from '@/helpers/currency'
import { getTransactionDate } from '@/helpers/date'

import EditTransactionButton from './edit-transaction-button'
import TransactionTypeBadge from './transaction-type-badge'
import { DataTable } from './ui/data-table'
import { ScrollArea } from './ui/scroll-area'
import SortableColumnHeader from './ui/sortable-column-header'

const columns = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <SortableColumnHeader column={column}>Título</SortableColumnHeader>
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => {
      return <SortableColumnHeader column={column}>Tipo</SortableColumnHeader>
    },
    cell: ({ row: { original: transaction } }) => {
      return <TransactionTypeBadge variant={transaction.type.toLowerCase()} />
    },
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return <SortableColumnHeader column={column}>Data</SortableColumnHeader>
    },
    cell: ({ row: { original: transaction } }) => {
      return format(getTransactionDate(transaction), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      })
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return <SortableColumnHeader column={column}>Valor</SortableColumnHeader>
    },
    cell: ({ row: { original: transaction } }) => {
      return formatCurrency(transaction.amount)
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row: { original: transaction } }) => {
      return <EditTransactionButton transaction={transaction} />
    },
  },
]

const TransactionsTable = () => {
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')
  const { data: transactions } = useGetTransactions({ from, to })
  if (!transactions) return null
  return (
    <>
      <h2 className="text-2xl font-bold">Transações</h2>
      <ScrollArea className="h-[450px] max-h-[450px] rounded-md border">
        <DataTable columns={columns} data={transactions} />
      </ScrollArea>
    </>
  )
}

export default TransactionsTable
