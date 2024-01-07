import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vAliasUsuario: username,
          vClaveUsuario: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const authToken = data.access_token;
      console.log("Token:", authToken);

      // Almacenar el token en localStorage, Vuex, cookies, etc.
      localStorage.setItem("authToken", authToken);

      // Redirigir o realizar otras acciones después del inicio de sesión
      navigate('/ds/dashboard');
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      // Manejar errores, mostrar mensajes al usuario, etc.
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-2xl font-semibold pb-4">Login</h2>

      <form onSubmit={login} className="flex flex-col w-full max-w-xs">
        <label className="mb-2">Username:</label>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 mb-4 border-2 border-gray-500"
        />

        <label className="mb-2">Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-4 border-2 border-gray-500"
        />

        <button
          type="submit"
          className="p-2.5 bg-blue-500 text-white cursor-pointer hover:scale-105 transition-all"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
