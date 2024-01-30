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
      const rowDate: string = row.getValue("dtFechaDesbloqueo");
      if (!rowDate) return <div></div>;

      const formattedDate = new Date(rowDate).toLocaleString("es-ES");

      return <div className={`text-center`}>{formattedDate}</div>;
    },
  },
];
