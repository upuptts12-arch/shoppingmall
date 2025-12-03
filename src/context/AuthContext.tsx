'use client'

import { createContext, useContext, useState } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  userName: string | null
  login: (name: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userName: null,
  login: () => {},
  logout: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState<string | null>(null)

  const login = (name: string) => {
    setIsLoggedIn(true)
    setUserName(name)
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUserName(null)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
