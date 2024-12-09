import {
  CreditCard,
  Mail,
  Database,
  MessageSquare,
  Terminal,
  LucideIcon,
  Users,
} from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features = [
  {
    icon: Users,
    title: 'User Authentication',
    description: 'Securely manage user accounts with robust authentication.',
  },
  {
    icon: CreditCard,
    title: 'Subscriptions with Stripe',
    description: 'Monetize your platform with flexible subscription plans',
  },
  {
    icon: Mail,
    title: 'Email Notifications',
    description: 'Keep users informed with dynamic, automated emails',
  },
  {
    icon: Database,
    title: 'Database Management',
    description: 'Handle data seamlessly with Prisma ORM and PostgreSQL',
  },
  {
    icon: MessageSquare,
    title: 'AI-Powered Chat',
    description: 'Boost engagement with real-time AI chat powered by OpenAI',
  },
  {
    icon: Terminal,
    title: 'API Integration',
    description: 'Seamlessly integrate with various APIs and services',
  },
];

export default function Features() {
  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h2 className="mb-1 text-3xl font-bold tracking-tighter">Platform Features</h2>
          <p className="text-xl text-muted-foreground">Seamless frontend-backend integration</p>
        </div>
        <div className="rounded-md bg-accent p-2">
          <code className="text-sm">$ npx @bakan/create</code>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-accent md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex items-start space-x-3 bg-background p-4">
      <div className="flex-shrink-0">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div>
        <h3 className="mb-1 text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
