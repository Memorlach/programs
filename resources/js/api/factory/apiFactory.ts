import { ApiClient } from '@/api/clients/ApiClient';

type ApiType = 'mts' | 'orders';

const apiConfigurations: Record<ApiType, any> = {
    mts: {
        baseUrl: 'http://bloqueos-api-mts.mt:8888/',
        defaultHeaders: {
            'content-type': 'application/json',
            'access-control-allow-origin': '*',
            accept: 'application/json, text/javascript, */*; q=0.01',
            Authorization:
                'Bearer eyJpdiI6IktVNGNHZ0ZEN1JmbGhQUDlBUzZmTGc9PSIsInZhbHVlIjoiclJkRmE3eXF0c0REUmNnSkFxdXVlZ1NIeFVVeW8xUHEyYVNyM0FtTnBXUW5Dd2NXYlpBb1NpRytZVExJS3QzaEQvWlJMZFpVWHo4Mm9FQklMSUdzU2Y1UjhmVEZFdlk4Yi9qNGtscUpvQ3pKeDNrYW9rWHZsVVJPZldzOWxtTzJ3R3JwRklYTlZhcmh0YXM2bGdONFZ3PT0iLCJtYWMiOiJkZjZmZWUwZTNiMzUzZjI5MzcyNWM4NzUzOTVjMmQ4MmViZDdkM2YwYzdjN2U3NWE1YjM2NzVmYjA5MDJjODc2IiwidGFnIjoiIn0=',
            'Content-Type': 'application/json',
        },
    },

    orders: {
        baseUrl: 'http://bloqueos-api-mts.mt:8888/',
        defaultHeaders: {
            accept: 'application/json, text/javascript, */*; q=0.01',
            Authorization:
                'Bearer eyJpdiI6IklrUmVYaGZoRjRTenN2L3V6dU5oV1E9PSIsInZhbHVlIjoiV05OT1Y3a0JEcFAzRWRKbjQ2eTZFS0Y2VHZJaTBEaU9rTDdzbUUyVXF0d1VTdWl3Tzh1Tm9PSGNjRWNpdTdGNFFPVFNnTXc0TDQ2ZEs1KzlvSmlSWjNLNzRROHEweGViWllHTE52ZjBBTUlTVVZDSno1VzBpbkplU2VQV1VidlNtQ1hkMDFLZTQvR2hCTTV3dS9tb2N3PT0iLCJtYWMiOiJkYTk4ZWVlZTMwZjI5ZjI0MTk0MDU2NDI2Njc4Zjc0NDgzYmY0YjJkZDc4OGJkNzUxODY2MzJiMGRhN2M2MDcyIiwidGFnIjoiIn0=',
            'Content-Type': 'application/json',
        },
    },
};

const clientsCache: Partial<Record<ApiType, ApiClient>> = {};

export function createApiClient(type: ApiType): ApiClient {
    if (clientsCache[type]) {
        return clientsCache[type]!;
    }

    const config = apiConfigurations[type];
    const client = new ApiClient(config);
    clientsCache[type] = client;

    return client;
}
