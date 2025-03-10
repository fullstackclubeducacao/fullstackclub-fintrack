const TransactionTypeIcon = ({ icon, label }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
          {icon}
        </div>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </>
  )
}

export default TransactionTypeIcon
