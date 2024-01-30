import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/Button";
import { useModal } from "../../context/ModalProvider";
import UpdateUsuarioForm from "./UpdateUsuarioForm";

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
      const rowDate: string = row.getValue("dtFechaVencimiento");
      if (!rowDate) return <div></div>;

      const formattedDate = new Date(rowDate).toLocaleString("es-ES");

      return <div className={`text-center`}>{formattedDate}</div>;
    },
  },
  {
    header: "Estado",
    accessorKey: "bEstadoRegistro",
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {row.getValue("bEstadoRegistro") ? "Habilitado" : "Deshabilitado"}
        </div>
      );
    },
  },
  {
    header: "Opciones",
    cell: ({ row }) => {
      return <UsuarioOptions usuario={row.original} />;
    },
  },
];

const UsuarioOptions = ({ usuario }: { usuario: Usuario }) => {
  const { openModal } = useModal();

  return (
    <Button
      variant="link"
      className="w-full flex justify-center items-center"
      onClick={() => openModal(<UpdateUsuarioForm dataUsuario={usuario} />)}
    >
      editar
    </Button>
  );
};
