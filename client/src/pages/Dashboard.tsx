import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/hooks/use-auth";
import { useSocket } from "@/hooks/use-socket";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Users, CreditCard, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Receita Total",
    value: "R$ 45.231,89",
    description: "+20.1% em relação ao mês passado",
    icon: DollarSign,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Assinaturas",
    value: "+2350",
    description: "+180.1% em relação ao mês passado",
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Vendas",
    value: "+12.234",
    description: "+19% em relação ao mês passado",
    icon: CreditCard,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
  {
    title: "Ativos Agora",
    value: "+573",
    description: "+201 desde a última hora",
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
            <h2 className="text-3xl font-bold tracking-tight">Olá, {user?.name}! 👋</h2>
            <p className="text-muted-foreground">Aqui está o que está acontecendo com seus projetos hoje.</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border shadow-sm w-fit">
            <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-xs font-medium text-muted-foreground">
              {isConnected ? 'Sistema Online' : 'Conectando...'}
            </span>
            <span className="text-[10px] text-muted-foreground/50 ml-2 border-l pl-2">
              {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover-elevate border-muted/60">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-1">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className={stat.bg + " p-2 rounded-lg"}>
                    <stat.icon className={"h-4 w-4 " + stat.color} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold font-display">{stat.value}</div>
                  <p className="text-xs text-muted-foreground pt-1">
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
              <CardTitle>Visão Geral</CardTitle>
              <CardDescription>Desempenho mensal de receita</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg border-muted m-4">
                Gráfico de atividades virá aqui
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3 border-muted/60">
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
              <CardDescription>
                Últimas ações dos usuários
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center font-bold text-xs">
                      U{i}
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Usuário {i} fez login</p>
                      <p className="text-xs text-muted-foreground">
                        há {i} minutos
                      </p>
                    </div>
                    <div className="ml-auto font-medium text-xs text-primary">+20 pts</div>
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
