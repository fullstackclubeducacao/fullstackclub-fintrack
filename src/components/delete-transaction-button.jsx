import { Loader2Icon, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { useDeleteTransaction } from '@/api/hooks/transaction'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

const DeleteTransactionButton = ({ transaction }) => {
  const [alertIsOpen, setAlertIsOpen] = useState(false)
  const { mutate, isPending } = useDeleteTransaction(transaction.id)
  const handleConfirmClick = () => {
    mutate(undefined, {
      onSuccess: () => {
        setAlertIsOpen(false)
        toast.success('Transação deletada com sucesso!')
      },
      onError: () => {
        toast.error('Ocorreu um erro ao deletar a transação.')
      },
    })
  }
  return (
    <AlertDialog open={alertIsOpen} onOpenChange={setAlertIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <TrashIcon className="text-muted-foreground" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja deletar essa transação?</AlertDialogTitle>
          <AlertDialogDescription>
            Uma vez deletada, não será possível recuperar essa transação. Deseja
            continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleConfirmClick}
            disabled={isPending}
          >
            {isPending && <Loader2Icon className="animate-spin" />}
            Deletar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteTransactionButton
