import {useEffect, useMemo, useRef, useState} from 'react';
import {
    ColumnDef,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    Row,
    RowSelectionState,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import {EllipsisVertical, Moon, Search, Settings2, SunMedium, X} from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardFooter,
    CardHeader,
    CardHeading,
    CardTable,
    CardTitle,
    CardToolbar,
} from '@/components/ui/card';
import { DataGrid, useDataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridColumnVisibility } from '@/components/ui/data-grid-column-visibility';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import { DataGridTable } from '@/components/ui/data-grid-table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
import {Container} from "@/components/common/container";
import {mtsClient} from "@/api/services/MtsClient";
import {format} from "date-fns";

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
    const [pagination, setPagination] =
        useState<PaginationState>({
            pageIndex: 0,
            pageSize: 50,
        });

    const [sorting, setSorting] = useState<SortingState>([
        { id: 'Clave', desc: true },
    ]);

    const [programsActive, setProgramsActive] = useState<boolean>(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [MtsData, setMtsData] = useState<MtsSearchInterface>({
        data: [],
        recordsTotal: 0
    });

    useEffect(() => {
        // Este efecto se ejecuta cuando cambian los filtros (programsActive o searchQuery) y resetea la paginación a la primera página
        setPagination(prev => ({ ...prev, pageIndex: 0 }));
    }, [programsActive, searchQuery]);

    useEffect(() => {
        const loadMts = async () => {
            let start = pagination.pageIndex * pagination.pageSize;

            const data = await mtsClient.listMts({
                length : pagination.pageSize,
                start: start,
                active: programsActive,
                keyword: searchQuery,
                is_exa: false,
                destination: ''
            });

            setMtsData(data);
        };

        loadMts();
    }, [pagination.pageIndex, pagination.pageSize, programsActive, searchQuery]);

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
                        checked={programsActive}
                        onClick={() => setProgramsActive(!programsActive)}
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
                            <div className="flex items-center gap-2.5">
                                <CardTitle>{title}</CardTitle>
                                <div className="relative">
                                    <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
                                    <Input
                                        placeholder="Buscar Programa ..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="ps-9 w-40"
                                    />
                                    {searchQuery.length > 0 && (
                                        <Button
                                            mode="icon"
                                            variant="ghost"
                                            className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                                            onClick={() => setSearchQuery('')}
                                        >
                                            <X />
                                        </Button>
                                    )}
                                </div>
                            </div>
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
