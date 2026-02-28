import * as XLSX from 'xlsx'

const EXPORT_COLUMNS = [
  { key: 'Specialty', header: 'Specialty' },
  { key: 'Specialty Code HBP 2.0', header: 'Specialty Code HBP 2.0' },
  { key: 'Procedure Code HBP 1.0', header: 'Procedure Code HBP 1.0' },
  { key: 'Package Code HBP 2.2', header: 'Package Code HBP 2.2' },
  { key: 'Procedure Code HBP 2.2', header: 'Procedure Code HBP 2.2' },
  { key: 'AB PM - JAY Package Name', header: 'AB PM - JAY Package Name' },
  { key: 'AB PM - JAY Procedure Name', header: 'AB PM - JAY Procedure Name' },
  { key: 'Package Price', header: 'Package Price' },
  { key: 'LOS', header: 'LOS' },
  { key: 'Stratification Criteria (Y/N)', header: 'Stratification Criteria' },
  { key: 'Implants / High End Consumables (Y/N)', header: 'Implants / High End Consumables' },
  { key: 'ReservationPublic Hospitals (Y/N)', header: 'Reserved Public Hospitals' },
  { key: 'Mandatory Documents - Pre Authorization', header: 'Mandatory Documents - Pre Authorization' },
  { key: 'Mandatory Documents - Claim Processing', header: 'Mandatory Documents - Claim Processing' },
]

export function exportToExcel(data) {
  if (!data || data.length === 0) {
    return
  }

  // Format data for export
  const exportData = data.map((row) => {
    const formattedRow = {}
    EXPORT_COLUMNS.forEach(({ key, header }) => {
      const value = row[key]
      formattedRow[header] = value !== null && value !== undefined ? String(value).trim() : ''
    })
    return formattedRow
  })

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(exportData)

  // Set column widths
  const colWidths = EXPORT_COLUMNS.map(({ header }) => ({
    wch: Math.max(header.length, 15),
  }))
  worksheet['!cols'] = colWidths

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'MedPackage Data')

  // Generate filename with current date
  const today = new Date()
  const dateStr = today.toISOString().split('T')[0]
  const filename = `MedPackage_Finder_${dateStr}.xlsx`

  // Download file
  XLSX.writeFile(workbook, filename)
}
