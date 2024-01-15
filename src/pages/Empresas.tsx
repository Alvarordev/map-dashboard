import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";

const Empresas = () => {
  const [theme, setTheme] = useState("0 0% 100%");

  useEffect(() => {
    document.documentElement.style.setProperty("--background", theme);
  }, [theme]);

  const setColor = () => {
    setTheme("224, 89%, 55%");
  };

  return (
    <div className="flex flex-col">
      <span>Empresas</span>

      <Button onClick={setColor}>Cambiar color a azul</Button>
    </div>
  );
};

export default Empresas;
