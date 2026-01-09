import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, Mail, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Recovery() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      toast({
        title: "E-mail enviado",
        description: "Verifique sua caixa de entrada para continuar.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex bg-background">
      {/* Lado Esquerdo - Info */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-950 p-12 flex-col justify-between text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
              <span className="font-display font-bold text-white text-2xl">N</span>
            </div>
            <span className="font-display font-bold text-3xl tracking-tight text-white">NexusApp</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-6">
          <h1 className="text-4xl font-bold leading-tight">Esqueceu sua senha? <br /><span className="text-teal-400">Não se preocupe.</span></h1>
          <p className="text-lg text-slate-300 max-w-md">O processo de recuperação é rápido e seguro. Em poucos minutos você estará de volta ao seu dashboard.</p>
          
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 max-w-sm">
            <ShieldCheck className="w-6 h-6 text-teal-400" />
            <span className="text-sm">Protocolos de segurança avançados protegem sua conta.</span>
          </div>
        </div>

        <div className="relative z-10 text-slate-500 text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          <span>Sempre aqui para ajudar.</span>
        </div>
      </div>

      {/* Lado Direito - Form de Recuperação */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shadow-inner">
                <Mail className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Recuperar senha</h2>
            <p className="text-muted-foreground">Insira seu e-mail para receber as instruções</p>
          </div>

          <Card className="border-border/50 shadow-xl overflow-hidden">
            <CardContent className="pt-6">
              {isSent ? (
                <div className="text-center py-6 space-y-6">
                  <div className="text-emerald-500 font-semibold bg-emerald-500/10 py-4 rounded-xl border border-emerald-500/20">
                    E-mail enviado com sucesso!
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Enviamos um link de recuperação para <strong>{email}</strong>. 
                    Verifique sua caixa de spam caso não encontre.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full h-11"
                    onClick={() => setIsSent(false)}
                  >
                    Tentar outro e-mail
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Endereço de e-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="nome@exemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 bg-background shadow-sm"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-lg font-semibold shadow-lg shadow-primary/20 transition-all"
                    disabled={isLoading || !email}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      "Enviar Link de Recuperação"
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Link href="/login" className="inline-flex items-center text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o Login
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
