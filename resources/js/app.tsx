import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { AppRouting } from "./routing/app-routing";
import {SettingsProvider} from "@/providers/settings-provider";
import {HelmetProvider} from "react-helmet-async";

const container = document.getElementById('app');

if(container){
    const root = createRoot(container!);

    root.render(
        <StrictMode>
            <SettingsProvider>
                <HelmetProvider>
                    <AppRouting />
                </HelmetProvider>
            </SettingsProvider>
        </StrictMode>
    );
}
