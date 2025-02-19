import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { useAuthContext } from '@/contexts/auth'

import { TransactionService } from '../services/transaction'
import { getUserBalanceQueryKey } from './user'

export const createTransactionMutationKey = ['createTransaction']

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()
  const { user } = useAuthContext()
  return useMutation({
    mutationKey: createTransactionMutationKey,
    mutationFn: (input) => TransactionService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({ userId: user.id }),
        exact: false, // padrão
      })
      queryClient.invalidateQueries({
        queryKey: getTransactionsQueryKey({ userId: user.id }),
      })
    },
  })
}

export const updateTransactionMutationKey = (id) => ['updateTransaction', id]

// porque eu não recebo um objeto? - 1 parametro apenas
export const useUpdateTransaction = (id) => {
  const queryClient = useQueryClient()
  const { user } = useAuthContext()
  return useMutation({
    mutationKey: updateTransactionMutationKey(id),
    mutationFn: (input) =>
      TransactionService.update({
        id,
        amount: input.amount,
        date: input.date,
        name: input.name,
        type: input.type,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({ userId: user.id }),
      })
      queryClient.invalidateQueries({
        queryKey: getTransactionsQueryKey({ userId: user.id }),
      })
    },
  })
}

export const getTransactionsQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ['getTransactions', userId]
  }
  return ['getTransactions', userId, from, to]
}

export const useGetTransactions = ({ from, to }) => {
  const { user } = useAuthContext()
  return useQuery({
    queryKey: getTransactionsQueryKey({ userId: user.id, from, to }),
    queryFn: () => TransactionService.getAll({ from, to }),
    enabled: Boolean(from) && Boolean(to) && Boolean(user.id),
  })
}

export const deleteTransactionMutationKey = (id) => ['deleteTransaction', id]

export const useDeleteTransaction = (id) => {
  const queryClient = useQueryClient()
  const { user } = useAuthContext()
  return useMutation({
    mutationKey: deleteTransactionMutationKey(id),
    mutationFn: () => TransactionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getUserBalanceQueryKey({ userId: user.id }),
      })
      queryClient.invalidateQueries({
        queryKey: getTransactionsQueryKey({ userId: user.id }),
      })
    },
  })
}
