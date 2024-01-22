import { API } from "./utils";

interface GetAllProps {
  error: any;
  data?: Empresa[] | null;
}

export const getAllEmpresas = async (): Promise<GetAllProps> => {
  try {
    const res = await API.get("/empresa", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { error: null, data: res.data };
  } catch (err: any) {
    return { error: err, data: null };
  }
};

export const createEmpresa = async (empresa: Empresa): Promise<{data: Empresa | null, error: any}> => {
  try {
    const res = await API.post("/empresa", empresa, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { error: null, data: res.data };
  } catch (err) {
    return { error: err, data: null };
  }
};

export const updateEmpresa = async (empresa: Empresa): Promise<{data: Empresa | null, error: any}> => {
  try {
    const {iCodEmpresa, ...cepoBody} = empresa 

    const res = await API.patch(`/empresa/${iCodEmpresa}`, cepoBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { error: null, data: res.data };
  } catch (err) {
    return { error: err, data: null };
  }
};
