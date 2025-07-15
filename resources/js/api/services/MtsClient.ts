import { createApiClient } from '@/api/factory/apiFactory';

class MtsClient {
    private client = createApiClient('mts');

    listMts(): Promise<Mts[]> {
        return this.client.get<Mts[]>('api/search');
    }
}

export const mtsClient = new MtsClient();
