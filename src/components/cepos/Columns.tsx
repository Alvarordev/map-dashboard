import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/Button";
import { useModal } from "../../context/ModalProvider";
import EditCepoForm from "./EditCepoForm";

const CeposColumns = ({ cepo }: { cepo: Tipocepo }) => {
  const { openModal } = useModal();

  return (
    <Button
      variant="link"
      className="w-full flex justify-center items-center"
      onClick={() => openModal(<EditCepoForm dataCepo={cepo} />)}
    >
      editar
    </Button>
  );
};

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
    cell: ({ row }) => {
      return <div className="text-center">S/.{row.getValue("vCostoCepo")}</div>;
    },
  },
  {
    header: "Usuario",
    accessorKey: "iCodigoUsuarioCreacion",
  },
  {
    header: "Opciones",
    cell: ({ row }) => {
      return <CeposColumns cepo={row.original} />;
    },
  },
];
