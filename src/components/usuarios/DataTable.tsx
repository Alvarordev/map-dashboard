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
import { useModal } from "../../context/ModalProvider";
import UsuarioForm from "./UsuarioForm";

const UsuarioDataTable = () => {
  const { usuarios, getAllUsuarios } = useUser();
  const { openModal } = useModal();

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
        <Button size="sm" onClick={() => openModal(<UsuarioForm />)}>
          <span>Registrar Usuario</span>
        </Button>
      </div>
      <Table table={table} />
    </div>
  );
};

export default UsuarioDataTable;
