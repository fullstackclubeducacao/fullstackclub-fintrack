import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import {
  useCreateTransaction,
  useUpdateTransaction,
} from '@/api/hooks/transaction'

import {
  createTransactionFormSchema,
  updateTransactionFormSchema,
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

const getUpdateTransactionFormDefaultValues = (transaction) => ({
  id: transaction.id,
  name: transaction.name,
  amount: Number(transaction.amount),
  date: new Date(transaction.date),
  type: transaction.type,
})

export const useUpdateTransactionForm = ({
  transaction,
  onSuccess,
  onError,
}) => {
  const { mutateAsync: updateTransaction } = useUpdateTransaction(
    transaction.id
  )
  const form = useForm({
    resolver: zodResolver(updateTransactionFormSchema),
    shouldUnregister: true,
    defaultValues: getUpdateTransactionFormDefaultValues(transaction),
  })
  useEffect(() => {
    // default values get cached from first render, so we need to reset the form in every render
    form.reset(getUpdateTransactionFormDefaultValues(transaction))
    // O React Hook Form só registra campos que estão explicitamente declarados no formulário. Como o id não está sendo renderizado em um <FormField>, ele não é incluído automaticamente no estado do formulário, mesmo que esteja presente em defaultValues.
    // Para resolver isso, podemos usar o método setValue para definir o valor do campo id no formulário.
    form.setValue('id', transaction.id)
  }, [form, transaction])

  const onSubmit = async (data) => {
    try {
      console.log({ data })
      await updateTransaction(data)
      onSuccess()
    } catch (error) {
      console.error(error)
      onError()
    }
  }
  return { form, onSubmit }
}
