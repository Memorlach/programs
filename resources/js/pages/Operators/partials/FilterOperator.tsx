import {CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useDestinations} from "@/hooks/global-data";
import {Switch} from "@/components/ui/switch";

interface FiltersProps {
    title: string;
    inputValue: string;
    onInputChange: (value: string) => void;
    onSearchClick: () => void;
    destinationQuery: string;
    onDestinationChange?: (value: string) => void;
    operatorActive: boolean;
    onOperatorActiveChange: (value: boolean) => void;
}

const FilterOperator = ({
                            title,
                            inputValue,
                            onInputChange,
                            onSearchClick,
                            destinationQuery,
                            onDestinationChange,
                            operatorActive,
                            onOperatorActiveChange,
                   }: FiltersProps) => {

    const {destinations} = useDestinations();

    return (
        <div className="w-full py-3">
            <div className="flex">
                <div className="w-full pb-4">
                    <CardTitle>{title}</CardTitle>
                </div>
            </div>
            <div className="flex gap-3">
                <div className="w-1/3">
                    <Label>Buscar</Label>
                    <div className="flex">
                        <Input
                            placeholder="Buscar Operador ..."
                            value={inputValue}
                            onChange={(e) => onInputChange(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && onSearchClick()}
                        />
                        <Button
                            className="rounded-l-none"
                            onClick={onSearchClick}
                        > Buscar
                        </Button>
                    </div>
                </div>
                <div className="w-1/3">
                    <Label className="">Destino</Label>
                    <div className="">
                        <Select
                            value={destinationQuery}
                            onValueChange={onDestinationChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Destino"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value=" ">Todos los destinos</SelectItem>
                                {
                                    destinations.map((destination) => (
                                        <SelectItem value={destination.uid}
                                                    key={destination.uid}>{destination.name}</SelectItem>
                                    ))
                                }
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="w-1/3">
                    <div>
                        <Label htmlFor="auto-update" className="text-sm">
                            Operadores activos
                        </Label>
                    </div>
                    <div>
                        <Switch size="sm" id="auto-update"
                            checked={operatorActive}
                            onClick={() => onOperatorActiveChange(!operatorActive)}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default FilterOperator;

