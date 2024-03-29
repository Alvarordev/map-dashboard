import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columns } from "./Columns";
import { useCepo } from "../../hooks/useCepo";
import { useEffect } from "react";
import { Button } from "../ui/Button";
import { useModal } from "../../context/ModalProvider";
import CepoForm from "./CepoForm";
import Table from "../ui/Table";

const CepoDataTable = () => {
  const { cepos, getAllCepos } = useCepo();
  const { openModal } = useModal();

  useEffect(() => {
    getAllCepos();
  }, []);

  const table = useReactTable({
    data: cepos,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="relative w-full ">
      <div className="flex items-center gap-6 mb-3">
        <Button size="sm" onClick={() => openModal(<CepoForm />)}>
          <span>Registrar Cepo</span>
        </Button>
      </div>
      <Table table={table} />
    </div>
  );
};

export default CepoDataTable;
