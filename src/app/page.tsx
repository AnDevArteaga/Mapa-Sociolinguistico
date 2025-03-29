

import { Communes } from "@/components/communes"

import { MapDisplay } from "@/components/map-diaplay"
import { Terms } from "@/components/terms"

export default async function Home() {

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">Mapa sociolingüístico interactivo de la ciudad de Montería</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MapDisplay />
          </div>

          <div className="space-y-6">
            <Communes />
            <Terms />
          </div>
        </div>
      </main>
    </div>
  )
}