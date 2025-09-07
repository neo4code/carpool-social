import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { auth, googleProvider, appleProvider, facebookProvider } from "@/lib/firebase"
import { signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword } from "firebase/auth"
import { AuthProviderButton } from "./auth-provider-button"


interface LoginFormProps {
  className?: string;
  mode?: "standalone" | "landing";
}

export function LoginForm({ className = "", mode = "standalone" }: LoginFormProps = {}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err: any) {
      // If user doesn't exist, automatically register them
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        try {
          await createUserWithEmailAndPassword(auth, email, password)
          console.log('User automatically registered and signed in')
        } catch (registerErr: any) {
          setError(`Failed to register: ${registerErr.message}`)
          console.error('Registration error:', registerErr)
        }
      } else {
        setError("Failed to sign in. Please check your credentials.")
        console.error(err)
      }
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (err) {
      setError("Failed to sign in with Google.")
      console.error(err)
    }
  }

  const handleAppleSignIn = async () => {
    try {
      await signInWithPopup(auth, appleProvider)
    } catch (err) {
      setError("Failed to sign in with Apple.")
      console.error(err)
    }
  }

  const handleFacebookSignIn = async () => {
    try {
      await signInWithPopup(auth, facebookProvider)
    } catch (err) {
      setError("Failed to sign in with Facebook.")
      console.error(err)
    }
  }

  return (
    <Card className={`w-[350px] ${className}`}>
      <CardHeader>
        <CardTitle>
          {mode === "landing" ? "Welcome to Carpool Social" : "Login"}
        </CardTitle>
        <CardDescription>
          {mode === "landing" 
            ? "Join thousands of commuters already saving money and building community."
            : "Enter your credentials to access your account."
          }
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                id="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" className="w-full">Sign in / Register</Button>
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="space-y-2">
            <AuthProviderButton 
              provider="google" 
              onClick={handleGoogleSignIn}
            />
            <AuthProviderButton 
              provider="apple" 
              onClick={handleAppleSignIn}
            />
            <AuthProviderButton 
              provider="facebook" 
              onClick={handleFacebookSignIn}
            />
          </div>
        </CardFooter>
      </form>
    </Card>
  )
} 