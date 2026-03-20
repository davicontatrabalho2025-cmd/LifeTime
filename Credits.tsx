import { ReactNode } from "react";
import { useNavigate, useLocation } from "react-router";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Bell,
  Settings,
  LogOut,
  User,
  Clock,
  LayoutDashboard,
  ShoppingBag,
  GraduationCap,
  HelpCircle,
  Shield,
} from "lucide-react";
import { Badge } from "../ui/badge";

type Props = {
  children: ReactNode;
};

export function AppLayout({ children }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Marketplace", href: "/marketplace", icon: ShoppingBag },
    { name: "Minhas Aulas", href: "/my-classes", icon: GraduationCap },
    { name: "Créditos", href: "/credits", icon: Clock },
    { name: "Suporte", href: "/support", icon: HelpCircle },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg">
                <span className="text-lg">LifeTime</span>
              </div>
            </button>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.name}
                    variant={isActive(item.href) ? "secondary" : "ghost"}
                    onClick={() => navigate(item.href)}
                    className="gap-2"
                  >
                    <Icon className="size-4" />
                    {item.name}
                  </Button>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Credits Badge */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-200">
                <Clock className="size-4 text-blue-600" />
                <span className="text-sm">
                  <strong>5</strong> créditos
                </span>
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="size-5" />
                <Badge className="absolute -top-1 -right-1 size-5 flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="size-8">
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">Meu Perfil</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 size-4" />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/credits")}>
                    <Clock className="mr-2 size-4" />
                    Meus Créditos
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 size-4" />
                    Configurações
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/admin")}>
                    <Shield className="mr-2 size-4" />
                    Painel Admin
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/")}>
                    <LogOut className="mr-2 size-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="md:hidden flex overflow-x-auto pb-2 gap-2 border-t pt-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant={isActive(item.href) ? "secondary" : "ghost"}
                  onClick={() => navigate(item.href)}
                  size="sm"
                  className="gap-2 whitespace-nowrap"
                >
                  <Icon className="size-4" />
                  {item.name}
                </Button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg inline-block mb-4">
                <span className="text-lg">LifeTime</span>
              </div>
              <p className="text-sm text-gray-600">
                Transformando tempo em conhecimento através da economia colaborativa.
              </p>
            </div>
            <div>
              <h4 className="mb-4">Plataforma</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Como funciona
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Torne-se professor
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Encontre aulas
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Suporte</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="/support" className="hover:text-blue-600">
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Privacidade
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4">Comunidade</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Fórum
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    Eventos
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
            © 2026 LifeTime. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
