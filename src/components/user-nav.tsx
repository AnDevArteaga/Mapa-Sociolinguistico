"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";



export function UserNav() {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    const isAdminRoute = pathname?.startsWith("/admin") || pathname === "/login";

    useEffect(() => {
        // Check login status on client side
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        const email = localStorage.getItem("userEmail") || "";
        setIsLoggedIn(loggedIn);
        setUserEmail(email);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        setIsLoggedIn(false);
        setUserEmail("");
        router.push("/");
    };

    if (isAdminRoute) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src="/placeholder.svg?height=32&width=32"
                            alt="Usuario"
                        />
                        <AvatarFallback>
                            <User className="h-4 w-4 text-blue-500" />
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                {isLoggedIn
                    ? (
                        <>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Usuario
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {userEmail}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    onClick={() =>
                                        router.push("/configuracion")}
                                >
                                    Configuración
                                </DropdownMenuItem>
                                <DropdownMenuItem>Perfil</DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout}>
                                Cerrar sesión
                            </DropdownMenuItem>
                        </>
                    )
                    : (
                        <>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        Acceso
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        Inicie sesión para administrar
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => router.push("/login")}
                            >
                                Iniciar sesión
                            </DropdownMenuItem>
                        </>
                    )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
