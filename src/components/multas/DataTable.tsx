import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Badge } from "../ui/Badge";
import { useMulta } from "../../hooks/useMulta";
import { Input } from "../ui/Input";

const MultaDataTable = () => {
  const { multas, getAllMultas } = useMulta();

  useEffect(() => {
    getAllMultas();
  }, []);

  const columns: ColumnDef<Multa>[] = [
    {
      header: "Id",
      accessorKey: "iCodMulta",
    },
    {
      header: "Placa Auto",
      accessorKey: "vPlacaAuto",
      cell: ({ row }) => {
        return (
          <div className={`text-center`}>{row.getValue("vPlacaAuto")}</div>
        );
      },
    },
    {
      header: "Estado",
      accessorKey: "bEstadoRegistro",
      cell: ({ row }) => {
        const estado = row.getValue("bEstadoRegistro");

        return (
          <div className={`text-center py-2`}>
            <Badge className={`${estado ? "bg-red-500" : "bg-emerald-500"}`}>
              {estado ? "bloqueado" : "liberado"}
            </Badge>
          </div>
        );
      },
    },
    {
      header: "Proforma",
      accessorKey: "vCodigoPreliquidacion",
    },
    {
      header: "Tipo auto",
      accessorKey: "iCodTipoCepo",
      cell: ({ row }) => {
        const tipo = row.getValue("iCodTipoCepo");

        return (
          <div className={`text-center`}>
            <Badge className={`${tipo ? "bg-blue-600" : "bg-orange-600"}`}>
              {tipo === 1 ? "liviano" : "pesado"}
            </Badge>
          </div>
        );
      },
    },
    {
      header: "Dirección",
      accessorKey: "vDireccionMulta",
    },
    {
      header: "Fecha bloqueo",
      accessorKey: "dtFechaBloqueo",
      cell: ({ row }) => {
        const formattedDate = new Date(
          row.getValue("dtFechaBloqueo")
        ).toLocaleString("es-ES");

        return <div className={`text-center`}>{formattedDate}</div>;
      },
    },
    {
      header: "Usuario Bloqueo",
      accessorKey: "usuariobloqueo.vAliasUsuario",
    },
    {
      header: "Fecha Liberado",
      accessorKey: "dtFechaDesbloqueo",
      cell: ({ row }) => {
        const formattedDate = new Date(
          row.getValue("dtFechaDesbloqueo")
        ).toLocaleString("es-ES");

        return <div className={`text-center`}>{formattedDate}</div>;
      },
    },
    {
      header: "Usuario Libera",
      accessorKey: "usuariodesbloqueo.vAliasUsuario",
    },
  ];

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: multas,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  return (
    <div className="relative w-full ">
      <div className="flex items-center gap-6 mb-3">
        <div className="flex w-full items-center gap-2">
          <span>Buscar por:</span>

          <Input
            placeholder="Filtrar por placa..."
            value={
              (table.getColumn("vPlacaAuto")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("vPlacaAuto")?.setFilterValue(event.target.value)
            }
            className="max-w-xs h-8"
          />

          <select
            className="flex h-8 rounded-sm border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
            onChange={(event) =>
              table
                .getColumn("bEstadoRegistro")
                ?.setFilterValue(
                  event.target.value === "true"
                    ? true
                    : event.target.value === "false"
                    ? false
                    : table.getColumn("iCodMultas")?.getFilterValue()
                )
            }
          >
            <option value="default">Estado de cepo</option>
            <option value="true">bloqueado</option>
            <option value="false">liberado</option>
          </select>

          <div className="flex gap-2 items-center px-4">
            <span>Desde:</span>
            <Input type="date" className="max-w-36" />
          </div>

          <div className="flex gap-2 items-center">
            <span>Hasta:</span>
            <Input type="date" className="max-w-36" />
          </div>
        </div>
      </div>

      <table className="w-full caption-bottom text-sm">
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

export default MultaDataTable;
