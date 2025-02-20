import { ArrowUpDownIcon } from 'lucide-react'

import { Button } from './button'

const SortableColumnHeader = ({ column, children }) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    >
      {children}
      <ArrowUpDownIcon className="ml-2 h-4 w-4" />
    </Button>
  )
}

export default SortableColumnHeader
