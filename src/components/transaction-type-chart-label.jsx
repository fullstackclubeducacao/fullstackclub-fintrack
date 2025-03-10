const TransactionTypeChartLabel = ({ icon, value }) => {
  return (
    <div className="flex items-center gap-8">
      {icon}
      <p className="w-full text-right text-sm font-bold">{value}</p>
    </div>
  )
}

export default TransactionTypeChartLabel
