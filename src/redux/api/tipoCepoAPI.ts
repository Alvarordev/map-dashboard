import { API } from "./utils";

interface GetAllProps {
  error: any;
  data?: Tipocepo[] | null;
}

export const getAllMultas = async (): Promise<GetAllProps> => {
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
