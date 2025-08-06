import {CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useDestinations} from "@/hooks/global-data";
import {Switch} from "@/components/ui/switch";
import {SetStateAction, useState} from "react";

interface FiltersProps {
    title: string;
    searchQuery: string;
    destinationQuery: string;
    onSearchChange: (value: string) => void;
    onDestinationChange?: (value: string) => void;
    programsActive: boolean,
    onProgramsActiveChange: (value: boolean) => void,
    programsExa: boolean,
    onProgramsExaActiveChange: (value: boolean) => void,
}

const FilterMts = ({
                       title,
                       searchQuery,
                       onSearchChange,
                       onDestinationChange,
                       destinationQuery,
                       programsActive,
                       onProgramsActiveChange,
                       programsExa,
                       onProgramsExaActiveChange
                   }: FiltersProps) => {

    const {destinations} = useDestinations();
    const [inputValue, setInputValue] = useState(searchQuery);

    const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setInputValue(e.target.value);
    };

    const handleButtonClick = () => {
        onSearchChange(inputValue);
    };

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
                            placeholder="Buscar Programa ..."
                            value={inputValue}
                            className="rounded-r-none"
                            onChange={handleInputChange}
                        />
                        <Button className='rounded-l-none' onClick={handleButtonClick}>Buscar</Button>
                    </div>
                </div>
                <div className="w-1/3">
                    <Label className="">Destino</Label>
                    <div className="">
                        <Select
                            defaultValue={destinationQuery}
                            onValueChange={onDestinationChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Destino"/>
                            </SelectTrigger>
                            <SelectContent>
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
                            Programas activos
                        </Label>
                    </div>
                    <div>
                        <Switch size="sm" id="auto-update"
                            checked={programsActive}
                            onClick={() => onProgramsActiveChange(!programsActive)}
                        />
                    </div>
                </div>
                <div className="w-1/3">
                    <div>
                        <Label htmlFor="auto-update" className="text-sm">
                            Exa Travel
                        </Label>
                    </div>
                    <div>
                        <Switch size="sm" id="auto-update"
                            checked={programsExa}
                            onClick={() => onProgramsExaActiveChange(!programsExa)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterMts;