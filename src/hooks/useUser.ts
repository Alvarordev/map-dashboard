import {
  createUsuarioAsync,
  getAllUsuariosAsync,
  updateUsuarioAsync,
} from "../redux/slices/user.slice";
import { useAppDispatch, useAppSelector } from "../redux/store";

export const useUser = () => {
  const dispatch = useAppDispatch();
  const { usuarios, created, updated, isLoading, error } = useAppSelector(
    (state) => state.usuario
  );

  const getAllUsuarios = () => {
    dispatch(getAllUsuariosAsync());
  };

  const createUsuario = (usuario: Usuario) => {
    return dispatch(createUsuarioAsync(usuario));
  };

  const updateUsuario = (usuario: Usuario) => {
    return dispatch(updateUsuarioAsync(usuario));
  };

  return {
    getAllUsuarios,
    createUsuario,
    updateUsuario,
    usuarios,
    created,
    updated,
    isLoading,
    error,
  };
};
