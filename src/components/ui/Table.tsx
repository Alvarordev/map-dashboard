import { flexRender, type Table } from "@tanstack/react-table";

interface Props {
  table: Table<any>;
}

const Table = ({ table }: Props) => {
  return (
    <table className="w-full caption-bottom text-sm border">
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

      <tbody className="[&_tr:last-child]:border-0 text-center">
        {table.getRowModel().rows.map((row, index) => (
          <tr
            key={row.id}
            className={index % 2 === 0 ? "bg-background" : "bg-muted"}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="max-w-60 px-0.5">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
