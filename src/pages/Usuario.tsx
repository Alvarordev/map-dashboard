import Header from "../components/ui/Header";
import UsuarioDataTable from "../components/usuarios/DataTable";

const Usuario = () => {
  return (
    <>
      <Header title="Administar usuarios" />

      <UsuarioDataTable />
    </>
  );
};

export default Usuario;
