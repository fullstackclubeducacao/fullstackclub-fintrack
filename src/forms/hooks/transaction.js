import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  useCreateTransaction,
  useEditTransaction,
} from '@/api/hooks/transaction'

import {
  createTransactionFormSchema,
  editTransactionFormSchema,
} from '../schemas/transaction'

export const useCreateTransactionForm = ({ onSuccess, onError }) => {
  const { mutateAsync: createTransaction } = useCreateTransaction()
  const form = useForm({
    resolver: zodResolver(createTransactionFormSchema),
    defaultValues: {
      name: '',
      amount: 50,
      date: new Date(),
      type: 'EARNING',
    },
    shouldUnregister: true,
  })
  const onSubmit = async (data) => {
    try {
      await createTransaction(data)
      onSuccess()
    } catch (error) {
      console.error(error)
      onError()
    }
  }
  return { form, onSubmit }
}

const getEditTransactionFormDefaultValues = (transaction) => ({
  name: transaction.name,
  amount: parseFloat(transaction.amount),
  date: new Date(transaction.date),
  type: transaction.type,
})

export const useEditTransactionForm = ({ transaction, onSuccess, onError }) => {
  const { mutateAsync: updateTransaction } = useEditTransaction()
  const form = useForm({
    resolver: zodResolver(editTransactionFormSchema),
    defaultValues: getEditTransactionFormDefaultValues(transaction),
    shouldUnregister: true,
  })
  useEffect(() => {
    form.reset(getEditTransactionFormDefaultValues(transaction))
    form.setValue('id', transaction.id)
  }, [form, transaction])
  const onSubmit = async (data) => {
    await updateTransaction(data)
    try {
      onSuccess()
    } catch (error) {
      console.error(error)
      onError()
    }
  }
  return { form, onSubmit }
}
