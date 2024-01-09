import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import MoveToMarker from "../map/MoveToMarker";
import { useEffect, useState } from "react";
import { Badge } from "../ui/Badge";
import { Map } from "leaflet";
import { getMultas } from "../../redux/api/multasAPI";

interface Props {
  map: Map | null;
}

const DataTable = ({ map }: Props) => {
  const [data, setData] = useState<Multa[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMultas();

      const sortedData = response.data.sort((a: Multa, b: Multa) => {
        return b.iCodMulta - a.iCodMulta;
      });

      setData(sortedData);
    };

    fetchData();
  }, []);

  const columns: ColumnDef<Multa>[] = [
    {
      header: "Opciones",
      cell: ({ row }: { row: any }) => {
        const coords: geoCode = [
          data[row.id].gCoordenadasXMulta,
          data[row.id].gCoordenadasYMulta,
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
      header: "Tipo auto",
      accessorKey: "iCodTipoCepo",
      cell: ({ row }) => {
        const tipo = row.getValue("iCodTipoCepo");

        return (
          <div className={`text-center`}>
            <Badge className={`${tipo ? "bg-blue-600" : "bg-orange-600"}`}>
              {tipo === 1 ? "liviano" : "pesado"}
            </Badge>
          </div>
        );
      },
    },
    {
      header: "Direccion",
      accessorKey: "vDireccionMulta",
    },
    {
      header: "Fecha bloqueo",
      accessorKey: "dtFechaBloqueo",
      cell: ({ row }) => {
        const formattedDate = new Date(
          row.getValue("dtFechaBloqueo")
        ).toLocaleString("es-ES");

        return <div className={`text-left`}>{formattedDate}</div>;
      },
    },
    {
      header: "Usuario Bloqueo",
      accessorKey: "usuariobloqueo.vAliasUsuario",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative w-full overflow-auto">
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

export default DataTable;
