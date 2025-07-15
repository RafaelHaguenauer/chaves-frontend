type ExportCSVButtonProps = {
  data: Record<string, any>[]
  filename?: string
}

const ExportCSVButton = ({ data, filename = 'dados.csv' }: ExportCSVButtonProps) => {
  const handleExport = () => {
    if (!data || data.length === 0) return

    const keys = Object.keys(data[0])
    const csvRows = [
      keys.join(','), // header
      ...data.map(row => keys.map(k => `"${String(row[k]).replace(/"/g, '""')}"`).join(',')),
    ]
    const csvContent = csvRows.join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleExport}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-2"
    >
      Exportar CSV
    </button>
  )
}

export default ExportCSVButton