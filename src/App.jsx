import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import DataTable from './components/DataTable'
import data from './data.json'

const fuseOptions = {
  includeScore: true,
  threshold: 0.4,
  ignoreLocation: true,
  keys: [
    { name: 'AB PM - JAY Package Name', weight: 2 },
    { name: 'AB PM - JAY Procedure Name', weight: 2 },
    { name: 'Package Code HBP 2.2', weight: 1.5 },
    { name: 'Procedure Code HBP 2.2', weight: 1.5 },
    { name: 'Specialty', weight: 1.5 },
    { name: 'Specialty Code HBP 2.0', weight: 1 },
    { name: 'Procedure Code HBP 1.0', weight: 1 },
    { name: 'Package Price', weight: 0.5 },
    { name: 'LOS', weight: 0.5 },
  ],
}

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  const fuse = useMemo(() => new Fuse(data, fuseOptions), [])

  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) {
      return data
    }
    const results = fuse.search(searchQuery)
    return results.map((result) => result.item)
  }, [searchQuery, fuse])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-hospital-700 tracking-tight">
              MedPackage Finder
            </h1>
            <p className="mt-2 text-gray-500 text-sm sm:text-base">
              Hospital Internal Reference Tool
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
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
          <p className="mt-3 text-center text-sm text-gray-500">
            {filteredData.length} {filteredData.length === 1 ? 'result' : 'results'} found
            {searchQuery && ` for "${searchQuery}"`}
          </p>
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
