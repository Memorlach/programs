import { createApiClient } from '@/api/factory/apiFactory';

class MtsClient {
    private client = createApiClient('mts');

    listMts({ length = 10 , start = 0 , keyword, active, is_exa, destination }: SearchMtsInterface): Promise<MtsDataTableInterface> {
        return this.client.get<MtsDataTableInterface>('api/search', {
            export: 'datatables',
            length: length,
            start: start,
            keyword: keyword,
            status: active ? 1 : 'all',
            is_exa: is_exa ? 1 : 0,
            destination: destination
        });
    }

     async getDestinations(): Promise<DestinationInterface[]>{
        return await this.client.get<DestinationInterface[]>('api/destinations');
    }
}

export const mtsClient = new MtsClient();
