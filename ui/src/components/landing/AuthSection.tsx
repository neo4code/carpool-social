import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { auth, googleProvider, appleProvider, facebookProvider } from "@/lib/firebase";
import { 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { AuthProviderButton } from "@/components/auth-provider-button";


interface AuthFormProps {
  mode: "login" | "signup";
}

function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "signup" && password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      if (mode === "login" && (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential')) {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
        } catch (registerErr: any) {
          setError(`Failed to register: ${registerErr.message}`);
        }
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError("Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, appleProvider);
    } catch (err: any) {
      setError("Failed to sign in with Apple.");
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, facebookProvider);
    } catch (err: any) {
      setError("Failed to sign in with Facebook.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {mode === "signup" && (
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        {error && (
          <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded">
            {error}
          </div>
        )}
      </CardContent>
      <CardContent className="space-y-4 pt-0">
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
        </Button>
        
        <div className="relative">
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
            disabled={loading}
          />
          <AuthProviderButton 
            provider="apple" 
            onClick={handleAppleSignIn}
            disabled={loading}
          />
          <AuthProviderButton 
            provider="facebook" 
            onClick={handleFacebookSignIn}
            disabled={loading}
          />
        </div>
      </CardContent>
    </form>
  );
}

export function AuthSection() {
  return (
    <section id="auth-section" className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Get Started Today
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Join thousands of commuters who are already saving money, making connections, and reducing their environmental impact.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="text-lg px-8 py-4">
                Join the Community
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <Card className="border-0 shadow-none">
                <CardHeader>
                  <CardTitle>Welcome to Carpool Social</CardTitle>
                  <CardDescription>Sign in to your account or create a new one</CardDescription>
                </CardHeader>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login">
                    <AuthForm mode="login" />
                  </TabsContent>
                  <TabsContent value="signup">
                    <AuthForm mode="signup" />
                  </TabsContent>
                </Tabs>
              </Card>
            </DialogContent>
          </Dialog>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          By signing up, you agree to our{" "}
          <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{" "}
          <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
        </div>
      </div>
    </section>
  );
}
