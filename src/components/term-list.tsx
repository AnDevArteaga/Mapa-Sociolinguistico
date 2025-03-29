"use client";

import { Button } from "@/components/ui/button";
import type { Term } from "@/interfaces/Terms.interface";
import { Edit } from "lucide-react";

interface TermListProps {
    terms: Term[];
    onEdit: (term: Term) => void;
}

export function TermList({ terms, onEdit }: TermListProps) {
    console.log('terms', terms)
    // Agrupar términos por nombre y almacenar comunas únicas
    const groupedTerms = terms.reduce<
        Record<string, { id: string; communes: string[] }>
    >(
        (acc, term) => {
            if (!acc[term.name]) {
                acc[term.name] = { id: term.id, communes: [] };
            }
            console.log(term)
            // Obtener nombre de comuna formateado
            const communeName = term.communeId === "Montería"
            ? "Todas"
            : term.communeId.replace("comuna-", "");


            if (!acc[term.name].communes.includes(communeName)) {
                acc[term.name].communes.push(communeName);
            }

            return acc;
        },
        {},
    );

    return (
        <div className="space-y-4">
            {Object.keys(groupedTerms).length === 0
                ? (
                    <div className="text-center py-8 text-muted-foreground">
                        No hay términos disponibles. Agregue uno nuevo.
                    </div>
                )
                : (
                    <div className="rounded-md border divide-y">
                    
                        {Object.entries(groupedTerms).map((
                            [name, { id, communes }],
                        ) => (
                            <div
                                key={id}
                                className="flex items-center justify-between p-4 hover:bg-muted/50"
                            >
                                <div>
                                    <h3 className="font-medium text-gray-800">{name}</h3>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {communes.join(", ")}
                                    </p>
                                </div>
                                <Button
                                    variant="default"
                                    size="icon"
                                    onClick={() =>
                                        onEdit({
                                            id,
                                            name,
                                            communeId: communes.join(", "),
                                        })}
                                >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Editar</span>
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
        </div>
    );
}
