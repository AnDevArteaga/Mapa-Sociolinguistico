"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { login } from "@/utils/login"
import { toast } from "sonner";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
      
        try {
          const response = await login({ username: user, password });
      
          if (response.success) {
            // Guardar sesión exitosa en localStorage
            localStorage.setItem("session", 'success');
            router.push("/configuracion");
          } else {
            toast("Credenciales incorrectas", 
                {
                    description: "Verifique sus datos",
                    icon: <AlertCircle className="text-red-600 w-6 h-6" />,
                }
            );
          }
        } catch (error) {
          toast("Error al iniciar sesión",  {
            description: "Notificación más llamativa",
            className: "text-lg border border-red-500 bg-gray-900 text-white",
          });
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-muted px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-gray-800">
                        Iniciar sesión
                    </CardTitle>
                    <CardDescription>
                        Ingrese sus credenciales para acceder al panel de
                        configuración
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        {error && (
                            <Alert variant="destructive">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="user" className="text-gray-800">Usuario</Label>
                            <Input
                                id="user"
                                type="text"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-gray-800">Contraseña</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
