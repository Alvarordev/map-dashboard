import EmpresaDataTable from "../components/empresas/DataTable";
import Header from "../components/ui/Header";

const Empresas = () => {
  return (
    <>
      <Header title="Administarar Empresas" />

      <EmpresaDataTable />
    </>
  );
};

export default Empresas;
