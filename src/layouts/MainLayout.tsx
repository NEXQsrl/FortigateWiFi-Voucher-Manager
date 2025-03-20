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

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    const pathname = window.location.pathname;
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <span className="text-lg font-bold text-primary-foreground">WF</span>
            </div>
            <span className="hidden font-bold md:inline-block">WiFi Manager</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-6 w-6" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="hidden text-sm font-medium md:inline-block">Admin User</span>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-14 border-r bg-muted/40 md:w-64">
          <nav className="flex flex-col gap-2 p-2">
            <Link to="/voucher-list">
              <Button variant={pathname === "/vouchers" ? "secondary" : "ghost"} className="w-full justify-start">
                <Ticket className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline-block">Voucher List</span>
              </Button>
            </Link>
            <Link to="/voucher-generator">
              <Button
                variant={pathname === "/vouchers/generate" ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <LayoutDashboard className="h-5 w-5 md:mr-2" />
                <span className="hidden md:inline-block">Generate Voucher</span>
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
