interface MtsInterface {
    clv: string,
    name: string,
    created_at: Date,
    updated_at: Date,
    expiration: Date,
    destination: {
        name: string,
        uid: string
    }
    days: number,
    nights: number,
    bloqueos: number,
    status: {
        name: string,
    }
}

interface MtsSearchInterface {
    data: MtsInterface[],
    recordsTotal: number,
}

interface SearchMts {
    length: number,
    start: number,
    active: boolean,
    keyword: string,
    destination: string,
    is_exa: boolean,
}