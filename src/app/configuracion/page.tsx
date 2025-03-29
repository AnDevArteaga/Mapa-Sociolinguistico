"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { TermList } from "@/components/term-list";
import { AddTermForm } from "@/components/add-term-form";
import { EditTermForm } from "@/components/edit-term-form";
import { communeData } from "@/lib/data";
import { Term } from "@/interfaces/Terms.interface";
import { getData } from "@/utils/termsApi";

export default function ConfiguracionPage() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [terms, setTerms] = useState<Term[]>([]);
    const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isScrollBlocked, setIsScrollBlocked] = useState(false);

    // Función para obtener los términos desde la fuente de datos
    const fetchTerms = async () => {
        const rawTerms = await getData();
        const formattedTerms: Term[] = rawTerms.map((term: Array<string>) => ({
            id: term[0] || `term-${Date.now()}`,
            name: term[1] || "Sin nombre",
            communeId: term[2] || "",
        }));

        setTerms(formattedTerms);
        localStorage.setItem("termData", JSON.stringify(formattedTerms));
    };

    useEffect(() => {
        const session = localStorage.getItem("session");
        if (!session) {
            router.push("/login");
        } else {
            fetchTerms();
            setIsLoggedIn(true);
        }
    }, [router]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
                document.body.style.overflow = "hidden";
                setIsScrollBlocked(true);
            }
        };

        if (!isScrollBlocked) {
            window.addEventListener("scroll", handleScroll);
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.body.style.overflow = "auto";
        };
    }, [isScrollBlocked]);

    const handleAddTerm = async () => {
        await fetchTerms();
    };

    const handleEditTerm = (term: Term) => {
        setSelectedTerm(term);
        setIsEditing(true);
    };

    const handleUpdateTerm = async () => {
        await fetchTerms();
        setIsEditing(false);
        setSelectedTerm(null);
    };

    const handleDeleteTerm = async () => {
        await fetchTerms();
        setIsEditing(false);
        setSelectedTerm(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        router.push("/");
    };

    if (!isLoggedIn) {
        return null;
    }

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <div className="container mx-auto py-8 px-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-700">
                        Panel de Configuración
                    </h1>
                    <Button variant="outline" onClick={handleLogout}>
                        Cerrar sesión
                    </Button>
                </div>
                <Tabs defaultValue="terms">
                    <TabsContent value="terms">
                        <div className="grid grid-cols- md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 ">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-blue-500">
                                            Términos
                                        </CardTitle>
                                        <CardDescription>
                                            Administre los términos que aparecen en el mapa interactivo
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="max-h-96 overflow-y-auto">
                                        <TermList
                                            terms={terms}
                                            onEdit={handleEditTerm}
                                        />
                                    </CardContent>
                                </Card>
                            </div>

                            <div>
                                {isEditing && selectedTerm ? (
                                    <EditTermForm
                                        term={selectedTerm}
                                        communes={communeData}
                                        onUpdate={handleUpdateTerm}
                                        onDelete={handleDeleteTerm}
                                        onCancel={() => {
                                            setIsEditing(false);
                                            setSelectedTerm(null);
                                        }}
                                    />
                                ) : (
                                    <AddTermForm
                                        communes={communeData}
                                        onAdd={handleAddTerm}
                                    />
                                )}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
