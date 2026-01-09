import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Menu, User as UserIcon, LogOut, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const { user, logout } = useAuth();
  
  const initials = user 
    ? `${user.name[0]}${user.surname[0]}`.toUpperCase() 
    : "U";

  return (
    <header className="fixed top-0 left-0 right-0 h-16 border-b bg-background/80 backdrop-blur-md z-40 px-4 md:px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground">
          <Menu className="w-5 h-5" />
        </Button>
        
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/20 group-hover:shadow-teal-500/40 transition-all duration-300">
            <span className="font-display font-bold text-white text-lg">N</span>
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-foreground hidden sm:block">
            Nexus<span className="text-primary">App</span>
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="hidden md:flex items-center relative w-64 lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            placeholder="Pesquisar..." 
            className="w-full bg-muted/50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:bg-background transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-primary transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background animate-pulse" />
          </Button>

          <div className="h-8 w-px bg-border hidden sm:block mx-2" />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 outline-none group">
                <div className="hidden md:flex flex-col items-end mr-1">
                  <span className="text-sm font-semibold leading-none group-hover:text-primary transition-colors">
                    {user?.name} {user?.surname}
                  </span>
                  <span className="text-xs text-muted-foreground">Administrador</span>
                </div>
                <Avatar className="h-9 w-9 border-2 border-transparent group-hover:border-primary transition-all duration-200">
                  <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.name}+${user?.surname}&background=0D9488&color=fff`} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Configurações</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive cursor-pointer"
                onClick={() => logout()}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
