import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { Button } from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { logIn } = useAuth();

  const [formData, setFormData] = useState({
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
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-2xl font-semibold pb-4">Login</h2>

      <form onSubmit={handleLogin} className="flex flex-col w-full max-w-xs">
        <label className="mb-2">Username:</label>
        <input
          type="text"
          name="vAliasUsuario"
          value={formData.vAliasUsuario}
          onChange={handleInputChange}
          className="p-2 mb-4 border-2 border-gray-500"
        />

        <label className="mb-2">Password:</label>
        <input
          type="password"
          name="vClaveUsuario"
          value={formData.vClaveUsuario}
          onChange={handleInputChange}
          className="p-2 mb-4 border-2 border-gray-500"
        />

        <Button type="submit" className="hover:scale-105">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
