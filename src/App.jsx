import { useState, useMemo, useEffect } from 'react'
import { useAuth } from './context/AuthContext'
import DataTable from './components/DataTable'
import Header from './components/Header'
import LoginPage from './components/LoginPage'
import { exportToExcel } from './utils/exportToExcel'
import data from './data.json'

const searchableFields = [
  'AB PM - JAY Package Name',
  'AB PM - JAY Procedure Name',
  'Package Code HBP 2.2',
  'Procedure Code HBP 2.2',
  'Specialty',
  'Specialty Code HBP 2.0',
  'Procedure Code HBP 1.0',
  'Package Price',
  'LOS',
]

function App() {
  const { isAuthenticated, isLoading } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const filteredData = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    if (!normalizedQuery) {
      return data
    }

    return data.filter((item) =>
      searchableFields.some((field) =>
        String(item[field] ?? '')
          .toLowerCase()
          .includes(normalizedQuery)
      )
    )
  }, [searchQuery])

  const handleExport = () => {
    exportToExcel(filteredData)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center login-gradient">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-hospital-200 border-t-hospital-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Sticky Search Bar */}
      <div
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-sm shadow-md border-b border-gray-100'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-6 w-6 text-hospital-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="search-input pl-14"
                placeholder="Search packages, procedures, specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Results Count + Export Button */}
        <div className="max-w-3xl mx-auto mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {filteredData.length} {filteredData.length === 1 ? 'result' : 'results'} found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
          <button
            onClick={handleExport}
            disabled={filteredData.length === 0}
            className="export-button"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Export to Excel</span>
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <DataTable data={filteredData} />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 pb-6">
        <p className="text-center text-xs text-gray-400">
          MedPackage Finder • Hospital Internal Reference Tool • For authorized personnel only
        </p>
      </footer>
    </div>
  )
}

export default App
