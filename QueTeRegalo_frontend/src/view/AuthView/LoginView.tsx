import { Link, useNavigate} from "react-router-dom";

import { useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import Logo from "../../componets/Logo";
import { authenticateUser } from "../../api/AuthApi";
import type { UserLoginForm } from "../../types";
import ErrorsMessage from "../../componets/ErrorMessage";




export default function LoginView() {

  //iniciamos el formulario
  const initialValues: UserLoginForm = {
    email :"",
    password : ""
  }

  

  //usamos useForm para validar el formulario
  const {register,handleSubmit, formState:{errors}} = useForm({defaultValues: initialValues})
  
  //usamos el navigate para enlazar con el dashboard
  const navigate = useNavigate()


  //usamos useMutation para llamar a la api
  const {mutate} = useMutation({
    mutationFn : authenticateUser,
    onError : (error)=>{
      toast.error(error.message)
    },
    onSuccess : ()=>{
      toast.success('Iniciando Sesion')
      navigate('/')

    }
  })

  // la funcion para llamar a la api
  
  const handleLogin = (formData:UserLoginForm)=> mutate(formData)


  return (
    <> 
        <h1 className="text-4xl font-black text-white"><span className="items-center"><Logo/></span>Inicia Sesión </h1>
        <p className="text-2xl font-bold text-[#FF7A70] mt-5 ">
          Introduce tu email y contraseña
        </p>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="space-y-8 p-10 mt-8 bg-[#FFE8B5] rounded-2xl"
          noValidate
        >
          <div className="flex flex-col gap-5">
            <label className="font-normal text-2xl text-black">Email</label>

            <input
              id="email"
              type="email"
              placeholder="Email de Registro"
              className="w-full p-3 bg-[#fff8f0] border border-[#006d77] text-black rounded "
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
              placeholder="Password de Registro"
              className="w-full p-3 bg-[#fff8f0] border  border-[#006d77] text-black rounded"
              {...register("password", {
                required: "El Password es obligatorio",
              })}
            
            />
            {errors.password && (
              <ErrorsMessage>{errors.password.message}</ErrorsMessage>
            )}
          </div>

          <input
            type="submit"
            value="Iniciar Sesión"
            className="bg-[#ff6f61] hover:bg-[#025961] w-full p-3  text-[#fff8f0] hover:text-white font-black  text-xl cursor-pointer"
          />
        </form>
        <nav className="mt-10 flex flex-col space-y-4">
          <Link
            to={"/auth/create-account"}
            className="text-center text-gray-300 font-normal"
          >
            ¿No tienes Cuenta? Crea una Cuenta
          </Link>
          <Link
            to={"/auth/forgot-password"}
            className="text-center text-gray-300 font-normal"
          >
            ¿Olvidaste tu contraseña? Reestablece tu Password
          </Link>
        </nav>
        
    </>
  );
}

    
    
  
  

