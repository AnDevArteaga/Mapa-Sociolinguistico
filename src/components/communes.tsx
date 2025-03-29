"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { communeData } from "@/lib/data";

export function Communes() {
    const [selectedCommune, setSelectedCommune] = useState<string>("monteria");

    // Handle commune selection
    const handleSelectCommune = (communeId: string) => {
        setSelectedCommune(communeId);

        // Store in localStorage for cross-component communication
        localStorage.setItem("selectedCommune", communeId);

        // Dispatch custom event for same-tab communication
        window.dispatchEvent(new Event("communeChanged"));
    };

    // Initialize from localStorage if available
    useEffect(() => {
        const storedCommune = localStorage.getItem("selectedCommune");
        if (storedCommune) {
            setSelectedCommune(storedCommune);
        }
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-blue-500">Comunas</CardTitle>
                <CardDescription>
                    Selecciona una comuna para ver información específica
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-2">
                    <Button
                        variant={selectedCommune === "monteria"
                            ? "default"
                            : "outline"}
                        className="justify-start"
                        onClick={() => handleSelectCommune("monteria")}
                        
                    >
                        Montería (Todas)
                    </Button>

                    {communeData.map((commune) => (
                        <Button
                            key={commune.id}
                            variant={selectedCommune === commune.id
                                ? "default"
                                : "outline"}
                            className="justify-start"
                            onClick={() => handleSelectCommune(commune.id)}
                        >
                            {commune.name}
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
