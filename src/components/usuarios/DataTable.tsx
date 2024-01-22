import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
  } from "@tanstack/react-table";
  import { useEffect } from "react";
  import { Button } from "../ui/Button";
  import Table from "../ui/Table";
  import { columns } from "./Columns";
import { useUser } from "../../hooks/useUser";
  
  const UsuarioDataTable = () => {
    const { usuarios, getAllUsuarios } = useUser();
  
    useEffect(() => {
      getAllUsuarios();
    }, []);
  
    const table = useReactTable({
      data: usuarios,
      columns: columns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
    });
  
    return (
      <div className="relative w-full ">
        <div className="flex items-center gap-6 mb-3">
          <Button size="sm">
            <span>Registrar Perfil</span>
          </Button>
        </div>
        <Table table={table} />
      </div>
    );
  };
  
  export default UsuarioDataTable;
  