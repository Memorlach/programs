import {CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Search, X} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useEffect} from "react";
import {useDestinations} from "@/hooks/global-data";

interface FiltersProps {
    title: string;
    searchQuery: string;
    destinationQuery: string;
    onSearchChange: (value: string) => void;
    onDestinationChange?: (value: string) => void;
}

const FilterMts = ({
   title,
   searchQuery,
   onSearchChange,
   onDestinationChange,
   destinationQuery
} : FiltersProps) => {
    const { destinations } = useDestinations();

    return (
        <div className="grid grid-col-4 gap-4">
            <div className="col-span-4">
                <CardTitle>{title}</CardTitle>
            </div>
            <div className="">
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
                                    <SelectItem value={destination.uid} key={destination.uid}>{destination.name}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="">
                <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2"/>
                <Input
                    placeholder="Buscar Programa ..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="ps-9 w-40"
                />
                {searchQuery.length > 0 && (
                    <Button
                        mode="icon"
                        variant="ghost"
                        className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                        onClick={() => onSearchChange('')}
                    >
                        <X/>
                    </Button>
                )}
                <Button>Buscar</Button>
            </div>
        </div>
    );
}

export default FilterMts;