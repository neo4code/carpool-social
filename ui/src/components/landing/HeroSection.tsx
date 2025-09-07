import { Button } from "@/components/ui/button";
import { Car, Users, DollarSign } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-32 pb-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
          The <span className="text-blue-600 dark:text-blue-400">LinkedIn</span> of Commuting
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Connect with fellow commuters, share rides, build community, and earn money while reducing your environmental impact.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="text-lg px-8 py-4"
            onClick={() => document.getElementById('auth-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Get Started Today
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="text-lg px-8 py-4"
            onClick={() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Learn More
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-blue-600" />
            <span>Smart Route Matching</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            <span>Social Community</span>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-yellow-600" />
            <span>Earn While You Drive</span>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-200 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 dark:bg-pink-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>
    </section>
  );
}
