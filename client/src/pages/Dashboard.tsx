import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/use-auth";
import { useSocket } from "@/hooks/use-socket";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, CreditCard, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    description: "+20.1% from last month",
    icon: DollarSign,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Subscriptions",
    value: "+2350",
    description: "+180.1% from last month",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Sales",
    value: "+12,234",
    description: "+19% from last month",
    icon: CreditCard,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Active Now",
    value: "+573",
    description: "+201 since last hour",
    icon: Activity,
    color: "text-rose-500",
    bg: "bg-rose-500/10",
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { isConnected } = useSocket();

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user?.name}! Here's what's happening today.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border shadow-sm w-fit">
            <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-xs font-medium text-muted-foreground">
              {isConnected ? 'System Online' : 'Connecting...'}
            </span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 border-muted/60">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-display">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 border-muted/60">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                Monthly revenue performance
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg border-muted m-4">
                Chart Placeholder
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-3 border-muted/60">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest user actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div className="flex items-center" key={item}>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        User {item} logged in
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item} minutes ago
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-xs text-primary">
                      +20 pts
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
