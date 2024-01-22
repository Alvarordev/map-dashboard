import { API } from "./utils";

interface GetAllProps {
  error: any;
  data?: Perfil[] | null;
}

export const getAllPerfil = async (): Promise<GetAllProps> => {
  try {
    const res = await API.get("/perfil", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { error: null, data: res.data };
  } catch (err: any) {
    return { error: err, data: null };
  }
};

export const createPerfil = async (
  perfil: Perfil
): Promise<{ data: Perfil | null; error: any }> => {
  try {
    const res = await API.post("/perfil", perfil, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { error: null, data: res.data };
  } catch (err) {
    return { error: err, data: null };
  }
};

export const updatePerfil = async (
  perfil: Perfil
): Promise<{ data: Perfil | null; error: any }> => {
  try {
    const { iCodPerfil, ...cepoBody } = perfil;

    const res = await API.patch(`/perfil/${iCodPerfil}`, cepoBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { error: null, data: res.data };
  } catch (err) {
    return { error: err, data: null };
  }
};
