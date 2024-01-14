import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { columns } from "./Columns";
import { useCepo } from "../../hooks/useCepo";
import { useEffect } from "react";
import { Button } from "../ui/Button";
import { useModal } from "../../context/ModalProvider";
import CepoForm from "./CepoForm";

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
      <table className="w-full caption-bottom text-sm border text-center">
        <thead className="[&_tr]:border-b [&_tr]:border-t">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="[&_tr:last-child]:border-0">
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={index % 2 === 0 ? "bg-background" : "bg-muted"}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CepoDataTable;
