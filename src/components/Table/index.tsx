import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import DataLoader from "../lottie/loader" // Assuming this path is correct
import NoData from "../svgs/no-data" // Assuming this path is correct

// Define types for columns and rows for better type safety
interface Column {
  id: string
  label: string
  align?: string
  minWidth?: number | string
}

interface Row {
  [key: string]: any // Rows can have any properties, matching column.id
}

interface TableContentProps {
  loading?: boolean
  columns: Column[]
  rows: Row[]
  page?: number
  pagesize?: number
  sliced?: boolean
}

export function TableContent({
  loading,
  columns,
  rows,
  page,
  pagesize,
  sliced,
}: TableContentProps) {
  // Helper to get Tailwind text alignment class
  const getTextAlignClass = (align?: Column["align"]) => {
    switch (align) {
      case "center":
        return "text-center"
      case "right":
        return "text-right"
      case "justify":
        return "text-justify"
      default:
        return "text-left"
    }
  }

  return (
    <>
      {loading ? (
        <div className="flex w-full items-center justify-center py-8">
          <DataLoader />
        </div>
      ) : rows?.length === 0 ? (
        <div className="flex w-full items-center justify-center py-8">
          <NoData />
        </div>
      ) : (
        <div className="relative w-full overflow-auto">
          {" "}
          {/* Replaces StyledTableContainer */}
          <Table>
            <TableHeader>
              <TableRow>
                {columns?.map((column: Column, index: number) => (
                  <TableHead
                    key={index}
                    className={getTextAlignClass(column.align)} // Apply alignment class
                  >
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sliced
                ? rows
                    .slice(page! * pagesize!, page! * pagesize! + pagesize!)
                    .map((row: Row, index: number) => (
                      <TableRow key={index + 1}>
                        {columns.map((column: Column) => {
                          const value = row[column.id]
                          return (
                            <TableCell
                              key={column.id}
                              className={getTextAlignClass(column.align)} // Apply alignment class
                            >
                              {value}
                            </TableCell>
                          )
                        })}
                      </TableRow>
                    ))
                : rows?.map((row: Row, index: number) => (
                    <TableRow key={index + 1}>
                      {columns.map((column: Column, colIndex: number) => {
                        const value = row[column.id]
                        return (
                          <TableCell
                            key={colIndex}
                            className={getTextAlignClass(column.align)} // Apply alignment class
                          >
                            {value}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  )
}
