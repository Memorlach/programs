import { createApiClient } from '@/api/factory/apiFactory';

class MtsClient {
    private client = createApiClient('mts');

    listMts({ length = 10 , start = 0 , keyword, active, is_exa, destination }: SearchMts): Promise<MtsSearchInterface[]> {
        return this.client.get<MtsSearchInterface[]>('api/search', {
            export: 'datatables',
            length: length,
            start: start,
            keyword: keyword,
            status: active ? 1 : 0,
            is_exa: is_exa ? 1 : 0,
            destination: destination
        });
    }
}

export const mtsClient = new MtsClient();
