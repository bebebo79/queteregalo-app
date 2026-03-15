import type { FieldErrors, UseFormRegister } from "react-hook-form"
import type {  Category,PresentFormData} from "../../types"
import ErrorsMessage from "../ErrorMessage"



type PresentFormProps = {
    errors : FieldErrors<PresentFormData>
    register : UseFormRegister<PresentFormData>
    categories : Category[]
}

export default function PresentForm({errors, register, categories}: PresentFormProps) {


  return (
    <>
            <div className="flex flex-col gap-5">
                <label className="font-normal text-2xl" htmlFor="category">
                    Categoría:
                </label>
                <select 
                    id="categoryId"
                    className="w-full p-3 border-gray-300 border bg-white"
                    {...register("categoryId", { // Registramos el nombre según tu Schema
                        required: "La categoría es obligatoria"
                    })}
                 
                >
                    <option value="0">-- Seleccione una Categoría --</option>
                    
                    {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                                {cat.name}
                    </option>
                    ))}
                            
                    
                </select>
                {errors.categoryId && (
                    <ErrorsMessage>{errors.categoryId.message}</ErrorsMessage>
                )}
            </div>
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="description"
                >Descripción del regalo</label>
                <textarea
                    id="description"
                    placeholder="Descripción del regalo"
                    className="w-full p-3  border-gray-300 border"
                    {...register("description", {
                        required: "La descripción del regalo es obligatorio"
                    })}
                />
                {errors.description && (
                    <ErrorsMessage>{errors.description.message}</ErrorsMessage>
                )}
            </div>
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="option"
                >Eliga una opcion:
                </label>
                <select id="option" 
                 {...register('option', {
                    required: "tienes que elegir una opicion"
                })}
               >
                    <option value=''>--- Selecciona una Opcion -----</option>    
                    <option value="deseable" className="text-green-500 font-bold">deseable</option>
                    <option value="evitable" className="text-red-600 font-bold">evitar</option>
                </select>
                

                {errors.option && (
                    <ErrorsMessage>{errors.option.message}</ErrorsMessage>
                )}
            </div>
    
    
    
    </>
  )
}
