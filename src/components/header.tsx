import Link from "next/link";
import { UserNav } from "@/components/user-nav";
import { MapPinCheck } from "lucide-react";

export function Header() {
    return (
        <header className="border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-primary-foreground font-bold">
                            M
                        </div>
                        <span className="font-bold text-lg text-gray-700">Montería Maps</span>
                        <MapPinCheck className="w-5 h-5 text-gray-700" />
                    </Link>
                </div>

                <div className="flex items-center gap-4">


                    <UserNav />
                </div>
            </div>
        </header>
    );
}
