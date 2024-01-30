import { ColumnDef } from "@tanstack/react-table";
import { useModal } from "../../context/ModalProvider";
import { Button } from "../ui/Button";
import UpdatePerfilForm from "./UpdatePerfilForm";

export const columns: ColumnDef<Perfil>[] = [
  {
    header: "Id",
    accessorKey: "iCodPerfil",
  },
  {
    header: "Rol",
    accessorKey: "vDescripcionPerfil",
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
      return <PerfilOptions perfil={row.original} />;
    },
  },
];

const PerfilOptions = ({ perfil }: { perfil: Perfil }) => {
  const { openModal } = useModal();

  return (
    <Button
      variant="link"
      className="w-full flex justify-center items-center"
      onClick={() => openModal(<UpdatePerfilForm dataPerfil={perfil} />)}
    >
      editar
    </Button>
  );
};
