import * as React from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  MagnifyingGlass,
  CaretUp,
  CaretDown,
  CaretUpDown,
  CaretLeft,
  CaretRight,
  CaretDoubleLeft,
  CaretDoubleRight,
  Columns,
} from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export interface TablePerson {
  name: string;
  email: string;
  status: "Active" | "Pending" | "Inactive";
  role: string;
  revenue: number;
}

const STATUS_VARIANT: Record<TablePerson["status"], "default" | "secondary" | "outline"> = {
  Active: "default",
  Pending: "secondary",
  Inactive: "outline",
};

const FIRST = ["Alex", "Sara", "Ray", "Mia", "Jon", "Lena", "Omar", "Ivy", "Cole", "Nadia", "Theo", "Priya", "Marcus", "Elena", "Sam", "Dora", "Kai", "Ruth", "Leo", "Vera", "Drew", "Tara", "Noah", "Bree"];
const LAST = ["Johnson", "Mitchell", "Kim", "Chen", "Park", "Diaz", "Hassan", "Stone", "Reyes", "Fox", "Wells", "Shah", "Cole", "Vance", "Bauer", "Lin", "Frost", "Mora", "Webb", "Ali", "Rhodes", "Nash", "Pruitt", "Lowe"];
const ROLES = ["Admin", "Editor", "Viewer", "Owner", "Billing"];
const STATUSES: TablePerson["status"][] = ["Active", "Pending", "Inactive"];

export const SAMPLE_PEOPLE: TablePerson[] = Array.from({ length: 24 }, (_, i) => {
  const name = `${FIRST[i]} ${LAST[i]}`;
  return {
    name,
    email: `${FIRST[i].toLowerCase()}@baseline.app`,
    status: STATUSES[i % 3 === 0 ? 0 : i % 3 === 1 ? 1 : 2],
    role: ROLES[i % ROLES.length],
    revenue: 600 + ((i * 737) % 5400),
  };
});

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).join("");
}

function SortHeader({
  label,
  active,
  dir,
  onClick,
  align = "left",
}: {
  label: string;
  active: boolean;
  dir: "asc" | "desc" | false;
  onClick: () => void;
  align?: "left" | "right";
}) {
  const Icon = active ? (dir === "asc" ? CaretUp : CaretDown) : CaretUpDown;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 transition-colors duration-instant hover:text-[var(--bl-fg-primary)] ${align === "right" ? "flex-row-reverse" : ""}`}
      style={{ color: active ? "var(--bl-fg-primary)" : undefined }}
    >
      {label}
      <Icon size={12} weight="bold" className="opacity-70" />
    </button>
  );
}

/**
 * DataTable - product-grade table built on TanStack Table.
 * Global search, per-column sort, status filter, column visibility, row
 * selection, and pagination. Composes shadcn Table/Input/Select/Checkbox/
 * Badge/Avatar/DropdownMenu/Button + Phosphor icons; fully tokenized.
 */
export function DataTable({ people = SAMPLE_PEOPLE }: { people?: TablePerson[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo<ColumnDef<TablePerson>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(!!v)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <SortHeader label="Name" active={!!column.getIsSorted()} dir={column.getIsSorted()} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />
        ),
        cell: ({ row }) => (
          <div className="flex items-center gap-2.5">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="text-[10px]">{initials(row.original.name)}</AvatarFallback>
            </Avatar>
            <div className="leading-tight">
              <p className="font-medium" style={{ color: "var(--bl-fg-primary)" }}>{row.original.name}</p>
              <p className="text-[11px]" style={{ color: "var(--bl-fg-muted)" }}>{row.original.email}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <Badge variant={STATUS_VARIANT[row.original.status]}>{row.original.status}</Badge>,
        filterFn: (row, id, value) => value === "all" || row.getValue(id) === value,
      },
      { accessorKey: "role", header: "Role" },
      {
        accessorKey: "revenue",
        header: ({ column }) => (
          <div className="text-right">
            <SortHeader label="Revenue" align="right" active={!!column.getIsSorted()} dir={column.getIsSorted()} onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} />
          </div>
        ),
        cell: ({ row }) => <div className="text-right tabular-nums">${row.original.revenue.toLocaleString()}</div>,
      },
    ],
    []
  );

  const table = useReactTable({
    data: people,
    columns,
    state: { sorting, columnFilters, columnVisibility, rowSelection, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, _id, value) => {
      const q = String(value).toLowerCase();
      return (
        row.original.name.toLowerCase().includes(q) ||
        row.original.email.toLowerCase().includes(q) ||
        row.original.role.toLowerCase().includes(q)
      );
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 8 } },
  });

  const statusFilter = (table.getColumn("status")?.getFilterValue() as string) ?? "all";

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm">Records</CardTitle>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[180px]">
            <MagnifyingGlass size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--bl-fg-muted)" }} />
            <Input
              placeholder="Search..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-8 h-8"
              aria-label="Search"
            />
          </div>

          <Select value={statusFilter} onValueChange={(v) => table.getColumn("status")?.setFilterValue(v)}>
            <SelectTrigger className="h-8 w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1.5">
                <Columns size={15} />
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table.getAllColumns().filter((c) => c.getCanHide()).map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(v) => column.toggleVisibility(!!v)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="px-2 pb-2">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div
          className="flex flex-wrap items-center gap-3 px-2 pt-3 pb-1 text-[13px]"
          style={{ color: "var(--bl-fg-muted)", borderTop: "1px solid var(--bl-border-divider)" }}
        >
          <span>
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} selected
          </span>
          <div className="ml-auto flex items-center gap-2">
            <span className="hidden sm:inline">Rows</span>
            <Select value={`${table.getState().pagination.pageSize}`} onValueChange={(v) => table.setPageSize(Number(v))}>
              <SelectTrigger className="h-7 w-[60px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[8, 16, 24].map((n) => (
                  <SelectItem key={n} value={`${n}`}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <span className="tabular-nums">
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} aria-label="First page">
              <CaretDoubleLeft size={13} />
            </Button>
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} aria-label="Previous page">
              <CaretLeft size={13} />
            </Button>
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} aria-label="Next page">
              <CaretRight size={13} />
            </Button>
            <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()} aria-label="Last page">
              <CaretDoubleRight size={13} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
