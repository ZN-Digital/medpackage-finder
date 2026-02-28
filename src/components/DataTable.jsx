import { useState, Fragment } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table'
import data from '../data.json'

const columnHelper = createColumnHelper()

const getCellValue = (value) => {
  if (value === null || value === undefined) return '-'
  const stringValue = String(value).trim()
  return stringValue || '-'
}

const getYnBadgeClass = (value) => {
  const normalizedValue = String(value).trim().toUpperCase()
  return normalizedValue === 'Y' || normalizedValue === 'YES'
    ? 'badge-yes'
    : 'badge-no'
}

const columns = [
  columnHelper.accessor('Specialty', {
    header: 'Specialty',
    cell: (info) => getCellValue(info.getValue()),
    size: 150,
  }),
  columnHelper.accessor((row) => row['Specialty Code HBP 2.0'], {
    id: 'Specialty Code HBP 2.0',
    header: 'Specialty Code HBP 2.0',
    cell: (info) => getCellValue(info.getValue()),
    size: 100,
  }),
  columnHelper.accessor((row) => row['Procedure Code HBP 1.0'], {
    id: 'Procedure Code HBP 1.0',
    header: 'Procedure Code HBP 1.0',
    cell: (info) => (
      <span className="font-mono text-hospital-700 font-medium">
        {getCellValue(info.getValue())}
      </span>
    ),
    size: 120,
  }),
  columnHelper.accessor((row) => row['Package Code HBP 2.2'], {
    id: 'Package Code HBP 2.2',
    header: 'Package Code HBP 2.2',
    cell: (info) => (
      <span className="font-mono text-hospital-700 font-medium">
        {getCellValue(info.getValue())}
      </span>
    ),
    size: 120,
  }),
  columnHelper.accessor((row) => row['Procedure Code HBP 2.2'], {
    id: 'Procedure Code HBP 2.2',
    header: 'Procedure Code HBP 2.2',
    cell: (info) => (
      <span className="font-mono text-hospital-700">
        {getCellValue(info.getValue())}
      </span>
    ),
    size: 120,
  }),
  columnHelper.accessor('AB PM - JAY Package Name', {
    header: 'AB PM - JAY Package Name',
    cell: (info) => (
      <span className="font-medium text-gray-900">
        {getCellValue(info.getValue())}
      </span>
    ),
    size: 250,
  }),
  columnHelper.accessor('AB PM - JAY Procedure Name', {
    header: 'AB PM - JAY Procedure Name',
    cell: (info) => getCellValue(info.getValue()),
    size: 250,
  }),
  columnHelper.accessor('Package Price', {
    header: 'Price',
    cell: (info) => (
      <span className="font-medium text-green-700">
        {getCellValue(info.getValue())}
      </span>
    ),
    size: 100,
  }),
  columnHelper.accessor('LOS', {
    header: 'LOS',
    cell: (info) => getCellValue(info.getValue()),
    size: 60,
  }),
  columnHelper.accessor('Stratification Criteria (Y/N)', {
    header: 'Stratification',
    cell: (info) => {
      const val = info.getValue()
      if (!val) return '-'
      return (
        <span className={`badge ${getYnBadgeClass(val)}`}>
          {getCellValue(val)}
        </span>
      )
    },
    size: 100,
  }),
  columnHelper.accessor('Implants / High End Consumables (Y/N)', {
    header: 'Implants',
    cell: (info) => {
      const val = info.getValue()
      if (!val) return '-'
      return (
        <span className={`badge ${getYnBadgeClass(val)}`}>
          {getCellValue(val)}
        </span>
      )
    },
    size: 100,
  }),
  columnHelper.accessor('ReservationPublic Hospitals (Y/N)', {
    header: 'Reserved',
    cell: (info) => {
      const val = info.getValue()
      if (!val) return '-'
      return (
        <span className={`badge ${getYnBadgeClass(val)}`}>
          {getCellValue(val)}
        </span>
      )
    },
    size: 100,
  }),
  columnHelper.accessor('Mandatory Documents - Pre Authorization', {
    header: 'Mandatory Documents - Pre Authorization',
    cell: (info) => getCellValue(info.getValue()),
    size: 340,
  }),
  columnHelper.accessor('Mandatory Documents - Claim Processing', {
    header: 'Mandatory Documents - Claim Processing',
    cell: (info) => getCellValue(info.getValue()),
    size: 340,
  }),
]

