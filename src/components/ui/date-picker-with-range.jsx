'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale/pt-BR'
import { Calendar as CalendarIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export const DatePickerWithRange = ({
  value,
  onChange,
  className,
  placeholder = 'Selecione uma data',
}) => {
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-full justify-start text-left font-normal',
              !value && 'text-muted-foreground'
            )}
          >
            <CalendarIcon />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, 'LLL dd, y', {
                    locale: ptBR,
                  })}{' '}
                  -{' '}
                  {format(value.to, 'LLL dd, y', {
                    locale: ptBR,
                  })}
                </>
              ) : (
                format(value.from, 'LLL dd, y', {
                  locale: ptBR,
                })
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
