import React, {useEffect, useMemo, useState} from 'react';
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
import {ChartColumn, CheckCheck, EllipsisVertical, Eye, Moon, Pencil, SunMedium} from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardFooter,
    CardHeader,
    CardTable,
} from '@/components/ui/card';
import { DataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import {DataGridTable, DataGridTableLoader} from '@/components/ui/data-grid-table';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {Container} from "@/components/common/container";
import MtsClient from "@/api/services/MtsClient";
import {format} from "date-fns";
import FilterMts from "@/pages/Programs/partials/FilterMts";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useAuth} from "@/context/auth-context";

interface MtsProps {
    title: string;
}

function ActionsCell({ row }: { row: Row<MtsInterface> }) {
    const user = useAuth();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="size-7" mode="icon" variant="ghost">
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuItem asChild>
                    <Link className="flex" to={'https://viaje.mt/' + row.original.clv} target="_blank"><Eye className="me-1" /> Ver</Link>
                </DropdownMenuItem>
                {
                    user.checkAccess('util.mts.edit') && user.checkAccess('util.mts.update') ? (<>
                        <DropdownMenuItem asChild>
                            <Link className="flex" to={'visibilidad'}><CheckCheck className="me-1" /> Visibilidad</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link className="flex" to={'visibilidad'}><ChartColumn className="me-1" /> Reporte de ventas</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link className="flex" to={'programs/' + row.original.clv + '/edit'} target="_blank"><Pencil className="me-1" /> Editar</Link>
                        </DropdownMenuItem> </>) : ''
                }
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

const ListPrograms = ({ title }: MtsProps) => {
    const mtsClient = new MtsClient();
    const [pagination, setPagination] = useState<PaginationState>({
            pageIndex: 0,
            pageSize: 20,
        });

    const [sorting, setSorting] = useState<SortingState>([
        { id: 'Clave', desc: true },
    ]);

    const [destinationQuery, setDestinationQuery] = useState('');
    const [programsActiveQuery, setProgramsActiveQuery] = useState<boolean>(true);
    const [programsExa, setProgramsExa] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [MtsData, setMtsData] = useState<MtsDataTableInterface>({
        data: [],
        recordsTotal: 0
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => { // Se regresa la paginación a 1 cuando se usan filtros
        setPagination(prev => ({ ...prev, pageIndex: 0 }));
    }, [programsActiveQuery, searchQuery]);

    useEffect(() => {
        setIsLoading(true)
        const loadMts = async () => {
            let start = pagination.pageIndex * pagination.pageSize;

            const data = await mtsClient.listMts({
                length : pagination.pageSize,
                start: start,
                active: programsActiveQuery,
                keyword: searchQuery,
                is_exa: programsExa,
                destination: destinationQuery
            });

            setMtsData(data);
            setIsLoading(false);
        };

        loadMts();
    }, [pagination.pageIndex, programsActiveQuery, searchQuery, destinationQuery, programsExa]);

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
                ),
                size: 115
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
                size: 100
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
                ),
                size: 120
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
                ),
                size:100
            },{
                id: 'Acciones',
                accessorFn: (row) => row.clv,
                header:({column}) =>(
                    <DataGridColumnHeader title="Acciones" column={column} />
                ),
                cell: ({ row }) => <ActionsCell row={row} />,
                enableSorting: false,
                size:80
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

    return (
        <Container>
            <DataGrid
                table={table}
                recordCount={MtsData.recordsTotal}
                isLoading={isLoading}
                loadingMode='spinner'
                loadingMessage='Cargando programas'
                emptyMessage='No se encontraron resultados'
                tableLayout={{
                    columnsPinnable: true,
                    columnsMovable: true,
                    columnsVisibility: true,
                    cellBorder: true,
                }}
            >
                <Card>
                    <CardHeader>
                        <FilterMts
                            title={title}
                            destinationQuery={destinationQuery}
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            onDestinationChange={setDestinationQuery}
                            programsActive={programsActiveQuery}
                            onProgramsActiveChange={setProgramsActiveQuery}
                            programsExa={programsExa}
                            onProgramsExaActiveChange={setProgramsExa}
                        ></FilterMts>
                    </CardHeader>
                    <CardTable className={isLoading ? 'opacity-50' : 'opacity-100'}>
                        <ScrollArea>
                            <DataGridTable />
                            {isLoading ? <DataGridTableLoader/> : ''}
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
