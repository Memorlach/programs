import { useState } from "react";
import FormOperators from "@/pages/Operators/FormOperators";
import { OperatorProvider } from '@/pages/Operators/partials/OperatorContext';
import { ListOperators } from './ListOperators';
import { Container } from '@/components/common/container';

export default function OperatorsPage() {
    const [showForm, setShowForm] = useState(false);
    const [editingOperator, setEditingOperator] = useState<OperatorInterface | null>(null);

    const handleCreate = () => {
        setEditingOperator(null);
        setShowForm(true);
    };

    const handleEdit = (operator: OperatorInterface) => {
        setEditingOperator(operator);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingOperator(null);
    };

    const handleSubmit = (data: OperatorInterface) => {
        console.log("Enviar datos:", data);
        setShowForm(false);
        setEditingOperator(null);
    };

    return (
        <OperatorProvider>
            <Container>
                {showForm ? (
                    <FormOperators
                        title={editingOperator ? "Editar operador" : "Crear operador"}
                        operator={editingOperator ?? undefined}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                    />
                ) : (
                    <ListOperators title="Listado de operadores" />
                )}
            </Container>
        </OperatorProvider>
    );
}
