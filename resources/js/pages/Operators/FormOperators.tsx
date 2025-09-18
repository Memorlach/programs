import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface OperatorFormProps {
    operator?: OperatorInterface;
    onSubmit: (operatorData: OperatorInterface) => void;
    onCancel: () => void;
}

interface MtsProps {
    title: string;
}

type FormOperatorsProps = OperatorFormProps & MtsProps;


const FormOperators: React.FC<FormOperatorsProps> = ({ operator, onSubmit, onCancel, title } ) => {
    const [formData, setFormData] = useState<OperatorInterface>({
        id: operator?.id || "",
        currency_id: operator?.currency_id || "",
        code: operator?.code || "",
        name: operator?.name || "",
        phone: operator?.phone || "",
        email: operator?.email || "",
        country: operator?.country || "",
        type: operator?.type || "",
        logo: operator?.logo || "",
        status: operator?.status || "1",
        code_alfa: operator?.code_alfa || "",
        destination: operator?.destination || { name: "", uid: "" },
        currency: operator?.currency || { id: "", name: "" },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            destination: {
                ...prev.destination,
                [name]: value,
            },
        }));
    };

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            currency: {
                ...prev.currency,
                [name]: value,
            },
        }));
    };

    const submitForm = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (

        <form onSubmit={submitForm} className="space-y-4 max-w-md">
            <div>{title}
                <label className="block font-medium">Nombre</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input"
                />
            </div>

            <div>
                <label className="block font-medium">Código</label>
                <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    required
                    className="input"
                />
            </div>

            <div>
                <label className="block font-medium">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                />
            </div>

            <div>
                <label className="block font-medium">Teléfono</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input"
                />
            </div>

            <div>
                <label className="block font-medium">País</label>
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="input"
                />
            </div>

            <div>
                <label className="block font-medium">Tipo</label>
                <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="input"
                />
            </div>

            <div>
                <label className="block font-medium">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="input">
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                </select>
            </div>

            <div>
                <label className="block font-medium">Código Alfa</label>
                <input
                    type="text"
                    name="code_alfa"
                    value={formData.code_alfa}
                    onChange={handleChange}
                    className="input"
                />
            </div>

            <div>
                <label className="block font-medium">Destino - Nombre</label>
                <input
                    type="text"
                    name="name"
                    value={formData.destination.name}
                    onChange={handleDestinationChange}
                    className="input"
                />
            </div>

            <div>
                <label className="block font-medium">Moneda - Nombre</label>
                <input
                    type="text"
                    name="name"
                    value={formData.currency.name}
                    onChange={handleCurrencyChange}
                    className="input"
                />
            </div>


            <div className="flex gap-2 mt-4">
                <Button type="submit" variant="primary">
                    Guardar
                </Button>
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Cancelar
                </Button>
            </div>
        </form>
    );
};

export default FormOperators;
