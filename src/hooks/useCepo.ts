import { createCepoAsync, getAllCeposAsync } from "../redux/slices/cepo.slice";
import { useAppDispatch, useAppSelector } from "../redux/store";

export const useCepo = () => {
  const dispatch = useAppDispatch();
  const { cepos, created, isLoading, error } = useAppSelector((state) => state.cepo);

  const getAllCepos = () => {
    dispatch(getAllCeposAsync());
  };

  const createCepo = (cepo: Tipocepo) => {
    return dispatch(createCepoAsync(cepo))
  }

  return { getAllCepos, createCepo , cepos, created, isLoading, error };
};
