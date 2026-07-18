import React, { createContext, useContext, useState } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void
  user: any
  setUser: (user: any) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Default to true for ease of use
  const [user, setUser] = useState<any>({ name: 'Kavishka' })

  const logout = () => {
    setIsLoggedIn(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    // Return a fallback so the application doesn't crash if AuthProvider is not wrapping the layout
    return {
      isLoggedIn: true,
      setIsLoggedIn: () => {},
      user: { name: 'Kavishka' },
      setUser: () => {},
      logout: () => {}
    }
  }
  return context
}
