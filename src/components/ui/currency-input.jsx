import { NumericFormat } from 'react-number-format'

import { Input } from './input'

const CurrencyInput = (props) => {
  return (
    <NumericFormat
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
      allowNegative={false}
      customInput={Input}
      {...props}
    />
  )
}

export default CurrencyInput
