import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Usuario>[] = [
  {
    header: "Usuario",
    accessorKey: "vAliasUsuario",
  },
  {
    header: "Perfil",
    accessorKey: "perfil.vDescripcionPerfil",
  },
  {
    header: "Fecha de creacion",
    accessorKey: "dtFechaCreacion",
    cell: ({ row }) => {
      const formattedDate = new Date(
        row.getValue("dtFechaCreacion")
      ).toLocaleString("es-ES");
      return <div className="text-center">{formattedDate}</div>;
    },
  },
  {
    header: "Fecha de vencimiento",
    accessorKey: "dtFechaVencimiento",
    cell: ({ row }) => {
      const formattedDate = new Date(
        row.getValue("dtFechaVencimiento")
      ).toLocaleString("es-ES");
      return <div className="text-center">{formattedDate}</div>;
    },
  },
  {
    header: "Estado",
    accessorKey: "bEstadoRegistro",
    cell: ({ row }) => {

        return <div className="text-center">{row.getValue("bEstadoRegistro") ? 'Habilitado' : 'Deshabilitado'}</div>;
      },
  },
  {
    header: "Opciones",
    cell: () => {
      return <div>editar</div>;
    },
  },
];
