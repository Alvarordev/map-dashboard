import {
  createPerfilAsync,
  getAllPerfilesAsync,
  updatePerfilAsync,
} from "../redux/slices/perfil.slice";
import { useAppDispatch, useAppSelector } from "../redux/store";

export const usePerfil = () => {
  const dispatch = useAppDispatch();
  const { perfiles, created, updated, isLoading, error } = useAppSelector(
    (state) => state.perfil
  );

  const getAllPerfiles = () => {
    dispatch(getAllPerfilesAsync());
  };

  const createPerfil = (perfil: Perfil) => {
    return dispatch(createPerfilAsync(perfil));
  };

  const updatePerfil = (perfil: Perfil) => {
    return dispatch(updatePerfilAsync(perfil));
  };

  return {
    getAllPerfiles,
    createPerfil,
    updatePerfil,
    perfiles,
    created,
    updated,
    isLoading,
    error,
  };
};
