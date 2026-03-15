import { useForm } from "react-hook-form"
import ProfileForm from "../../componets/Profile/ProfileForm"
import { useAuth } from "../../hooks/UseAuth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createProfile } from "../../api/ProfileApi"
import { toast } from "react-toastify"
import type { ProfileFormData } from "../../types"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"





export default function ProfileCreateView() {

    // useAuth para poder crear un perfil es necesario estar autenticado
    const {data, isLoading} = useAuth()
    
    // useForm
    const {register, handleSubmit, formState : {errors}, reset} = useForm<ProfileFormData>()

    // navigate para volver al menu
    const navigate = useNavigate()

    //cargamos el nombre y los demas campos en el form con useEffect
    useEffect(()=>{
        if(data){
            reset({
                name: data.name,
                shirtSize : '',
                pantSize : '',
                shoeSize: ''
            })
        }
    }, [data, reset])

    // useQueryCliente para invalidar el query cuando se crea el perfil
    const queryClient = useQueryClient()

    // llamamos a la api
    const {mutate} = useMutation({
        mutationFn : createProfile,
        onError : (error) =>{
            toast.error(error.message)
        },
        onSuccess : (data)=>{
            toast.success(data)
            queryClient.invalidateQueries({queryKey:['profile']})
            navigate('/')
        }
    })

    // generamosl el submit
    const handleCreateProfile = (formData: ProfileFormData)=> mutate(formData)

    if(isLoading) return 'Cargando...'
    if(data) return (
    <>
        <div className="mx-auto max-w-3xl g">
              <h1 className="text-5xl font-black text-[#fff8]">Tu Perfil</h1>
              <p className="text-2xl font-light text-[#ff7a70] mt-5">Crea tu Perfil</p>
              <form onSubmit={handleSubmit(handleCreateProfile)} className="p-10 bg-[#ffe8b5] mt-14 space-y-5 rounded-2xl ">
        
              <ProfileForm
                errors={errors}
                register={register}
              />
        
              <input
                type="submit"
                value="Crear Perfil"
                className=" bg-[#025961] hover:bg-[#ff6f61] w-full p-3  text-[#fff8f0] hover:text-white font-black  text-xl cursor-pointer rounded"
              />
        
            </form>
        
            </div>
    
    
    
    
    </>
  )
}

