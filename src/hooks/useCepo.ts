import { createCepoAsync, getAllCeposAsync, updateCepoAsync } from "../redux/slices/cepo.slice";
import { useAppDispatch, useAppSelector } from "../redux/store";

export const useCepo = () => {
  const dispatch = useAppDispatch();
  const { cepos, created, updated, isLoading, error } = useAppSelector((state) => state.cepo);

  const getAllCepos = () => {
    dispatch(getAllCeposAsync());
  };

  const createCepo = (cepo: Tipocepo) => {
    return dispatch(createCepoAsync(cepo))
  }

  const updateCepo = (cepo: Tipocepo) => {
    return dispatch(updateCepoAsync(cepo))
  }

  return { getAllCepos, createCepo, updateCepo , cepos, created, updated, isLoading, error };
};
