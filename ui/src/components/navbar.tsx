import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { Menu, Car } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/lib/auth-context";
import { ModeToggle } from "@/components/mode-toggle";
import { useNavigate, useLocation } from "react-router-dom";

export function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isLandingPage = location.pathname === "/" && !user;

  return (
    <header className={`sticky top-0 z-50 flex items-center h-16 px-4 border-b shrink-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${isLandingPage ? 'absolute w-full' : ''}`}>
      <div className="flex items-center">
        {user && (
          <SidebarTrigger className="size-8 mr-3">
            <Menu className="w-5 h-5" />
          </SidebarTrigger>
        )}
        {!user && (
          <Car className="h-8 w-8 text-blue-600 mr-2" />
        )}
        <span className="font-bold text-xl">
          {user ? "Carpool Social" : "Carpool Social"}
        </span>
      </div>
      
      <div className="flex items-center gap-3 ml-auto">
        {!user && !isLandingPage && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        )}
        
        {user && (
          <span className="text-sm text-muted-foreground">
            Welcome, {user.displayName || user.email}
          </span>
        )}
        
        <ModeToggle />
        
        {!user && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>
        )}
        
        {user && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut(auth)}
          >
            Sign Out
          </Button>
        )}
      </div>
    </header>
  );
} 