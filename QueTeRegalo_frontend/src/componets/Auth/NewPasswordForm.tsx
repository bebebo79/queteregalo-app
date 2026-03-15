import { useForm } from "react-hook-form"
import type { ConfirmToken, NewPasswordForm } from "../../types"
import ErrorsMessage from "../ErrorMessage"
import { useMutation } from "@tanstack/react-query"
import { updatePasswordWithToken } from "../../api/AuthApi"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


type NewPasswordFormProp = {
  token : ConfirmToken['token']
}

export default function NewPasswordToken({token} : NewPasswordFormProp ) {
  // iniciamos el valor
  const initialValues : NewPasswordForm = {
    password :"",
    password_confirmation : ""
  }

  // usames el navegate para enlazar con el login
  const navigate = useNavigate()

  //usamos el useForm
  const { handleSubmit,register,formState:{errors}, watch, reset} = useForm({defaultValues : initialValues})

  // llamamos a la api

  const {mutate} = useMutation({
    mutationFn : updatePasswordWithToken,
    onError : (error)=>{
      toast.error(error.message)
    },
    onSuccess : (data)=>{
      toast.success(data)
      reset()
      navigate('/auth/login')
    }

  })

  //funcion del sumbit
  const handleNewPassword = (formData:NewPasswordForm)=>{
    const data = {formData, token}
    mutate(data)
  }

 
  // generamos el password
  const password =  watch('password')

  return (
    <>
      <form
                  onSubmit={handleSubmit(handleNewPassword)}
                  className="space-y-8 p-10 mt-8 bg-[#ffe8b5]"
                  noValidate
              >

                  <div className="flex flex-col gap-5">
                      <label
                          className="font-normal text-2xl"
                      >Password</label>

                      <input
                          type="password"
                          placeholder="Password de Registro"
                          className="w-full p-3 bg-[#fff8f0] border  border-[#006d77] rounded"
                          {...register("password", {
                              required: "El Password es obligatorio",
                              minLength: {
                                  value: 8,
                                  message: 'El Password debe ser mínimo de 8 caracteres'
                              }
                          })}
                      />
                      {errors.password && (
                          <ErrorsMessage>{errors.password.message}</ErrorsMessage>
                      )}
                  </div>

                  <div className="flex flex-col gap-5">
                      <label
                          className="font-normal text-2xl"
                      >Repetir Password</label>

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
                      value='Establecer Password'
                      className="bg-[#ff6f61] hover:bg-[#006d77] w-full p-3  text-white font-black  text-xl cursor-pointer"
                  />
              </form>
    </>
  )
}

