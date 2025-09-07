import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  DollarSign, 
  Shield, 
  Clock, 
  Route,
  Star
} from "lucide-react";

const features = [
  {
    icon: <Route className="h-8 w-8 text-blue-600" />,
    title: "Smart Route Matching",
    description: "Our AI-powered algorithm matches you with commuters taking similar routes, optimizing for convenience and compatibility.",
    badge: "AI-Powered"
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-green-600" />,
    title: "Social Communication",
    description: "Chat with potential ride partners, build relationships, and create a trusted network of commuting companions.",
    badge: "Community"
  },
  {
    icon: <DollarSign className="h-8 w-8 text-yellow-600" />,
    title: "Income Generation",
    description: "Turn your daily commute into a source of income by sharing rides with verified passengers.",
    badge: "Earn Money"
  },
  {
    icon: <Shield className="h-8 w-8 text-red-600" />,
    title: "Safety & Verification",
    description: "Comprehensive background checks, real-time tracking, and community ratings ensure safe travels.",
    badge: "Verified"
  },
  {
    icon: <Clock className="h-8 w-8 text-purple-600" />,
    title: "Flexible Scheduling",
    description: "Set your own schedule, find one-time rides or regular carpool partners for your daily routine.",
    badge: "Flexible"
  },
  {
    icon: <Star className="h-8 w-8 text-orange-600" />,
    title: "Rating System",
    description: "Build your reputation through our transparent rating system and connect with highly-rated members.",
    badge: "Trust"
  }
];

export function FeaturesSection() {
  return (
    <section id="features-section" className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Everything You Need for Better Commuting
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with community-driven features to revolutionize how you commute.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  {feature.icon}
                  <Badge variant="secondary">{feature.badge}</Badge>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
