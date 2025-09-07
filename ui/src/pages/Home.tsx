import { useAuth } from '@/lib/auth-context';
import { Car, Users, MapPin, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function Home() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-6">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <Car className="w-16 h-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold">Welcome to Carpool Social</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow commuters, share rides, and make your daily journey more social and sustainable.
          </p>
          {user && (
            <p className="text-lg">
              Hello, <span className="font-semibold">{user.displayName || user.email}</span>! 
              Ready to start carpooling?
            </p>
          )}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Users className="w-6 h-6 text-blue-600" />
                <CardTitle>Find Carpools</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Connect with people in your area who share similar commute routes and schedules.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-green-600" />
                <CardTitle>Route Matching</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Smart route matching to find the most convenient carpool partners along your journey.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-purple-600" />
                <CardTitle>Schedule Coordination</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Coordinate schedules with your carpool group and get notifications for upcoming rides.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Ready to Get Started?</h2>
          <p className="text-muted-foreground">
            More features are coming soon! Stay tuned for updates.
          </p>
          <Button size="lg" className="mt-4">
            Coming Soon
          </Button>
        </div>
      </div>
    </div>
  );
} 