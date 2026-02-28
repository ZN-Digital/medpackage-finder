import { createContext, useContext, useState, useEffect } from 'react'

const APP_VERSION = 'v1.0.0'

const VALID_CREDENTIALS = {
  username: 'saquib_dr',
  password: '20010518',
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('medpackage_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem('medpackage_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = (username, password) => {
    if (
      username === VALID_CREDENTIALS.username &&
      password === VALID_CREDENTIALS.password
    ) {
      const userData = {
        username,
        loginTime: new Date().toISOString(),
      }
      setUser(userData)
      localStorage.setItem('medpackage_user', JSON.stringify(userData))
      return { success: true }
    }
    return { success: false, error: 'Invalid username or password' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('medpackage_user')
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    appVersion: APP_VERSION,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
