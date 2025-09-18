import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import MtsClient from "@/api/services/MtsClient";
import {ProgramRouteParams} from "@/routing/types/routes.types";

interface MtsProps {
    title: string;
}

export function EditProgram({ title }: MtsProps) {

    const [program, setProgram] = useState<ProgramInterface>({
        clv: '',
        is_exa: '',
        name: '',
        private: '',
        departureDate: new Date(),
        departureTime: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        expiration: new Date(),
        destination: {
            name: '',
            uid: ''
        },
        days: 0,
        nights: 0,
        status: {
            name: '',
            id: 0,
        }
    });
    const client_mts = new MtsClient();
    const { clv_program } = useParams<ProgramRouteParams>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function getProgram(){
                const data = await client_mts.getProgram( String(clv_program) );
                setProgram(data);
                console.log(data)
                setLoading(false);
        }
        getProgram();
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProgram(prevProgram => ({
            ...prevProgram,
            [name]: value
        }));
    };

    const HandleSubmit = async (data: any) => {

    }

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <form onSubmit={async ()=>{HandleSubmit}}>
                <div className="form-group">
                    <label>Nombre del Programa</label>
                </div>
            </form>
        </div>
    );
}