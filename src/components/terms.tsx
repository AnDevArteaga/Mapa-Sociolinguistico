"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// Definir la estructura de los términos
export interface Term {
    id: number;
    name: string;
    communeId: string;
}
type DataItem = [number, string, string]; // Un elemento del array principal
type DataArray = DataItem[]; // El array completo

export function Terms() {
    const [selectedCommune, setSelectedCommune] = useState<string | null>(null);
    const [terms, setTerms] = useState<Term[]>([]);
    const [loading, setLoading] = useState(true); // Estado de carga

    // Función para obtener los términos desde el backend
    const fetchTerms = async () => {
        try {
            const response = await fetch("https://edutlasdeveloper.pythonanywhere.com/apim/comunas/palabras"); // Cambia la URL por la correcta
            const data: DataArray = await response.json();
            console.log(data);
            // Convertir la respuesta a la estructura { id, name, communeId }
            const formattedTerms: Term[] = data.map((item) => ({
                id: item[0],         // Primer valor como id
                name: item[1],       // Segundo valor como name
                communeId: item[2],  // Tercer valor como communeId
            }));
            console.log(formattedTerms);
            setTerms(formattedTerms);
            localStorage.setItem("termData", JSON.stringify(formattedTerms)); // Guardar en localStorage
        } catch (error) {
            console.error("Error al obtener los términos:", error);
        } finally {
            setLoading(false); // Finaliza la carga
        }
    };

    // useEffect para cargar los términos cuando se monta el componente
    useEffect(() => {
        fetchTerms();

        const handleStorageChange = () => {
            const commune = localStorage.getItem("selectedCommune");
            setSelectedCommune(commune);
        };

        // Cargar comuna seleccionada al inicio
        handleStorageChange();

        // Escuchar cambios en localStorage
        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("communeChanged", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("communeChanged", handleStorageChange);
        };
    }, []);

    // Filtrar términos según la comuna seleccionada
    const getFilteredTerms = () => {
        if (!selectedCommune || selectedCommune === "monteria") {
            return terms;
        }
        return terms.filter((term) =>
            term.communeId.split(",").map((c) => c.trim()).includes(selectedCommune)
        );    };

    const filteredTerms = getFilteredTerms();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-blue-500">{selectedCommune ? `Términos de ${selectedCommune}` : "Términos Generales"}</CardTitle>
                <CardDescription>
                    {!selectedCommune || selectedCommune === "monteria"
                        ? "Todos los términos de la ciudad"
                        : `Términos específicos de la ${selectedCommune.replace("comuna-", "")}`}
                </CardDescription>
            </CardHeader>
            <CardContent className="max-h-64 overflow-y-auto">
                {loading ? (
                    <div className="text-center py-4 text-muted-foreground">Cargando términos...</div>
                ) : filteredTerms.length > 0 ? (
                    <ul className="space-y-2">
                        {filteredTerms.map((term) => (
                            <li key={term.id} className="border-b pb-2 last:border-0">
                                <div className="font-medium text-gray-700">{term.name}</div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-4 text-muted-foreground">No hay términos disponibles para esta comuna.</div>
                )}
            </CardContent>
        </Card>
    );
}
