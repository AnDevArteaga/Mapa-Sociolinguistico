import axios from "axios";

interface CreateTermData {
  nuevoTermino: string
  comunasSeleccionadas: string[]
}

interface UpdateTermData {
  palabraEditada: string
  comunasSeleccionadas: string[]
}


export async function getData() {
    const res = await fetch("https://edutlasdeveloper.pythonanywhere.com/apim/comunas/palabras", {
      cache: "no-store",
    });
    console.log(res)
    if (!res.ok) {
      throw new Error("Error al obtener los datos");
    }
  
    return res.json();
  }


  export const addTermToApi = async (data: CreateTermData): Promise<void> => {
    console.log("Datos a enviar a la API:", data)
    try {
      // Reemplaza esta URL con la URL real de tu API
      await axios.post("https://edutlasdeveloper.pythonanywhere.com/apim/palabras", data)
  
      // Si la API devuelve datos, puedes procesarlos aquí
      console.log("Término añadido exitosamente a la API")
    } catch (error) {
      console.error("Error al añadir término a la API:", error)
      throw error // Re-lanzar el error para manejarlo en el componente
    }
  }

  export const updateTermToApi = async (data: UpdateTermData, id: number): Promise<void> => {
    console.log("Datos a enviar a la API para editar:", data)
    try {
      // Reemplaza esta URL con la URL real de tu API
      await axios.put("https://edutlasdeveloper.pythonanywhere.com/apim/palabras/editar/" + id, data)
  
      // Si la API devuelve datos, puedes procesarlos aquí
      console.log("Término actualizado exitosamente en la API")
    } catch (error) {
      console.error("Error al actualizar término en la API:", error)
      throw error // Re-lanzar el error para manejarlo en el componente
    }
  }
  
export const deleteTermToApi = async (id: number): Promise<void> => {
  
  console.log("Datos a enviar a la API para eliminar:", id);
  try {
    // Reemplaza esta URL con la URL real de tu API
    await axios.delete(
      "https://edutlasdeveloper.pythonanywhere.com/apim/palabras/eliminar/" +
        id,
    );

    // Si la API devuelve datos, puedes procesarlos aquí
    console.log("Término eliminado exitosamente en la API");
  } catch (error) {
    console.error("Error al eliminar término en la API:", error);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};
