import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { Button } from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { Input } from "../components/ui/Input";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "../components/ui/Label";

const Login = () => {
  const [togglePass, setTogglePass] = useState(false);
  const navigate = useNavigate();
  const { logIn } = useAuth();

  const [formData, setFormData] = useState({
    // vCodigoEmpresa: "",
    vAliasUsuario: "",
    vClaveUsuario: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await logIn({ authData: formData, navigate });

    if (isRejectedWithValue(result))
      toast.error("Usuario o contraseña incorrectos");
  };

  return (
    <main className="flex flex-col min-h-screen w-full">
      <div className="h-20"></div>
      <section className="flex flex-col items-center">
        <h2 className="text-5xl font-bold pb-4 mt-[12vh]">Iniciar sesión</h2>

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-2 w-full max-w-xs"
        >
          {/* <div>
            <Label>
              Empresa:
            </Label>
            <Input
              type="text"
              name="vCodigoEmpresa"
              value={formData.vCodigoEmpresa}
              onChange={handleInputChange}
              placeholder="Ingresa el código de empresa..."
            />
          </div> */}

          <div>
            <Label>Username:</Label>
            <Input
              type="text"
              name="vAliasUsuario"
              value={formData.vAliasUsuario}
              onChange={handleInputChange}
              placeholder="Ingresa tu código de usuario..."
            />
          </div>

          <div>
            <Label>Password:</Label>
            <div className="relative">
              <Input
                type={togglePass ? "text" : "password"}
                name="vClaveUsuario"
                value={formData.vClaveUsuario}
                onChange={handleInputChange}
                placeholder="Ingresa tu contraseña..."
              />
              <label
                onClick={() => setTogglePass(!togglePass)}
                className="absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer"
              >
                <Eye className={`h-5 w-5 ${togglePass && "hidden"}`} />
                <EyeOff className={`h-5 w-5 ${!togglePass && "hidden"}`} />
              </label>
            </div>
          </div>

          <Button type="submit" className="hover:scale-105 mt-2">
            Login
          </Button>
        </form>
      </section>
    </main>
  );
};

export default Login;
