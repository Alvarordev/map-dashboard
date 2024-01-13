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

interface DateFilter {
  startDate: string;
  endDate: string;
}

const MultaDataTable = () => {
  const { multas, getAllMultas } = useMulta();

  useEffect(() => {
    getAllMultas();
  }, []);

  const columns: ColumnDef<Multa>[] = [
    {
      header: "Id",
      accessorKey: "iCodMulta",
      cell: ({ row }) => {
        return (
          <div className={`text-center min-w-4`}>{row.getValue("iCodMulta")}</div>
        );
      },
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
      header: "Tipo auto",
      accessorKey: "tipocepo.vDescripcionCepo",
      cell: ({ row }) => {
        return (
          <div className={`text-center`}>
            <Badge className={`bg-blue-600`}>
              {row.original.tipocepo.vDescripcionCepo}
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
      header: "Concepto",
      accessorKey: "vConceptoMulta",
    },
    {
      header: "Costo",
      accessorKey: "tipocepo.vCostoCepo",
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
  ];

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: multas,
    columns,
    filterFns: {
      dateFilter: (row, columnId, filterValue) => {
        const { startDate, endDate } = filterValue || ({} as DateFilter);
        const fecha = row.original[columnId];
        const fechaBloqueo = new Date(fecha);

        if (!startDate && !endDate) {
          return true;
        }

        if (startDate && endDate) {
          return (
            fechaBloqueo >= new Date(startDate) &&
            fechaBloqueo <= new Date(endDate)
          );
        }

        if (startDate) {
          return fechaBloqueo >= new Date(startDate);
        }

        if (endDate) {
          return fechaBloqueo <= new Date(endDate);
        }

        return true;
      },
    },
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const handleDateChange = (startDate: string, endDate: string) => {
    const dateFilter: DateFilter = { startDate, endDate };
    table.getColumn("dtFechaBloqueo")?.setFilterValue(dateFilter);
  };

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
            <Input
              type="date"
              className="max-w-36"
              onChange={(event) => {
                const dateFilter = table
                  .getColumn("dtFechaBloqueo")
                  ?.getFilterValue() as DateFilter | undefined;
                const startDate = event.target.value;
                const endDate = dateFilter?.endDate;
                handleDateChange(startDate, endDate || "");
              }}
            />
          </div>

          <div className="flex gap-2 items-center">
            <span>Hasta:</span>
            <Input
              type="date"
              className="max-w-36"
              onChange={(event) => {
                const dateFilter = table
                  .getColumn("dtFechaBloqueo")
                  ?.getFilterValue() as DateFilter | undefined;
                const startDate = dateFilter?.startDate;
                const endDate = event.target.value;
                handleDateChange(startDate || "", endDate);
              }}
            />
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
