import { createContext, useContext, useEffect, useState, useRef } from 'react'
import type { User } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { logAuthEvent } from './serverComm'

type AuthContextType = {
  user: User | null
  loading: boolean
  logUserAuthEvent: (eventType: 'signup' | 'login' | 'logout', provider: string, metadata?: any) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  loading: true,
  logUserAuthEvent: async () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const previousUserRef = useRef<User | null>(null)

  // Function to log authentication events
  const logUserAuthEvent = async (eventType: 'signup' | 'login' | 'logout', provider: string, metadata?: any) => {
    try {
      await logAuthEvent(eventType, provider, metadata)
    } catch (error) {
      console.error('Failed to log auth event:', error)
      // Don't throw error to avoid disrupting auth flow
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      const previousUser = previousUserRef.current
      
      setUser(user)
      setLoading(false)
      
      // Log authentication events when user state changes
      if (user && !previousUser) {
        // User just signed in
        // Note: We can't easily distinguish signup vs login here since Firebase 
        // handles that logic. The middleware will determine this based on whether
        // the user exists in our database.
        
        // Extract provider from Firebase user metadata
        const provider = user.providerData[0]?.providerId || 'email'
        const providerName = provider.includes('google') ? 'google' :
                             provider.includes('apple') ? 'apple' :
                             provider.includes('facebook') ? 'facebook' :
                             'email'
        
        // Wait a bit for the user to be created in our backend first
        setTimeout(async () => {
          try {
            await logUserAuthEvent('login', providerName, {
              providerId: provider,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              metadata: user.metadata,
            })
          } catch (error) {
            console.error('Failed to log login event:', error)
          }
        }, 1000)
      } else if (!user && previousUser) {
        // User just signed out
        const provider = previousUser.providerData[0]?.providerId || 'email'
        const providerName = provider.includes('google') ? 'google' :
                             provider.includes('apple') ? 'apple' :
                             provider.includes('facebook') ? 'facebook' :
                             'email'
        
        await logUserAuthEvent('logout', providerName, {
          userId: previousUser.uid,
          email: previousUser.email,
        })
      }
      
      previousUserRef.current = user
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, logUserAuthEvent }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 