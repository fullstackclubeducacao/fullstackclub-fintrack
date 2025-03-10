import { TrashIcon } from 'lucide-react'
import { toast } from 'sonner'

import { useDeleteTransaction } from '@/api/hooks/transaction'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

const DeleteTransactionButton = ({ transactionId }) => {
  const { mutate } = useDeleteTransaction(transactionId)
  const handleConfirmClick = () => {
    mutate(null, {
      onSuccess: () => {
        toast.success('Transação deletada com sucesso.')
      },
      onError: (error) => {
        console.error(error)
        toast.error(
          'Ocorreu um erro ao deletar a transação. Por favor, tente novamente.'
        )
      },
    })
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <TrashIcon className="text-muted-foreground" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deseja realmente deletar essa transação?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Todos os dados serão perdidos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmClick}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteTransactionButton
