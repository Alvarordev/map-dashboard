import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useEffect } from "react";
import { Button } from "../ui/Button";
import Table from "../ui/Table";
import { useEmpresa } from "../../hooks/useEmpresa";
import { columns } from "./Columns";

const EmpresaDataTable = () => {
  const { empresas, getAllEmpresas } = useEmpresa();

  useEffect(() => {
    getAllEmpresas();
  }, []);

  const table = useReactTable({
    data: empresas,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="relative w-full ">
      <div className="flex items-center gap-6 mb-3">
        <Button size="sm">
          <span>Registrar Empresa</span>
        </Button>
      </div>
      <Table table={table} />
    </div>
  );
};

export default EmpresaDataTable;
