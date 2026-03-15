import { Link } from "react-router-dom";
import ErrorsMessage from "../../componets/ErrorMessage";
import { useForm } from "react-hook-form";
import type { UserForgotPassword } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { restablecerPassword} from "../../api/AuthApi";
import { toast } from "react-toastify";
import Logo from "../../componets/Logo";


export default function ForgotPasswordView() {

  //inicio del formulario
  const initialValues : UserForgotPassword = {
    email : ""
  }

  //usamos el useForm
  const {register, formState:{errors}, handleSubmit} = useForm({defaultValues: initialValues})

  //llamamos a la api
  const {mutate} = useMutation({
    mutationFn : restablecerPassword,
    onError : (error)=>{
      toast.error(error.message) 
    },
    onSuccess : ()=>{
      toast.success('Mira tu email y sigue los pasos')
    }

  })

  // generamos la funcion submit
  const handleSolicitarCambioPasseord = (formData:UserForgotPassword)=> mutate(formData)


  return (
    <>
      <h1 className="text-4xl font-black text-white"><span className="items-center"><Logo/></span>Reestablece tu contraseña</h1>
        <p className="text-2xl font-bold text-[#ff7a70] mt-5 ">
          Pon tu email
        </p>
        <form
        onSubmit={handleSubmit(handleSolicitarCambioPasseord)}
        className="space-y-8 p-10 mt-8 bg-[#ffe8b5] rounded-2xl"
        noValidate
        >
           
        <div className="flex flex-col gap-5">
            <label className="font-normal text-2xl text-black">Email</label>

            <input
              id="email"
              type="email"
              placeholder="Tu Email"
              className="w-full p-3 bg-[#fff8f0] border border-[#006d77] text-black  rounded"
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
            
        

          <input
            type="submit"
            value="Enviar"
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
