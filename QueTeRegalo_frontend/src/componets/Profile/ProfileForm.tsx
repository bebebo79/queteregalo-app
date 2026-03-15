import { UserCircleIcon } from "@heroicons/react/20/solid";
import ErrorsMessage from "../ErrorMessage";
import { FaShirt } from "react-icons/fa6";
import { PiPantsFill } from "react-icons/pi";
import { GiConverseShoe } from "react-icons/gi";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { Profile } from "../../types";


type ProfileFormProps = {
    errors : FieldErrors<Profile>
    register : UseFormRegister<Profile>
}


export default function ProfileForm({errors, register} :ProfileFormProps) {
  return (
    <>
      <div className="mb-5 space-y-3">
        <UserCircleIcon className="h-8 w-8 text-[#006d77]"/>
        <label className="font-bold">Nombre</label>
        <input
          className="w-full p-3 bg-[#fff8f0] border border-[#006d77] rounded"
          {...register("name", { required: "Nombre obligatorio" })}
        />
        {errors.name && <ErrorsMessage>{errors.name?.message}</ErrorsMessage>}
      </div>

      <div className="mb-5 space-y-3">
        <FaShirt className="h-8 w-8 text-[#006d77]"/>
        <label className="font-bold">Talla de camiseta</label>
        <input
          className="w-full p-3 bg-[#fff8f0] border border-[#006d77] rounded"
          {...register("shirtSize", { required: "Obligatorio" })}
        />
        {errors.shirtSize && <ErrorsMessage>{errors.shirtSize.message}</ErrorsMessage>}
      </div>

      <div className="mb-5 space-y-3">
        <PiPantsFill className="h-8 w-8 text-[#006d77]"/>
        <label className="font-bold">Talla de pantalón</label>
        <input
          className="w-full p-3 bg-[#fff8f0] border border-[#006d77] rounded"
          {...register("pantSize", { required: "Obligatorio" })}
        />
        {errors.pantSize && <ErrorsMessage>{errors.pantSize.message}</ErrorsMessage>}
      </div>

      <div className="mb-5 space-y-3">
        <GiConverseShoe className="h-8 w-8 text-[#006d77]"/>
        <label className="font-bold">Talla de zapato</label>
        <input
          className="w-full p-3 bg-[#fff8f0] border border-[#006d77] rounded"
          {...register("shoeSize", { required: "Obligatorio" })}
        />
        {errors.shoeSize && <ErrorsMessage>{errors.shoeSize.message}</ErrorsMessage>}
      </div>


    
    </>
  )
}
