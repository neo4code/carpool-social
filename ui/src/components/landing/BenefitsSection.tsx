import { Card, CardContent } from "@/components/ui/card";
import { 
  DollarSign, 
  Leaf, 
  Users, 
  TrendingUp, 
  Clock, 
  Heart 
} from "lucide-react";

const benefits = [
  {
    icon: <DollarSign className="h-12 w-12 text-green-600" />,
    title: "Save Money",
    description: "Reduce commuting costs by up to 70% through ride sharing and earn extra income as a driver.",
    stat: "Up to 70% savings"
  },
  {
    icon: <Leaf className="h-12 w-12 text-green-500" />,
    title: "Environmental Impact",
    description: "Help reduce carbon emissions and traffic congestion by sharing rides with fellow commuters.",
    stat: "50% less CO2"
  },
  {
    icon: <Users className="h-12 w-12 text-blue-600" />,
    title: "Build Community",
    description: "Connect with like-minded professionals and build lasting relationships during your daily commute.",
    stat: "10,000+ connections"
  },
  {
    icon: <TrendingUp className="h-12 w-12 text-purple-600" />,
    title: "Professional Networking",
    description: "Expand your professional network by meeting people from various industries and backgrounds.",
    stat: "Career opportunities"
  },
  {
    icon: <Clock className="h-12 w-12 text-orange-600" />,
    title: "Time Efficiency",
    description: "Use HOV lanes, reduce stress from driving, and make productive use of your commute time.",
    stat: "30% faster trips"
  },
  {
    icon: <Heart className="h-12 w-12 text-red-600" />,
    title: "Stress Reduction",
    description: "Share the driving responsibility and enjoy conversations instead of stressful solo drives.",
    stat: "Happier commutes"
  }
];

export function BenefitsSection() {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Carpool Social?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join thousands of commuters who have transformed their daily travel into something meaningful, profitable, and sustainable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {benefit.description}
                </p>
                <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-full py-2 px-4 inline-block">
                  {benefit.stat}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Commute?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Join our growing community of smart commuters and start experiencing the benefits today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">15,000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">$2.5M+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Money Saved</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">500K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Rides Shared</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
