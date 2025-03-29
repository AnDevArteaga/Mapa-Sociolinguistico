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
import { Term } from "@/interfaces/Terms.interface";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Save, Trash2 , Edit } from "lucide-react";
import { updateTermToApi } from "@/utils/termsApi";
import { toast } from "sonner";
import { deleteTermToApi } from "@/utils/termsApi";

interface EditTermFormProps {
    term: Term;
    communes: Commune[];
    onUpdate: () => void;
    onDelete: () => void;
    onCancel: () => void;
}

export function EditTermForm(
    { term, communes, onUpdate, onDelete, onCancel }: EditTermFormProps,
) {
    const [name, setName] = useState(term.name);
    const [selectedCommunes, setSelectedCommunes] = useState<string[]>(
        term.communeId ? term.communeId.split(",").map((c) => c.trim()) : [],
    );
    console.log("term en edit", term);
    console.log("communes en edit", communes);
    console.log("selectedCommunes en edit", selectedCommunes);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || selectedCommunes.length === 0) {
            return;
        }
        // Datos para enviar al API
        const apiData = {
            palabraEditada: name,
            comunasSeleccionadas: selectedCommunes,
        };

        // Enviar datos a la API
        await updateTermToApi(apiData, term.id);
        onUpdate();
        toast("Término actualizado exitosamente", 
            {
                icon: <Edit className="text-blue-500 w-6 h-6" />,
            }
        );
    };

    const handleCommuneToggle = (communeId: string) => {
        setSelectedCommunes((prev) => {
            // Si selecciona "monteria", deselecciona todas las demás
            if (communeId === "monteria") {
                return prev.includes("monteria") ? [] : ["monteria"];
            }
            // Si selecciona otra comuna, elimina "monteria" si estaba seleccionada
            let newSelection = prev.filter((id) => id !== "monteria");

            // Alternar la selección de la comuna
            if (newSelection.includes(communeId)) {
                newSelection = newSelection.filter((id) => id !== communeId);
            } else {
                newSelection.push(communeId);
            }
            console.log("newSelection", newSelection);
            return newSelection;
        });
    };

    const handleDeleteTerm = async () => {
        await deleteTermToApi(term.id);
        toast("Término eliminado exitosamente", 
            {
                icon: <Trash2 className="text-red-400 w-6 h-6" />,
            }
        );
        onDelete();
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-blue-500">Editar Término</CardTitle>
                <CardDescription>
                    Modifique la información del término seleccionado
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-term-name" className="text-gray-800">Nombre</Label>
                        <Input
                            id="edit-term-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className="text-gray-800">Comunas</Label>
                        <div className="border rounded-md p-4 space-y-2">
                            <div className="" />

                            {communes.map((commune) => (
                                <div
                                    key={commune.id}
                                    className="flex items-center space-x-2"
                                >
                                    <Checkbox
                                        id={`commune-${commune.id}`}
                                        checked={selectedCommunes.includes(
                                            commune.name,
                                        )}
                                        onCheckedChange={() =>
                                            handleCommuneToggle(commune.name)}
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
                            <p className="text-sm text-destructive">
                                Seleccione al menos una comuna
                            </p>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between mt-4">
          
                    <Button
                        type="submit"
                        disabled={selectedCommunes.length === 0}
                    >
                        <Save className="h-4 w-4" />
          
                    </Button>
                    <div className="flex space-x-4">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button type="button" variant="destructive">
                                    <Trash2 className="h-4 w-4" />
                                    
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        ¿Está seguro?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Esta acción no se puede deshacer. Esto
                                        eliminará permanentemente el término.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={handleDeleteTerm}
                                    >
                                        Eliminar
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                        >
                            Cancelar
                        </Button>
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
}
