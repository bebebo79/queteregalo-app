import { PinInput } from "@chakra-ui/pin-input";
import ConfirmacionToken from "../ConfirmacionToken";
import type { ConfirmToken } from "../../types";
import { useMutation } from "@tanstack/react-query";
import { validarToken } from "../../api/AuthApi";
import { toast } from "react-toastify";


type NewPasswordTokenProps = {
    token : ConfirmToken['token'], 
    setToken: React.Dispatch<React.SetStateAction<string>>;
    setIsValidationToken : React.Dispatch<React.SetStateAction<boolean>>
}


export default function NewPasswordToken({token, setToken, setIsValidationToken}: NewPasswordTokenProps) {
    
    // llamamos a la api
    const {mutate} = useMutation({
        mutationFn : validarToken,
        onError : (error)=>{
            toast.error(error.message)
        },
        onSuccess : (data)=>{
            toast.success(data)
            setIsValidationToken(true)
            
        }

    })
    // handlechange input del token
    const handleChange = (token: ConfirmToken['token'])=>{ setToken(token)}
    // handlecompetar retornar el mutate 
    const handleComplete = (token:ConfirmToken['token'])=>{mutate({token})}
  return (
    <>
        <form className="sspace-y-8 p-10 mt-8 bg-[#ffe8b5] border border-[#006d77]">
            <label className="font-normal text-2xl text-center block mb-8 text-[#ff7a70]">
            Código de 6 dígitos
            </label>
            <div className="flex justify-center gap-8 ">
                <PinInput
                    value={token}
                    onChange={handleChange}
                    onComplete={handleComplete}
                >
                    <ConfirmacionToken/>
                </PinInput>
            </div>
        </form>
       
    </>
  )
}
