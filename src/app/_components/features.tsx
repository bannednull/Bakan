import ScrollAnimate from '@/app/_components/scroll-animate';
import { Check, CreditCard, Database, Mail, Sparkles } from 'lucide-react';

function Features() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-10">
        <ScrollAnimate>
          <div className="space-y-3 rounded-lg border bg-accent/40 p-5 text-sm text-muted-foreground">
            <h3 className="flex items-center gap-4 text-2xl font-bold text-foreground">
              <div className="rounded-full bg-background p-2">
                <CreditCard />
              </div>{' '}
              Subscriptions with Stripe
            </h3>
            <p>
              Monetize your platform by offering flexible subscription plans, fully integrated with
              Stripe for seamless payments and management:
            </p>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-4">
                <Check className="stroke-blue-500" /> Monthly and yearly subscriptions
              </li>
              <li className="flex items-center gap-4">
                <Check className="stroke-blue-500" /> Secure payment processing
              </li>
            </ul>
          </div>
        </ScrollAnimate>

        <ScrollAnimate>
          <div className="space-y-3 rounded-lg border bg-accent/40 p-5 text-sm text-muted-foreground">
            <h3 className="flex items-center gap-4 text-2xl font-bold text-foreground">
              <div className="rounded-full bg-background p-2">
                <Mail />
              </div>{' '}
              Email Notifications
            </h3>
            <p>
              Keep your users informed with dynamic, automated emails using Nodemailer and React
              Email for templating:
            </p>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-4">
                <Check className="stroke-blue-500" /> Customizable templates
              </li>
              <li className="flex items-center gap-4">
                <Check className="stroke-blue-500" /> Reliable delivery with SMTP
              </li>
            </ul>
          </div>
        </ScrollAnimate>

        <ScrollAnimate>
          <div className="space-y-3 rounded-lg border bg-accent/40 p-5 text-sm text-muted-foreground">
            <h3 className="flex items-center gap-4 text-2xl font-bold text-foreground">
              <div className="rounded-full bg-background p-2">
                <Database />
              </div>{' '}
              Database Management
            </h3>
            <p>
              Handle your data seamlessly with Prisma ORM and PostgreSQL, ensuring high performance
              and scalability for your application:
            </p>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-4">
                <Check className="stroke-blue-500" /> Simplified database schema and migration
                management
              </li>
              <li className="flex items-center gap-4">
                <Check className="stroke-blue-500" /> Powerful query building with Prisma Client
              </li>
              <li className="flex items-center gap-4">
                <Check className="stroke-blue-500" /> Support for advanced relational data models
              </li>
            </ul>
          </div>
        </ScrollAnimate>

        <ScrollAnimate>
          <div className="space-y-3 rounded-lg border bg-accent/40 p-5 text-sm text-muted-foreground">
            <h3 className="flex items-center gap-4 text-2xl font-bold text-foreground">
              <div className="rounded-full bg-background p-2">
                <Sparkles />
              </div>{' '}
              AI-Powered Chat Integration
            </h3>
            <p>
              Boost user engagement with a real-time AI chat powered by OpenAI, offering
              personalized responses, answering questions, and assisting with content creation, all
              while providing real-time support and automation.
            </p>
            <ul className="flex flex-col gap-2">
              <li className="flex items-center gap-4">
                <Check className="stroke-blue-500" /> Real-time chat integration with OpenAI
              </li>
              <li className="flex items-center gap-4">
                <Check className="stroke-blue-500" /> Personalized AI-driven responses
              </li>
              <li className="flex items-center gap-4">
                <Check className="stroke-blue-500" /> Ideal for user support or content creation
                assistance
              </li>
              <li className="flex items-center gap-4">
                <Check className="stroke-blue-500" /> Scalable solution for high user interaction
              </li>
            </ul>
          </div>
        </ScrollAnimate>
      </div>
    </div>
  );
}

export default Features;
