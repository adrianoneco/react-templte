import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneInput } from "@/components/ui/phone-input";
import { insertUserSchema } from "@shared/schema";

// Extend the shared schema if necessary or use it directly
// We need to refine the schema to ensure password match if we had a confirm password field
const registerSchema = insertUserSchema.extend({
  // Override phone to be just a string, we validate format manually via component and backend
  phone: z.string().min(10, "Phone number is incomplete"),
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
      phone: "", // Will hold CC + digits
      password: "",
    },
  });

  const onSubmit = (data: RegisterForm) => {
    // Phone data is already formatted as CC + digits by the PhoneInput component
    // We can send it directly
    register(data);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-slate-950 dark:to-slate-900 p-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        <Card className="border-border/50 shadow-2xl backdrop-blur-sm bg-card/90">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold tracking-tight">Create an Account</CardTitle>
            <CardDescription className="text-base">
              Join thousands of users on NexusApp
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="John"
                    className="h-11 bg-background/50 border-input/50 focus:border-primary"
                    {...form.register("name")}
                  />
                  {form.formState.errors.name && (
                    <p className="text-xs text-destructive font-medium">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="surname">Surname</Label>
                  <Input
                    id="surname"
                    placeholder="Doe"
                    className="h-11 bg-background/50 border-input/50 focus:border-primary"
                    {...form.register("surname")}
                  />
                  {form.formState.errors.surname && (
                    <p className="text-xs text-destructive font-medium">
                      {form.formState.errors.surname.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-11 bg-background/50 border-input/50 focus:border-primary"
                  {...form.register("email")}
                />
                {form.formState.errors.email && (
                  <p className="text-xs text-destructive font-medium">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Phone</Label>
                <PhoneInput
                  value={form.watch("phone")}
                  onChange={(val) => {
                    form.setValue("phone", val, { shouldValidate: true });
                  }}
                  error={!!form.formState.errors.phone}
                />
                {form.formState.errors.phone && (
                  <p className="text-xs text-destructive font-medium">
                    {form.formState.errors.phone.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Select country flag and enter number. Format required.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="h-11 bg-background/50 border-input/50 focus:border-primary"
                  {...form.register("password")}
                />
                {form.formState.errors.password && (
                  <p className="text-xs text-destructive font-medium">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-11 mt-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 transition-all duration-300 text-lg font-semibold"
                disabled={isRegistering}
              >
                {isRegistering ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Register
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 text-center border-t bg-muted/20 p-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-primary hover:underline hover:text-primary/80 transition-colors">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
