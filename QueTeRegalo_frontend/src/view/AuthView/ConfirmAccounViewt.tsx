import { PinInput } from "@chakra-ui/pin-input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ConfirmToken } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "../../api/AuthApi";
import { toast } from "react-toastify";
import ConfirmacionToken from "../../componets/ConfirmacionToken";
import Logo from "../../componets/Logo";


export default function ConfirmAccountView() {
    // generamos el state
    const [token, setToken]= useState<ConfirmToken['token']>('')

    // usamos navigate para enlazar con login
    const navigate = useNavigate()
    //generamos la consulta a la api
    const { mutate} = useMutation({
        mutationFn : confirmAccount,
        onError : (error)=>{
            toast.error(error.message)
        },
        onSuccess : ()=>{
            toast.success('Cuenta Confirmada, Inicie Sesion')
            navigate('/auth/login')
        }
    })


    //generamos el set state, lo que ponemos se queda en el state
    const handleChange = (token : ConfirmToken['token']) => setToken(token)

    // funcion para llamar la api con mutate
    const handleComplete = (token:ConfirmToken['token'])=>{mutate({token})}
  return (
    <>
    <h1 className="text-5xl font-black text-white"><span className="items-center"><Logo/></span>Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código que recibiste {''}
        <span className=" text-[#ff7a70] font-bold"> por e-mail</span>
      </p>
      <form
        className="space-y-8 p-10 bg- text-[#ffe8b5] mt-10 rounded-2xl"
      >
        <label
          className="text-2xl text-center font-bold block"
        >Código de 6 dígitos</label>
        <div className="flex justify-center gap-5">
        <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
            
            <ConfirmacionToken/>
            
        </PinInput>
      </div>  


      </form>
      

      

    </>
  )
  
}
