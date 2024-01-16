import {
  createEmpresaAsync,
  getAllEmpresasAsync,
  updateEmpresaAsync,
} from "../redux/slices/empresa.slice";
import { useAppDispatch, useAppSelector } from "../redux/store";

export const useEmpresa = () => {
  const dispatch = useAppDispatch();
  const { empresas, created, updated, isLoading, error } = useAppSelector(
    (state) => state.empresa
  );

  const getAllEmpresas = () => {
    dispatch(getAllEmpresasAsync());
  };

  const createEmpresa = (empresa: Empresa) => {
    return dispatch(createEmpresaAsync(empresa));
  };

  const updateEmpresa = (empresa: Empresa) => {
    return dispatch(updateEmpresaAsync(empresa));
  };

  return {
    getAllEmpresas,
    createEmpresa,
    updateEmpresa,
    empresas,
    created,
    updated,
    isLoading,
    error,
  };
};
