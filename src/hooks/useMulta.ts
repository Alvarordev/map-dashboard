import {
  createMultaAsync,
  getAllMultasAsync,
} from "../redux/slices/multa.slice";
import { useAppDispatch, useAppSelector } from "../redux/store";

export const useMulta = () => {
  const dispatch = useAppDispatch();
  const { multas, created, isLoading, error } = useAppSelector(
    (state) => state.multa
  );

  const getAllMultas = () => {
    dispatch(getAllMultasAsync());
  };

  const createMulta = (multa: Multa) => {
    return dispatch(createMultaAsync(multa));
  };

  return { getAllMultas, createMulta, multas, created, isLoading, error };
};