function DataTable({ data: propData }) {
  const [sorting, setSorting] = useState([])
  const [expandedRows, setExpandedRows] = useState({})
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  })
  const tableData = Array.isArray(propData) ? propData : data

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      pagination,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const toggleRowExpanded = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }))
  }

  const pageCount = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex

  const renderPaginationButtons = () => {
    const buttons = []
    const maxButtons = 5
    let start = Math.max(0, currentPage - Math.floor(maxButtons / 2))
    let end = Math.min(pageCount, start + maxButtons)

    if (end - start < maxButtons) {
      start = Math.max(0, end - maxButtons)
    }

    for (let i = start; i < end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => table.setPageIndex(i)}
          className={`pagination-btn ${currentPage === i ? 'pagination-btn-active' : ''}`}
        >
          {i + 1}
        </button>
      )
    }
    return buttons
  }

  return (
    <div className="w-full">
      {/* Table Container */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[1400px]">
          <thead className="sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="table-header"
                    style={{ width: header.getSize() }}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      <span className="text-hospital-200">
                        {{
                          asc: '↑',
                          desc: '↓',
                        }[header.column.getIsSorted()] ?? (
                          <span className="opacity-30">↕</span>
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-16 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center">
                    <svg
                      className="h-12 w-12 text-gray-300 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-lg font-medium">No results found</p>
                    <p className="text-sm">Try adjusting your search terms</p>
                  </div>
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <tr
                    className={`table-row ${
                      expandedRows[row.id] ? 'table-row-expanded' : ''
                    }`}
                    onClick={() => toggleRowExpanded(row.id)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="table-cell">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                  {expandedRows[row.id] && (
                    <tr>
                      <td colSpan={columns.length} className="p-0">
                        <div className="expand-panel">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Pre Authorization Documents */}
                            <div>
                              <h4 className="text-sm font-semibold text-hospital-800 mb-2 flex items-center gap-2">
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                                Mandatory Documents - Pre Authorization
                              </h4>
                              <div className="bg-white rounded-lg p-3 border border-hospital-100 text-sm text-gray-700 whitespace-pre-wrap">
                                {row.original['Mandatory Documents - Pre Authorization'] ||
                                  'No documents specified'}
                              </div>
                            </div>
                            {/* Claim Processing Documents */}
                            <div>
                              <h4 className="text-sm font-semibold text-hospital-800 mb-2 flex items-center gap-2">
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                  />
                                </svg>
                                Mandatory Documents - Claim Processing
                              </h4>
                              <div className="bg-white rounded-lg p-3 border border-hospital-100 text-sm text-gray-700 whitespace-pre-wrap">
                                {row.original['Mandatory Documents - Claim Processing'] ||
                                  'No documents specified'}
                              </div>
                            </div>
                          </div>
                          {/* Additional Row Info */}
                          <div className="mt-4 pt-3 border-t border-hospital-200">
                            <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                              <span>
                                <strong>Procedure Code HBP 1.0:</strong>{' '}
                                {row.original['Procedure Code HBP 1.0'] || '-'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {tableData.length > 0 && (
        <div className="px-4 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Page Size Selector */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Show</span>
              <select
                value={pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value))
                }}
                className="px-3 py-1.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-hospital-300"
              >
                {[10, 20, 30, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span>entries</span>
            </div>

            {/* Page Info */}
            <div className="text-sm text-gray-600">
              Showing{' '}
              <span className="font-medium">
                {currentPage * pagination.pageSize + 1}
              </span>{' '}
              to{' '}
              <span className="font-medium">
                {Math.min(
                  (currentPage + 1) * pagination.pageSize,
                  tableData.length
                )}
              </span>{' '}
              of <span className="font-medium">{tableData.length}</span> entries
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="pagination-btn"
                title="First page"
              >
                ««
              </button>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="pagination-btn"
                title="Previous page"
              >
                «
              </button>
              {renderPaginationButtons()}
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="pagination-btn"
                title="Next page"
              >
                »
              </button>
              <button
                onClick={() => table.setPageIndex(pageCount - 1)}
                disabled={!table.getCanNextPage()}
                className="pagination-btn"
                title="Last page"
              >
                »»
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataTable
