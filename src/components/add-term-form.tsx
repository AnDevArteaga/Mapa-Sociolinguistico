"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { Commune } from "@/lib/data";
import { Loader2, PlusCircle,CheckCircle, AlertCircle } from "lucide-react";
import { addTermToApi } from "@/utils/termsApi";
import { toast } from "sonner"
interface AddTermFormProps {
    communes: Commune[];
    onAdd: () => void;
}

export function AddTermForm({ communes, onAdd }: AddTermFormProps) {
    const [name, setName] = useState("");
    const [selectedCommunes, setSelectedCommunes] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || selectedCommunes.length === 0) {
            toast("Sin términos o comunas seleccionadas");
            return;
        }

        setIsSubmitting(true);

        try {
            // Preparar datos para el API
            const comunasSeleccionadas = selectedCommunes.map((id) => {
                if (id === "monteria") return "Montería";
                return `${id.replace("comuna-", "")}`;
            });

            // Datos para enviar al API
            const apiData = {
                nuevoTermino: name,
                comunasSeleccionadas: comunasSeleccionadas,
            };

            // Enviar al API
            await addTermToApi(apiData);
            onAdd()
            // Reset form
            setName("");
            setSelectedCommunes([]);

            toast("Término añadido exitosamente", 
                {
                    icon: <CheckCircle className="text-green-600 w-6 h-6" />,
                }
            );
        } catch (error) {
            console.error("Error al añadir término:", error);
            toast("Error al añadir término. Intente nuevamente.", 
                {
                    icon: <AlertCircle className="text-red-600 w-6 h-6" />,
                }
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCommuneToggle = (communeId: string) => {
        setSelectedCommunes((prev) => {
            // Si se selecciona "monteria", deseleccionar todas las demás
            if (communeId === "monteria") {
                return prev.includes("monteria") ? [] : ["monteria"];
            }

            // Si se selecciona otra comuna, quitar "monteria"
            let newSelection = prev.filter((id) => id !== "monteria");

            // Alternar la comuna seleccionada
            if (newSelection.includes(communeId)) {
                newSelection = newSelection.filter((id) => id !== communeId);
            } else {
                newSelection.push(communeId);
            }

            return newSelection;
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-blue-500">Agregar Término</CardTitle>
                <CardDescription>
                    Añada un nuevo término y asígnelo a una o varias comunas
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="term-name" className="text-gray-800">Nombre del Término</Label>
                        <Input
                            id="term-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Ingrese el término"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-800">Comunas</Label>
                        <div className="border rounded-md p-4 space-y-2 max-h-[250px] overflow-y-auto">
                            <div />

                            {communes.map((commune) => (
                                <div
                                    key={commune.id}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={`commune-${commune.id}`}
                                        checked={selectedCommunes.includes(
                                            commune.id,
                                        )}
                                        onCheckedChange={() =>
                                            handleCommuneToggle(commune.id)}
                                        disabled={selectedCommunes.includes(
                                            "monteria",
                                        )}
                                    />
                                    <Label
                                        htmlFor={`commune-${commune.id}`}
                                        className="font-normal text-gray-800"
                                    >
                                        {commune.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {selectedCommunes.length === 0 && (
                            <p className="text-sm text-center mb-2 text-destructive">
                                Seleccione al menos una comuna
                            </p>
                        )}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting || selectedCommunes.length === 0}
                        
                    >
                        {isSubmitting
                            ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Guardando...
                                </>
                            )
                            : (
                                <>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Agregar Término
                                </>
                            )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
