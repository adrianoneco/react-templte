import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock, ArrowRight, ShieldCheck, Sparkles, Zap, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const loginSchema = z.object({
  username: z.string().email("Por favor, insira um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const { login, isLoggingIn } = useAuth();
  const [, setLocation] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginForm) => {
    login(data, {
      onSuccess: () => setLocation("/"),
    });
  };

  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Lado Esquerdo - Info do App */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-violet-600 to-blue-700 p-12 flex-col justify-between text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-24 -left-24 w-96 h-96 border-4 border-white/10 rounded-full" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-48 -right-48 w-[600px] h-[600px] border-4 border-white/5 rounded-full" 
          />
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl border border-white/30">
              <span className="font-display font-bold text-white text-2xl">N</span>
            </div>
            <span className="font-display font-bold text-3xl tracking-tight">Nexus<span className="text-violet-200">App</span></span>
          </Link>
        </div>

        <div className="relative z-10 space-y-8 max-w-lg">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold leading-tight"
          >
            Sua jornada para o <span className="text-violet-300">próximo nível</span> começa aqui.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-violet-50/80 leading-relaxed"
          >
            Gerencie seus projetos com a velocidade da luz e a segurança que você merece. A plataforma completa para o seu sucesso.
          </motion.p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <Zap className="w-6 h-6 text-violet-300 shrink-0" />
              <div>
                <h3 className="font-semibold">Performance</h3>
                <p className="text-sm text-violet-50/60">Interface ultra rápida e responsiva.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <ShieldCheck className="w-6 h-6 text-violet-300 shrink-0" />
              <div>
                <h3 className="font-semibold">Segurança</h3>
                <p className="text-sm text-violet-50/60">Seus dados protegidos de ponta a ponta.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm text-violet-100/60">
          <Sparkles className="w-4 h-4" />
          <span>© 2026 NexusApp Technologies. Todos os direitos reservados.</span>
        </div>
      </div>

      {/* Lado Direito - Form de Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background relative overflow-hidden">
        <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Bem-vindo de volta</h2>
            <p className="text-muted-foreground">Insira suas credenciais para acessar sua conta</p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@exemplo.com"
                  className="pl-9 h-12 bg-background border-input focus:border-primary transition-all duration-200 shadow-sm"
                  {...form.register("username")}
                />
              </div>
              {form.formState.errors.username && (
                <p className="text-xs text-destructive font-medium ml-1">
                  {form.formState.errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <Link href="/recovery" className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-9 h-12 bg-background border-input focus:border-primary transition-all duration-200 shadow-sm pr-10"
                  {...form.register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-muted-foreground hover:text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {form.formState.errors.password && (
                <p className="text-xs text-destructive font-medium ml-1">
                  {form.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2 py-1">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
              >
                Lembrar de mim por 30 dias
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-300 text-lg font-semibold"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  Entrar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{" "}
              <Link href="/register" className="font-bold text-primary hover:underline transition-colors">
                Crie uma agora
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
