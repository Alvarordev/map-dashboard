import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { loginAsync } from "../redux/slices/auth.slice";
import { toast } from "sonner";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const authData = {
      vAliasUsuario: username,
      vClaveUsuario: password,
    };

    const result = await dispatch(loginAsync({ authData, navigate }));

    if (result.type.includes("rejected")) toast.error('Usuario o contraseña incorrectos');
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
