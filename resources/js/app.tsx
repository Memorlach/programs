import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { AppRouting } from "./routing/app-routing";
import {SettingsProvider} from "@/providers/settings-provider";
import {HelmetProvider} from "react-helmet-async";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {AuthProvider} from "@/providers/auth-provider";

const container = document.getElementById('app');

if(container){
    const root = createRoot(container!);

    const queryClient = new QueryClient();

    const user = container.dataset.user ? JSON.parse(container.dataset.user) : null;

    root.render(
        <StrictMode>
            <AuthProvider user={user}>
                <QueryClientProvider client={queryClient}>
                    <SettingsProvider>
                        <HelmetProvider>
                            <AppRouting />
                        </HelmetProvider>
                    </SettingsProvider>
                </QueryClientProvider>
            </AuthProvider>
        </StrictMode>
    );
}
