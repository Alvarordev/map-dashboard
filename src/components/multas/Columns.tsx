import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/Badge";

export const columns: ColumnDef<Multa>[] = [
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
      return <div className={`text-center`}>{row.getValue("vPlacaAuto")}</div>;
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
        <div className="text-center">S/.{row.original.tipocepo.vCostoCepo}</div>
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
            {estado ? "Bloqueado" : "Liberado"}
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
    filterFn: "dateFilter" as any,
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
