import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { AppRouting } from "./routing/app-routing";
import {SettingsProvider} from "@/providers/settings-provider";
import {HelmetProvider} from "react-helmet-async";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const container = document.getElementById('app');

if(container){
    const root = createRoot(container!);

    const queryClient = new QueryClient();

    root.render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <SettingsProvider>
                    <HelmetProvider>
                        <AppRouting />
                    </HelmetProvider>
                </SettingsProvider>
            </QueryClientProvider>
        </StrictMode>
    );
}
