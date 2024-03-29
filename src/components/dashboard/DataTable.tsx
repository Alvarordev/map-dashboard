import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import MoveToMarker from "../map/MoveToMarker";
import { useState } from "react";
import { Badge } from "../ui/Badge";
import { Map } from "leaflet";
import { Button } from "../ui/Button";
import { useModal } from "../../context/ModalProvider";
import MultaForm from "./MultaForm";
import { Input } from "../ui/Input";
import Table from "../ui/Table";

interface Props {
  map: Map | null;
  multas: Multa[];
}

const DataTable = ({ map, multas }: Props) => {
  const { openModal } = useModal();

  const columns: ColumnDef<Multa>[] = [
    {
      header: "Opciones",
      cell: ({ row }: { row: any }) => {
        const coords: geoCode = [
          multas[row.id].gCoordenadasXMulta,
          multas[row.id].gCoordenadasYMulta,
        ];
        return (
          <div className="w-full flex justify-center items-center">
            <MoveToMarker coords={coords} map={map} />
          </div>
        );
      },
    },
    {
      header: "Id",
      accessorKey: "iCodMulta",
      cell: ({ row }) => {
        return (
          <div className={`text-center min-w-4`}>
            {row.getValue("iCodMulta")}
          </div>
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
      cell: ({ row }) => {
        return (
          <div className="text-center">
            S/.{row.original.tipocepo.vCostoCepo}
          </div>
        );
      },
    },
    {
      header: "Estado",
      accessorKey: "bEstadoRegistro",
      cell: ({ row }) => {
        const estado = row.getValue("dtFechaDesbloqueo");

        return (
          <div className={`text-center py-2`}>
            <Badge className={`${estado ? "bg-emerald-500" : "bg-red-500"}`}>
              {estado ? "liberado" : "bloqueado"}
            </Badge>
          </div>
        );
      },
    },
    {
      header: "Estado Pago",
      accessorKey: "dFechaPago",
      cell: ({ row }) => {
        const pagado: Date = row.getValue("dFechaPago");

        return (
          <div className={`text-center py-2`}>
            <Badge className={`${pagado ? "bg-blue-500" : "bg-orange-500"}`}>
              {pagado ? "Pagado" : "Pendiente"}
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
      header: "Usuario",
      accessorKey: "usuariobloqueo.vAliasUsuario",
    },
    {
      header: "Fecha Liberado",
      accessorKey: "dtFechaDesbloqueo",
      cell: ({ row }) => {
        const rowDate: string = row.getValue("dtFechaDesbloqueo");
        if (!rowDate) return <div></div>;

        const formattedDate = new Date(rowDate).toLocaleString("es-ES");

        return <div className={`text-center`}>{formattedDate}</div>;
      },
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
        <Button size="sm" onClick={() => openModal(<MultaForm />)}>
          <span>Registrar Incidencia</span>
        </Button>

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
        </div>
      </div>

      <Table table={table} />
    </div>
  );
};

export default DataTable;
