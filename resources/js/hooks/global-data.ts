import { useQuery } from '@tanstack/react-query';
import { mtsClient } from "@/api/services/MtsClient";

export const useDestinations = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['destinations'],
        queryFn: () => mtsClient.getDestinations(), // Asegúrate de llamar a la función
    });

    return {
        destinations: data || [], // Proporciona un valor por defecto
        isLoading,
        error
    };
};