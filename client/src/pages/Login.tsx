import { LoginForm } from "@/components/login-form";

// Login page that renders the login form
const Login = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        {/* Application logo and name */}
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <span className="text-lg font-bold text-primary-foreground">WF</span>
          </div>
          <span className="hidden font-bold md:inline-block">WiFi Manager</span>
        </a>
        {/* Render the login form */}
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;