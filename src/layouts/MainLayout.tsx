import { ReactNode } from "react";
import { Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Ticket, UserCircle } from "lucide-react"
import { useMsal } from "@azure/msal-react";  // Importa useMsal per gestire il logout

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const pathname = window.location.pathname;

     // Usa il hook useMsal per ottenere l'istanza MSAL
    const { instance } = useMsal();
    
    // Usa useMsal per ottenere l'istanza MSAL e gli account dell'utente
    const { accounts } = useMsal(); // Accedi direttamente agli account

    // Estrai il display name dall'account dell'utente loggato
    const userName = accounts.length > 0 ? accounts[0]?.name : "User";  // Se l'utente è loggato, mostra il nome

    // Funzione per ottenere le iniziali
    const getInitials = (name: string) => {
      const nameParts = name.split(" ");
      const initials = nameParts.length > 1
        ? nameParts[0][0] + nameParts[1][0]  // Per nome completo
        : nameParts[0][0];  // Solo il primo nome
      return initials.toUpperCase();
    };

    // Funzione per gestire il logout
    const handleLogout = () => {
      instance.logoutRedirect({
        postLogoutRedirectUri: window.location.origin,  // Redirigi alla home dopo il logout
      });
    };

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={import.meta.env.VITE_LOGO_URL}  // Usa l'URL dell'immagine dal file .env
              alt="Logo"
              className="h-auto w-[80px] object-contain"
            />
            
            <span className="hidden font-bold md:inline-block">{import.meta.env.VITE_NAME}</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                {/* Icona con le iniziali */}
                <div className="h-8 w-8 bg-primary text-white flex items-center justify-center rounded-md">
                  {getInitials(userName || "User")}
                </div>
                <span className="sr-only">User menu</span>
              </Button>
            
              {/*<Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-6 w-6" />
                <span className="sr-only">User menu</span>
              </Button>*/}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/*<DropdownMenuItem>Profile</DropdownMenuItem>*/}
              {/*<DropdownMenuItem>Settings</DropdownMenuItem>*/}
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="hidden text-sm font-medium md:inline-block">{userName}</span>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-14 border-r bg-muted/40 md:w-64">
          <nav className="flex flex-col gap-2 p-2">
            <Link to="/voucher-generator">
              <Button
                variant={pathname === "/vouchers/generate" ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <LayoutDashboard className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline-block">Generate Voucher</span>
              </Button>
            </Link>
            <Link to="/voucher-list">
              <Button variant={pathname === "/vouchers" ? "secondary" : "ghost"} className="w-full justify-start">
                <Ticket className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline-block">Voucher List</span>
              </Button>
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
