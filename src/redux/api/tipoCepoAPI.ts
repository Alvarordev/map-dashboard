import { API } from "./utils";

interface GetAllProps {
  error: any;
  data?: Tipocepo[] | null;
}

export const getAllCepos = async (): Promise<GetAllProps> => {
  try {
    const res = await API.get("/tipocepo", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { error: null, data: res.data };
  } catch (err: any) {
    return { error: err, data: null };
  }
};

export const createCepo = async (cepo: Tipocepo): Promise<{data: Tipocepo | null, error: any}> => {
  try {
    const res = await API.post("/tipocepo", cepo, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { error: null, data: res.data };
  } catch (err) {
    return { error: err, data: null };
  }
};

export const updateCepo = async (cepo: Tipocepo): Promise<{data: Tipocepo | null, error: any}> => {
  try {
    const res = await API.patch("/tipocepo", cepo, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { error: null, data: res.data };
  } catch (err) {
    return { error: err, data: null };
  }
};
