import {useEffect, useMemo, useState} from 'react';
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    Row,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { Moon, Settings2, SunMedium } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardFooter,
    CardHeader,
    CardHeading,
    CardTable,
    CardToolbar,
} from '@/components/ui/card';
import { DataGrid, useDataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridColumnVisibility } from '@/components/ui/data-grid-column-visibility';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { DataGridTable } from '@/components/ui/data-grid-table';
import { Label } from '@/components/ui/label';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import {Container} from "@/components/common/container";
import MtsClient from "@/api/services/MtsClient";
import {format} from "date-fns";
import FilterMts from "@/pages/Programs/partials/FilterMts";

interface MtsProps {
    title: string;
}

function ActionsCell({ row }: { row: Row<MtsInterface> }) {
    return (
        <div>

        </div>
    );
}

const ListPrograms = ({ title }: MtsProps) => {
    const mtsClient = new MtsClient();
    const [pagination, setPagination] = useState<PaginationState>({
            pageIndex: 0,
            pageSize: 50,
        });

    const [sorting, setSorting] = useState<SortingState>([
        { id: 'Clave', desc: true },
    ]);

    const [destinationQuery, setDestinationQuery] = useState('');
    const [programsActiveQuery, setProgramsActiveQuery] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [MtsData, setMtsData] = useState<MtsDataTableInterface>({
        data: [],
        recordsTotal: 0
    });

    useEffect(() => { // Se regresa la paginación a 1 cuando se usan filtros
        setPagination(prev => ({ ...prev, pageIndex: 0 }));
    }, [programsActiveQuery, searchQuery]);

    useEffect(() => {
        const loadMts = async () => {
            let start = pagination.pageIndex * pagination.pageSize;

            const data = await mtsClient.listMts({
                length : pagination.pageSize,
                start: start,
                active: programsActiveQuery,
                keyword: searchQuery,
                is_exa: false,
                destination: destinationQuery
            });

            setMtsData(data);
        };

        loadMts();
    }, [pagination.pageIndex, programsActiveQuery, searchQuery, destinationQuery]);

    const columns = useMemo<ColumnDef<MtsInterface>[]>(
        () => [
            {
                id: 'Clave',
                accessorFn: (row) => row.clv,
                header: ({ column }) => (
                    <DataGridColumnHeader title="Clave" column={column} />
                ),
                cell: (info) => (
                    <div className="flex items-center gap-2.5">
                        <div className="flex flex-col gap-0.5">
                            {info.row.original.clv}
                        </div>
                    </div>
                ),
                size: 70,
                enableSorting: true,
            },
            {
                id: 'Nombre',
                accessorFn: (row) => row.name,
                header: ({ column }) => (
                    <DataGridColumnHeader title="Programa" column={column} />
                ),
                cell: (info) => (
                    <div className="flex items-center gap-2.5">
                        <div className="flex flex-col gap-0.5">
                            {info.row.original.name}
                        </div>
                    </div>
                ),
                enableSorting: true,
                size: 400,
            }, {
                id: 'Destino',
                accessorFn: (row) => row.destination,
                header: ({ column }) => (
                    <DataGridColumnHeader title="Destino" column={column} />
                ),
                cell: (info) => (
                    <div className="flex items-center">
                        {info.row.original.destination.name}
                    </div>
                ),
                enableSorting: true
            }, {
                id: 'Duración',
                header:({column}) => (
                    <DataGridColumnHeader title="Duración" column={column} />
                ),
                cell: (info) => (
                    <div className="flex items-center">
                        {info.row.original.days} {<SunMedium className="mx-[3px]" size={15} strokeWidth={1.5} />}  | {info.row.original.nights} {<Moon size={15} className="mx-[3px]" strokeWidth={1.5} />}
                    </div>
                )
            }, {
                id: 'Estatus',
                accessorFn: (row) => row.status.name,
                header: ({ column }) => (
                    <DataGridColumnHeader title="Estado" column={column} />
                ),
                cell: (info) => (
                        <div className="flex align-content-center">
                            {info.row.original.status.name}
                        </div>
                ),
                enableSorting: true,
            },{
                id: 'Expiración',
                accessorFn: (row) => row.expiration,
                header: ({ column }) => (
                    <DataGridColumnHeader title="Expiración" column={column} />
                ),
                cell: (info) => (
                    <div className="flex align-content-center">
                        { format(info.row.original.expiration, 'dd-MM-yyyy') }
                    </div>
                )
            },{
                id: '# Bloqueos',
                accessorFn: (row) => row.bloqueos,
                header: ({ column }) => (
                    <DataGridColumnHeader title="# Bloqueos" column={column} />
                ),
                cell: (info) => (
                    <div className="flex align-content-center">
                        { info.row.original.bloqueos }
                    </div>
                )
            },{
                id: 'Acciones',
                accessorFn: (row) => row.clv,
                header:({column}) =>(
                    <DataGridColumnHeader title="Acciones" column={column} />
                ),
                cell: ({ row }) => <ActionsCell row={row} />,
                enableSorting: false,
            },
        ],
        [],
    );

    const table = useReactTable({
        columns,
        data: MtsData.data,
        pageCount: Math.ceil((MtsData.recordsTotal || 0) / pagination.pageSize),
        getRowId: (row: MtsInterface) => String(row.clv),
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

    const Toolbar = () => {
        const { table } = useDataGrid();

        return (
            <CardToolbar>
                <div className="flex flex-wrap items-center gap-2.5">
                    <Label htmlFor="auto-update" className="text-sm">
                        Programas activos
                    </Label>
                    <Switch size="sm" id="auto-update"
                        checked={programsActiveQuery}
                        onClick={() => setProgramsActiveQuery(!programsActiveQuery)}
                    />
                </div>
                <DataGridColumnVisibility
                    table={table}
                    trigger={
                        <Button variant="outline">
                            <Settings2 />
                            Columnas
                        </Button>
                    }
                />
            </CardToolbar>
        );
    };

    return (
        <Container>
            <DataGrid
                table={table}
                recordCount={MtsData.recordsTotal}
                tableLayout={{
                    columnsPinnable: true,
                    columnsMovable: true,
                    columnsVisibility: true,
                    cellBorder: true,
                }}
            >
                <Card>
                    <CardHeader>
                        <CardHeading>
                            <FilterMts
                                title={title}
                                destinationQuery={destinationQuery}
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                                onDestinationChange={setDestinationQuery}
                            ></FilterMts>
                        </CardHeading>
                        <Toolbar />
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
        </Container>
    );
};

export { ListPrograms };
