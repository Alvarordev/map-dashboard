import {
  useReactTable,
  getCoreRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useMulta } from "../../hooks/useMulta";
import { Input } from "../ui/Input";
import { columns } from "./Columns";
import Table from "../ui/Table";
import MultaProgressBar from "./MultaChart";

interface DateFilter {
  startDate: string;
  endDate: string;
}

const MultaDataTable = () => {
  const { multas, getAllMultas } = useMulta();
  const [totalMultas, setTotalMultas] = useState<number | null>(null);

  useEffect(() => {
    getAllMultas();
  }, []);

  useEffect(() => {
    if (multas) {
      let sum = 0;

      multas.map((multa) => {
        sum += +multa.tipocepo.vCostoCepo;
      });

      setTotalMultas(sum);
    }
  }, [multas]);

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
    <div className="relative w-full">
      <div>
        <MultaProgressBar total={totalMultas} multas={multas}/>
      </div>

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

      <Table table={table} />
    </div>
  );
};

export default MultaDataTable;
