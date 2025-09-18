import { useEffect, useMemo, useState } from 'react';
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import {
    Card,
    CardFooter,
    CardHeader,
    CardTable,
} from '@/components/ui/card';
import { DataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { DataGridTable } from '@/components/ui/data-grid-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import FilterOperator from '@/pages/Operators/partials/FilterOperator';
import { useOperatorContext } from '@/pages/Operators/partials/OperatorContext';
import ActionsCell from '@/pages/Operators/partials/ActionsCell';

interface MtsProps {
    title: string;
}

const ListOperators = ({ title }: MtsProps) => {
    const { operatorData, setFilters, loadOperator } = useOperatorContext();

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const [sorting, setSorting] = useState<SortingState>([
        { id: 'Nombre', desc: true },
    ]);

    const [destinationQuery, setDestinationQuery] = useState('');
    const [operatorActiveQuery, setOperatorActiveQuery] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [inputValue, setInputValue] = useState<string>('');

    // Reinicia paginación cuando cambian filtros
    useEffect(() => {
        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }, [operatorActiveQuery, destinationQuery]);

    // Actualiza filtros en el contexto
    useEffect(() => {
        const newFilters = {
            pageIndex: pagination.pageIndex,
            pageSize: pagination.pageSize,
            destination: destinationQuery,
            active: operatorActiveQuery,
            keyword: searchQuery,
        };

        setFilters(newFilters);
    }, [pagination.pageIndex, destinationQuery, operatorActiveQuery]);

    const handleSearchClick = () => {
        const newFilters = {
            pageIndex: 0,
            pageSize: pagination.pageSize,
            destination: destinationQuery,
            active: operatorActiveQuery,
            keyword: inputValue,
        };

        setSearchQuery(inputValue);
        setFilters(newFilters);
        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
        loadOperator(newFilters);
    };

    const red_row = { backgroundColor: '#ff9688' };

    const columns = useMemo<ColumnDef<OperatorInterface>[]>(() => [
        {
            id: 'code',
            accessorFn: (row) => row.code,
            header: ({ column }) => <DataGridColumnHeader title="Código" column={column} />,
            cell: (info) => (
                <div className="flex items-center gap-2.5" style={info.row.original.status == '0' ? red_row : {}}>
                    <div className="flex flex-col gap-0.5">{info.row.original.code}</div>
                </div>
            ),
            enableSorting: true,
            size: 100,
        },
        {
            id: 'code_alfa',
            accessorFn: (row) => row.code_alfa,
            header: ({ column }) => <DataGridColumnHeader title="Alfa" column={column} />,
            cell: (info) => (
                <div className="flex items-center gap-2.5">
                    <div className="flex flex-col gap-0.5">{info.row.original.code_alfa}</div>
                </div>
            ),
            enableSorting: true,
            size: 100,
        },
        {
            id: 'Nombre',
            accessorFn: (row) => row.name,
            header: ({ column }) => <DataGridColumnHeader title="Nombre" column={column} />,
            cell: (info) => (
                <div className="flex items-center gap-2.5">
                    <div className="flex flex-col gap-0.5">{info.row.original.name}</div>
                </div>
            ),
            enableSorting: true,
            size: 150,
        },
        {
            id: 'type',
            accessorFn: (row) => row.type,
            header: ({ column }) => <DataGridColumnHeader title="Tipo" column={column} />,
            cell: (info) => <div className="flex align-content-center">{info.row.original.type}</div>,
            enableSorting: true,
        },
        {
            id: 'Divisa',
            accessorFn: (row) => row.type,
            header: ({ column }) => <DataGridColumnHeader title="Divisa" column={column} />,
            cell: (info) => <div className="flex align-content-center">{info.row.original.currency.name}</div>,
            enableSorting: true,
        },
        {
            id: 'Acciones',
            accessorFn: (row) => row.id,
            header: ({ column }) => <DataGridColumnHeader title="Acciones" column={column} />,
            cell: ({ row }) => <ActionsCell row={row} />,
            enableSorting: false,
            size: 50,
        },
    ], []);

    const table = useReactTable({
        columns,
        data: operatorData.data,
        pageCount: Math.ceil((operatorData.recordsTotal || 0) / pagination.pageSize),
        getRowId: (row: OperatorInterface) => String(row.code),
        state: {
            pagination,
            sorting,
        },
        columnResizeMode: 'onChange',
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
    });

    return (
            <DataGrid
                table={table}
                recordCount={operatorData.recordsTotal}
                tableLayout={{
                    columnsPinnable: true,
                    columnsMovable: true,
                    columnsVisibility: true,
                    cellBorder: true,
                }}
            >
                <Card>
                    <CardHeader>
                        <FilterOperator
                            title={title}
                            inputValue={inputValue}
                            onInputChange={setInputValue}
                            onSearchClick={handleSearchClick}
                            destinationQuery={destinationQuery}
                            onDestinationChange={setDestinationQuery}
                            operatorActive={operatorActiveQuery}
                            onOperatorActiveChange={setOperatorActiveQuery}
                        />
                    </CardHeader>
                    <CardTable>
                        <ScrollArea>
                            <DataGridTable />
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </CardTable>
                    <CardFooter>
                        <DataGridPagination />
                    </CardFooter>
                </Card>
            </DataGrid>
    );
};

export { ListOperators };
