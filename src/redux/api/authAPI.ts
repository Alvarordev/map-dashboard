import { API } from "./utils";

export interface AuthData {
  vAliasUsuario: string;
  vClaveUsuario: string;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

interface LoginResult {
  error: any;
  data?: LoginResponse | null;
}

export const logIn = async (authData: AuthData): Promise<LoginResult> => {
  try {
    const res = await API.post("/auth/login", authData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { error: null, data: res.data };
  } catch (err: any) {
    return {error: err, data: null}
  }
};
