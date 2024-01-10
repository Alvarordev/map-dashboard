import { getAllMultasAsync } from "../redux/slices/multa.slice";
import { useAppDispatch, useAppSelector } from "../redux/store";

export const useMulta = () => {
  const dispatch = useAppDispatch();
  const { multas, isLoading, error } = useAppSelector((state) => state.multa);

  const getAllMultas = () => {
    dispatch(getAllMultasAsync());
  };

  return { getAllMultas, multas, isLoading, error };
};
