interface ApiType{

}

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

interface MtsDataTableInterface {
    data: MtsInterface[],
    recordsTotal: number,
}

interface SearchMtsInterface {
    length: number,
    start: number,
    active: boolean,
    keyword: string,
    destination: string,
    is_exa: boolean,
}

interface DestinationInterface {
    uid: string,
    name: string
}

interface ProgramInterface{
    clv: string,
    is_exa: string,
    name: string,
    private: string,
    departureDate: Date,
    departureTime: Date,
    created_at: Date,
    updated_at: Date,
    expiration: Date,
    destination: {
        name: string,
        uid: string
    }
    days: number,
    nights: number,
    status: {
        name: string,
        id: number,
    }
}

interface OperatorInterface {
    id: string ;
    currency_id: string ;
    code: string;
    name: string;
    phone: string;
    email: string;
    country: string;
    type: string;
    logo: string;
    status: string;
    code_alfa: string;
    destination: {
        name: string,
        uid: string
    };
    currency: {
        name: string,
        id: string
    };
}

interface OperatorDataTableInterface{
    data: OperatorInterface[],
    recordsTotal: number,
}

interface SearchOperatorInterface{
    length: number,
    start: number,
    active: boolean,
    keyword: string,
    destination: string,
}