type TableProps = {
  columns: string[];
  rows: (string | number)[][];
};

function Table({ columns, rows }: TableProps) {
  return (
    <div className="w-full h-screen overflow-x-auto  border border-border bg-card shadow-sm">
      <table className="w-full border-collapse">
        {/* Columns */}
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {columns.map((column, idx) => (
              <th
                key={idx}
                className="px-5 py-4 text-left text-sm font-semibold text-foreground whitespace-nowrap"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        {/* Rows */}
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="
                  border-b border-border/60
                  transition-colors
                  hover:bg-accent/50
                "
              >
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    className="
                      px-5 py-4
                      text-sm
                      text-muted-foreground
                    "
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="
                  py-10
                  text-center
                  text-sm
                  text-muted-foreground
                "
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
