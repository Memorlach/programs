import { createApiClient } from '@/api/factory/apiFactory';

export default class OperatorClient{
    private client = createApiClient('mts');

    listOperator({length = 10, start = 0, keyword, active, destination }: SearchOperatorInterface): Promise <OperatorDataTableInterface> {
        return this.client.get<OperatorDataTableInterface>('api/operators', {
            export: 'datatables',
            length: length,
            start: start,
            keyword: keyword,
            status: active ? '1 ': 'all',
            destination: destination
        })
    }
    statusOperator(id: string): Promise<OperatorInterface> {
        return this.client.get<OperatorInterface>('api/operators/' + id + '/status');
    }
}