import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { createPresent } from "../../api/PresentsApi"
import { toast } from "react-toastify"
import PresentForm from "../../componets/Presents/PresentForm"
import type { PresentFormData } from "../../types"
import { useCategories } from "../../hooks/UseCategory"




export default function PresentCreateView() {

// usamos el hook que hemos generado para las categorias
const { data: categories, isLoading } = useCategories()


//usamos el useForm para el formulario
const {register,handleSubmit,formState:{errors}, reset} = useForm<PresentFormData>({
  defaultValues:{
    categoryId: 0,
    description : '',
    option: '' 
  }
})
// naviigate para volver al dashboard
const navigate = useNavigate()

//llamar a la api para crear el regalo
const {mutate} = useMutation({
  mutationFn: createPresent,
  onError :(error)=>{
    toast.error (error.message) 
  },
  onSuccess : (data)=>{
    toast.success(data)
    reset()
    navigate('/')
  }
})

//generamos el submit
const handleCreatePresent = (formData: PresentFormData)=>mutate(formData)


  if(isLoading) return 'Cargando...'
  return (
    <>
        <h1 className="text-5xl font-black text-[#006d77]">Mi lista de Regalos</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Añade Regalos a tu lista
        </p>

        <nav className="my-5">
          <Link
            className="bg-[#025961] hover:bg-[#235d63] w-full p-3  text-[#fff8f0] hover:text-white font-black  text-xl cursor-pointer rounded"
            to="/"
          >
            Volver al Menu
          </Link>
        </nav>
        <form className="p-10 bg-[#ffe8b5] mt-14 space-y-5 rounded-2xl "
              onSubmit={handleSubmit(handleCreatePresent)}
              >
          <PresentForm
            errors ={errors}
            register={register}
            categories={categories ?? []}
          />

          <input
                type="submit"
                value="Añadir Regalo"
                className=" bg-[#025961] hover:bg-[#ff6f61] w-full p-3  text-[#fff8f0] hover:text-white font-black  text-xl cursor-pointer rounded"
              />       

        </form>
    
    </>
  )
}

