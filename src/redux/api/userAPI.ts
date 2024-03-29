import { API } from "./utils";

interface GetAllProps {
  error: any;
  data?: Usuario[] | null;
}

export const getAllUsers = async (): Promise<GetAllProps> => {
  try {
    const res = await API.get("/usuarios", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { error: null, data: res.data };
  } catch (err: any) {
    return { error: err, data: null };
  }
};

export const createUser = async (user: Usuario): Promise<{data: Usuario | null, error: any}> => {
  try {
    const res = await API.post("/usuarios", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { error: null, data: res.data };
  } catch (err) {
    return { error: err, data: null };
  }
};

export const updateUser = async (user: Usuario): Promise<{data: Usuario | null, error: any}> => {
  try {
    const {iCodUsuario, ...userBody} = user 

    const res = await API.patch(`/usuarios/${iCodUsuario}`, userBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { error: null, data: res.data };
  } catch (err) {
    return { error: err, data: null };
  }
};
