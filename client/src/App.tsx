import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  useEffect(() => {
    document.title = import.meta.env.VITE_NAME || "Default Title";
  }, []);

  return <AppRoutes />;
};

export default App;
