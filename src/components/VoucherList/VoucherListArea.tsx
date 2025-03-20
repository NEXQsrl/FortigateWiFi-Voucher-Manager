/* eslint-disable @typescript-eslint/no-unused-vars */
import { use, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { ArrowUpDown, Search } from "lucide-react"

import {
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {type Voucher } from "@/types/Voucher"

const VoucherListArea = () => {

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [vouchers, setVouchers] = useState<Voucher[]>([]);

    const API_URL = import.meta.env.VITE_API_URL;
    const API_TOKEN = import.meta.env.VITE_API_TOKEN;

    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                setLoading(true);
                const response = await fetch(API_URL, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${API_TOKEN}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();

                    setVouchers(data.results);
                } else {
                    setError("ERROREEEEEEEEEEE NELLA RICHIESTAAAAAAAAAAAAAAA");
                }
            } catch (error) {
                setError("ERROREEEEEEEEEEEE");
                setVouchers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchVouchers();

    }, []);

    const columns: ColumnDef<Voucher>[] = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
        },
        {
            accessorKey: "user-id",
            header: "User ID",
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "mobile-phone",
            header: "Phone",
        },
        {
            accessorKey: "company",
            header: "Company",
        },
        {
            accessorKey: "expiration",
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Expiration
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
    ]

    const table = useReactTable({
        data: vouchers,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });




    return (
        <div className="space-y-4">
            {
                loading ? (
                    <div className="flex justify-center items-center h-32">
                        <span className="text-gray-500">Caricamento in corso...</span>
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center h-32 text-red-500">
                        <span>Errore: {error}</span>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Search className="h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Filter by name..."
                                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                                    onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
                                    className="max-w-sm"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    Previous
                                </Button>
                                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                                    Next
                                </Button>
                            </div>
                        </div>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => {
                                                return (
                                                    <TableHead key={header.id}>
                                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                                    </TableHead>
                                                )
                                            })}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                                No results.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex items-center justify-end space-x-2 py-4">
                            <div className="text-sm text-muted-foreground">
                                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                            </div>
                        </div>
                    </>
                )
            }
        </div>

    );
};

export default VoucherListArea;