import { ApiClient } from '@/api/clients/ApiClient';
import { getTokenBloqueos } from "@/providers/auth-provider";

const apiConfigurations: Record<string, any> = {
    mts: {
        baseUrl: 'http://bloqueos-api-mts.mt:8888/',
        use_token_bloqueos: true,
        defaultHeaders: {
            'content-type': 'application/json',
            accept: 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/json',
        },
    },

    orders: {
        baseUrl: 'http://bloqueos-api-mts.mt:8888/',
        use_token_bloqueos: true,
        defaultHeaders: {
            accept: 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/json',
        },
    },
};

const clientsCache: Partial<Record<string, ApiClient>> = {};

export function createApiClient(type: string): ApiClient {
    if (clientsCache[type]) {
        return clientsCache[type]!;
    }

    const token = getTokenBloqueos();
    const config = apiConfigurations[type];
    const client = new ApiClient(config);

    if(apiConfigurations[type]?.use_token_bloqueos && token !== '') {
        client.setTokenBloqueos(token);
        clientsCache[type] = client;
    }

    return client;
}
