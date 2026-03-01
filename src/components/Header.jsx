import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Logo from './Logo'

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showVersion, setShowVersion] = useState(false)
  const dropdownRef = useRef(null)
  const { user, logout, appVersion } = useAuth()

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    setIsDropdownOpen(false)
    logout()
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 relative">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <Logo size="default" showText={true} />
          </div>

          {/* Title - Center */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl font-bold text-hospital-700 tracking-tight">
                C.G HBP 2.2 PACKAGE FINDER
              </h1>
              <p className="hidden sm:block mt-1 text-gray-500 text-sm">
                Hospital Internal Reference Tool
              </p>
            </div>
          </div>

          {/* Profile Dropdown - Right */}
          <div className="flex-shrink-0" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-hospital-50 hover:bg-hospital-100 border border-hospital-200 transition-all duration-200 group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-hospital-500 to-hospital-700 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-700 group-hover:text-hospital-700">
                {user?.username || 'User'}
              </span>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-4 sm:right-6 mt-2 w-56 origin-top-right animate-dropdownFade z-50">
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                  {/* User Info */}
                  <div className="px-4 py-3 bg-gradient-to-r from-hospital-50 to-blue-50 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-hospital-500 to-hospital-700 flex items-center justify-center text-white font-semibold shadow-sm">
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {user?.username || 'User'}
                        </p>
                        <p className="text-xs text-gray-500">Hospital Staff</p>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    {/* About */}
                    <div
                      className="relative"
                      onMouseEnter={() => setShowVersion(true)}
                      onMouseLeave={() => setShowVersion(false)}
                    >
                      <button className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-hospital-50 flex items-center gap-3 transition-colors">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>About</span>
                        {showVersion && (
                          <span className="ml-auto text-xs text-hospital-600 font-medium animate-fadeIn">
                            {appVersion}
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-1"></div>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
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
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
