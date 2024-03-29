import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useEffect } from "react";
import { Button } from "../ui/Button";
import Table from "../ui/Table";
import { usePerfil } from "../../hooks/usePerfil";
import { columns } from "./Columns";
import { useModal } from "../../context/ModalProvider";
import PerfilForm from "./PerfilForm";

const PerfilDataTable = () => {
  const { perfiles, getAllPerfiles } = usePerfil();
  const { openModal } = useModal();

  useEffect(() => {
    getAllPerfiles();
  }, []);

  const table = useReactTable({
    data: perfiles,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="relative w-full ">
      <div className="flex items-center gap-6 mb-3">
        <Button size="sm" onClick={() => openModal(<PerfilForm />)}>
          <span>Registrar Perfil</span>
        </Button>
      </div>
      <Table table={table} />
    </div>
  );
};

export default PerfilDataTable;
