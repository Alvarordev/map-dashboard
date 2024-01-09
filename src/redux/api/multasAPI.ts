import { API } from "./utils";

export const getMultas = async () => {
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
