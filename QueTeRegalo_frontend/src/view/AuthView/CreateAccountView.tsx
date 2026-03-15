import { Link } from "react-router-dom";
import ErrorsMessage from "../../componets/ErrorMessage";
import { useForm } from "react-hook-form";
import type { UserRegisterForm } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../api/AuthApi";
import { toast } from "react-toastify";
import Logo from "../../componets/Logo";




export default function CreateAccountView() {
    //declaramos la inicializacion del formulario
    const initialValues : UserRegisterForm= {
        name: "",
        email: "",
        password : "",
        password_confirmation : ""
    }
    

    // creamos el useForm
    const {register,handleSubmit, formState: {errors}, watch, reset} = useForm({defaultValues:initialValues})
    const password = watch('password')

    // llamamos a la Api
    const {mutate} = useMutation({
        mutationFn: createUser,
        onError : (errors)=>{
            toast.error(errors.message)
        },
        onSuccess : ()=>{
            toast.success('Cuenta Registrada, comprueba tu Email')
            reset()
            
        }
    })


    const crearUsuario = (formData:UserRegisterForm)=> mutate(formData)
        
    

  
  return (
    <>
        <h1 className="text-4xl font-black text-white"><span className="items-center"><Logo/></span>Crear Cuenta</h1>
        <p className="text-2xl font-bold text-[#ff7a70] mt-5 ">
          Rellena el formulario
        </p>
        <form
        onSubmit={handleSubmit(crearUsuario)}
        className="space-y-8 p-10 mt-8 bg-[#ffe8b5] rounded-2xl"
        noValidate
        >
        <div className="flex flex-col gap-5">
            <label className="font-normal text-2xl text-black">Nombre</label>

            <input
              id="name"
              type="name"
              placeholder="Tu Nombre"
              className="w-full p-3 bg-[#fff8f0] border  border-[#006d77] rounded"
              {...register("name", {
                required: "El Nombre es obligatorio",
              })}
            
            />
            {errors.name && (
              <ErrorsMessage>{errors.name.message}</ErrorsMessage>
            )}
        </div>    
        <div className="flex flex-col gap-5">
            <label className="font-normal text-2xl text-black">Email</label>

            <input
              id="email"
              type="email"
              placeholder="Tu Email"
              className="w-full p-3 bg-[#fff8f0] border  border-[#006d77] rounded"
              { ...register("email", {
                required: "El Email es obligatorio",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "E-mail no válido",
                },
              })}
            
            />
            {errors.email && (
              <ErrorsMessage>{errors.email.message}</ErrorsMessage>
            )}
        </div>
            
        <div className="flex flex-col gap-5">
            <label className="font-normal text-2xl text-black">Password</label>

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-[#fff8f0] border  border-[#006d77] rounded"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            
            />
            {errors.password && (
              <ErrorsMessage>{errors.password.message}</ErrorsMessage>
            )}
        </div>
        <div className="flex flex-col gap-5">
            <label className="font-normal text-2xl text-black">Confirmar Password</label>

            <input
            id="password_confirmation"
            type="password"
            placeholder="Repite Password de Registro"
            className="w-full p-3 bg-[#fff8f0] border  border-[#006d77] rounded"
            {...register("password_confirmation", {
              required: "Repetir Password es obligatorio",
              validate: value => value === password || 'Los Passwords no son iguales'
            })}
            
            />
            {errors.password_confirmation && (
              <ErrorsMessage>{errors.password_confirmation.message}</ErrorsMessage>
            )}
        </div>

          <input
            type="submit"
            value="Registar Usuario"
            className="bg-[#ff6f61] hover:bg-[#006d77] w-full p-3 text-white font-black text-xl cursor-pointer"
          />
        </form>
        <nav className="mt-10 flex flex-col space-y-4">
          <Link
            to={"/auth/login"}
            className="text-center text-gray-300 font-normal"
          >
            Si ya tienes cuenta. Inicia Sesión
          </Link>
          
        </nav>
        
    </>
    
    
    
  )
}
