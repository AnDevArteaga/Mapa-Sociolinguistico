"use client";

import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { communeData } from "@/lib/data";

export function MapDisplay() {
    const [selectedCommune, setSelectedCommune] = useState<string | null>(null);

    // Subscribe to commune changes from localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            const commune = localStorage.getItem("selectedCommune");
            setSelectedCommune(commune);
        };

        // Initial check
        handleStorageChange();

        // Listen for changes
        window.addEventListener("storage", handleStorageChange);

        // Custom event for same-tab communication
        window.addEventListener("communeChanged", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("communeChanged", handleStorageChange);
        };
    }, []);

    // Get the current map URL based on selected commune
    const getCurrentMapUrl = () => {
        if (!selectedCommune || selectedCommune === "monteria") {
            return "https://www.google.com/maps/d/embed?mid=1Z3zNCXWCoFiz-3CXLTI--4yoougXbSqd&ehbc=2E312F";
        }

        const commune = communeData.find((c) => c.id === selectedCommune);
        return commune?.mapUrl ||
            "https://www.google.com/maps/d/embed?mid=1Z3zNCXWCoFiz-3CXLTI--4yoougXbSqd&ehbc=2E312F";
    };

    // Get the title based on selected commune
    const getTitle = () => {
        if (!selectedCommune || selectedCommune === "monteria") {
            return "Mapa de Montería";
        }

        const commune = communeData.find((c) => c.id === selectedCommune);
        return `Mapa de ${'la ' + commune?.name || "Montería"}`;
    };

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="text-blue-500">{getTitle()}</CardTitle>
                <CardDescription>
                    {!selectedCommune || selectedCommune === "monteria"
                        ? "Vista general de la ciudad"
                        : `Visualización detallada de la Comuna ${
                            selectedCommune.replace("comuna-", "")
                        }`}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="aspect-video w-full overflow-hidden rounded-md border">
                    <iframe
                        src={getCurrentMapUrl()}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title={getTitle()}
                    >
                    </iframe>
                </div>
            </CardContent>
        </Card>
    );
}
