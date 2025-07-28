import { useQuery } from '@tanstack/react-query';
import MtsClient from "@/api/services/MtsClient";

export const useDestinations = () => {
    const mtsClient = new MtsClient();

    const { data, isLoading, error } = useQuery({
        queryKey: ['destinations'],
        queryFn: () => mtsClient.getDestinations(),
    });

    return {
        destinations: data || [],
        isLoading,
        error
    };
};