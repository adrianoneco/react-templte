import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, ShieldCheck, Sparkles, Zap, RefreshCw } from "lucide-react";

// ... inside Register component
  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    form.setValue("password", password, { shouldValidate: true });
  };
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";
import { insertUserSchema } from "@shared/schema";

const registerSchema = insertUserSchema.extend({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  surname: z.string().min(2, "O sobrenome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(10, "Número de celular incompleto"),
  password: z.string().min(16, "A senha deve ter pelo menos 16 caracteres"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const { register, isRegistering } = useAuth();
  
  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterForm) => {
    register(data);
  };

  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Lado Esquerdo - Info do App */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-cyan-600 to-teal-700 p-12 flex-col justify-between text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -top-32 -right-32 w-[500px] h-[500px] border-4 border-white/10 rounded-full" 
          />
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl border border-white/30">
              <span className="font-display font-bold text-white text-2xl">N</span>
            </div>
            <span className="font-display font-bold text-3xl tracking-tight">Nexus<span className="text-cyan-200">App</span></span>
          </Link>
        </div>

        <div className="relative z-10 space-y-8 max-w-lg">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-bold leading-tight"
          >
            Faça parte da <span className="text-cyan-300">próxima geração</span> de inovadores.
          </motion.h1>
          <p className="text-xl text-cyan-50/80 leading-relaxed">
            Junte-se a milhares de usuários que já estão otimizando seu fluxo de trabalho conosco.
          </p>
          
          <div className="space-y-6 pt-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-300" />
              </div>
              <span className="text-lg">Recursos exclusivos e modernos</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-cyan-300" />
              </div>
              <span className="text-lg">Controle total sobre seus dados</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-300" />
              </div>
              <span className="text-lg">Integração em tempo real</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-sm text-cyan-100/60">
          <Sparkles className="w-4 h-4" />
          <span>Transformando o amanhã, hoje.</span>
        </div>
      </div>

      {/* Lado Direito - Form de Registro */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background relative overflow-hidden">
        <div className="lg:hidden absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Criar conta</h2>
            <p className="text-muted-foreground">Preencha os dados abaixo para começar</p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Ex: João"
                  className="h-11 shadow-sm"
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-xs text-destructive font-medium">{form.formState.errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Sobrenome</Label>
                <Input
                  id="surname"
                  placeholder="Ex: Silva"
                  className="h-11 shadow-sm"
                  {...form.register("surname")}
                />
                {form.formState.errors.surname && (
                  <p className="text-xs text-destructive font-medium">{form.formState.errors.surname.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="nome@exemplo.com"
                className="h-11 shadow-sm"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-xs text-destructive font-medium">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Celular</Label>
              <PhoneInput
                value={form.watch("phone")}
                onChange={(val) => form.setValue("phone", val, { shouldValidate: true })}
                error={!!form.formState.errors.phone}
              />
              {form.formState.errors.phone && (
                <p className="text-xs text-destructive font-medium">{form.formState.errors.phone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <button
                  type="button"
                  onClick={generatePassword}
                  className="text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  Gerar senha segura
                </button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Crie uma senha forte (min. 16 chars)"
                className="h-11 shadow-sm"
                {...form.register("password")}
              />
              {form.formState.errors.password && (
                <p className="text-xs text-destructive font-medium">{form.formState.errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 mt-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 text-lg font-semibold"
              disabled={isRegistering}
            >
              {isRegistering ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Criando conta...
                </>
              ) : (
                <>
                  Criar Conta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link href="/login" className="font-bold text-primary hover:underline transition-colors">
                Faça login
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
