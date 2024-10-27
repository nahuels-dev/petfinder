"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserServerAction, logout } from '@/app/utils/supabase/helpers';

interface AuthContextProps {
  user: any
  setUser: React.Dispatch<React.SetStateAction<any>>
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUserServerAction();
      setUser(fetchedUser)
    }
    fetchUser()
  }, [])

  const handleLogout = async () => {
    await logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
