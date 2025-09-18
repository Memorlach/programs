import {Row} from "@tanstack/react-table";
import OperatorClient from "@/api/services/OperatorClient";
import {useOperatorContext} from "@/pages/Operators/partials/OperatorContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {EllipsisVertical} from "lucide-react";

function ActionsCell({ row }: { row: Row<OperatorInterface> }) {
    const operatorClient = new OperatorClient();
    const { loadOperator } = useOperatorContext();

    const statusChange = async (id: string) => {
        try {
            await operatorClient.statusOperator(String(id));
            loadOperator();
        } catch (error) {
            console.error('Error al intentar actualizar el operator', error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="size-7" mode="icon" variant="ghost">
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
                <DropdownMenuItem onClick={() => {}}>Editar</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={() => statusChange(row.original.id)}>
                    {row.original.status == '1' ? 'Desactivar' : 'Activar'}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ActionsCell;
