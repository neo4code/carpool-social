import { Clock, Wrench } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ComingSoonProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export function ComingSoon({ 
  title, 
  description = "This feature is currently under development and will be available soon.",
  icon = <Wrench className="w-12 h-12" />
}: ComingSoonProps) {
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="flex justify-center mb-4 text-muted-foreground">
              {icon}
            </div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription className="text-base">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Coming Soon</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
