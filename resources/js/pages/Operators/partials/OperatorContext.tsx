import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import OperatorClient from '@/api/services/OperatorClient';

interface OperatorContextType {
    operatorData: OperatorDataTableInterface;
    loadOperator: (filters?: OperatorFilters) => void;
    setFilters: (filters: OperatorFilters) => void;
}

interface OperatorFilters {
    pageIndex: number;
    pageSize: number;
    destination: string;
    active: boolean;
    keyword: string;
}

const OperatorContext = createContext<OperatorContextType | undefined>(undefined);

export const useOperatorContext = () => {
    const context = useContext(OperatorContext);
    if (!context) throw new Error('useOperatorContext must be used inside OperatorProvider');
    return context;
};

export const OperatorProvider = ({ children }: { children: React.ReactNode }) => {
    const [operatorData, setOperatorData] = useState<OperatorDataTableInterface>({
        data: [],
        recordsTotal: 0,
    });

    const [filters, setFiltersState] = useState<OperatorFilters>({
        pageIndex: 0,
        pageSize: 20,
        destination: '',
        active: false,
        keyword: '',
    });

    const operatorClient = new OperatorClient();

    const loadOperator = useCallback(async (customFilters?: OperatorFilters) => {
        const appliedFilters = customFilters || filters;

        const { pageIndex, pageSize, destination, active, keyword } = appliedFilters;
        const start = pageIndex * pageSize;

        try {
            const data = await operatorClient.listOperator({
                length: pageSize,
                start,
                destination,
                active,
                keyword,
            });

            setOperatorData(data);
        } catch (error) {
            console.error('Error loading operator data:', error);
        }
    }, [filters]);

    const setFilters = (newFilters: OperatorFilters) => {
        setFiltersState(newFilters);
        loadOperator(newFilters);
    };

    return (
        <OperatorContext.Provider value={{ operatorData, loadOperator, setFilters }}>
            {children}
        </OperatorContext.Provider>
    );
};
