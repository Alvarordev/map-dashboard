import { API } from "./utils";

interface GetAllProps {
  error: any;
  data?: Multa[] | null;
}

export const getAllMultas = async (): Promise<GetAllProps> => {
  try {
    const res = await API.get("/multa", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { error: null, data: res.data };
  } catch (err: any) {
    return { error: err, data: null };
  }
};

export const createMulta = async (
  multa: Multa
): Promise<{ data: Multa | null; error: any }> => {
  try {
    const res = await API.post("/multa", multa, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { error: null, data: res.data };
  } catch (err) {
    return { error: err, data: null };
  }
};

export const updateMulta = async (
  multa: Multa
): Promise<{ data: Multa | null; error: any }> => {
  try {
    const { iCodMulta, ...multaBody } = multa;

    const res = await API.patch(`/multa/${iCodMulta}`, multaBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { error: null, data: res.data };
  } catch (err) {
    return { error: err, data: null };
  }
};
