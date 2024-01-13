import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Tipocepo>[] = [
  {
    header: "Id",
    accessorKey: "iCodTipoCepo",
  },
  {
    header: "Descripción",
    accessorKey: "vDescripcionCepo",
  },
  {
    header: "Costo",
    accessorKey: "vCostoCepo",
  },
  {
    header: "Usuario",
    accessorKey: "iCodigoUsuarioCreacion",
  },
  {
    header: "Opciones",
    cell: () => {
      return (
        <div className="w-full flex justify-center items-center">editar</div>
      );
    },
  },
];
