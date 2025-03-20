import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useMsal } from '@azure/msal-react';
import { loginRequest } from "@/config/authConfig";
import { useNavigate, redirect } from "react-router-dom";
import { useEffect } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { instance, accounts } = useMsal();

  const navigate = useNavigate();

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      // Se l'utente è già autenticato, reindirizza alla pagina voucher-list
      navigate('/voucher-list');
    }
  }, [accounts, navigate]);

  const handleLogin = async () => {
    try {
      const response = await instance.loginPopup(loginRequest);
      console.log('Login successful', response);
      navigate("/voucher-generator");
    } catch (error) {
      console.error(error);
    }
  };




  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Microsoft account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full" onClick={handleLogin}>
                  <svg xmlns="http://www.w3.org/2000/svg">
                    <g fill="currentColor">
                      <rect width="7" height="7"  />
                      <rect x="8" width="7" height="7"  />
                      <rect y="8" width="7" height="7"  />
                      <rect x="8" y="8" width="7" height="7"  />
                    </g>
                  </svg>
                  Login with Microsoft
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
