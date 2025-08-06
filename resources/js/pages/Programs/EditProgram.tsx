import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import MtsClient from "@/api/services/MtsClient";
import {ProgramRouteParams} from "@/routing/types/routes.types";

interface MtsProps {
    title: string;
}

export function EditProgram({ title }: MtsProps) {
    const { program, setProgram } = useState<ProgramInterface | undefined>();
    const client_mts = new MtsClient();
    const { clv_program } = useParams<ProgramRouteParams>();

    useEffect(() => {
        async function getProgram(){
            const data = await client_mts.getProgram(clv_program);

            setProgram(data);
        }

        getProgram();
    });


    return <div>Edit Program</div>;
}