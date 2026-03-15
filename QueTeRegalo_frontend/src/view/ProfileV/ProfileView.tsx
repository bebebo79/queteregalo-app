import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useProfile } from "../../hooks/UseProfile";
import type { Profile } from "../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../../api/ProfileApi"; // ← IMPORTANTE: esta función debe existir
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../../componets/Profile/ProfileForm";

export default function ProfileView() {

  const { data, isLoading} = useProfile();

  

  const { register, handleSubmit, setValue, formState: { errors } } =
    useForm<Profile>();

  useEffect(() => {
    if (data) {
      setValue("name", data.user.name);
      setValue("shirtSize", data.shirtSize);
      setValue("pantSize", data.pantSize);
      setValue("shoeSize", data.shoeSize);
    }
  }, [data, setValue]);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: updateProfile,   // ← NO getProfile !!!
    onSuccess: () => {
      toast.success("Perfil actualizado");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  const onSubmit = (formData: Profile) => mutation.mutate(formData);

  if (isLoading) return "Cargando...";



  return (
    <>
    <div className="mx-auto max-w-3xl g">
      <h1 className="text-5xl font-black">Tu Perfil</h1>
      <p className="text-2xl font-light text-[#ff7a70] mt-5">Aqui Puedes Modificar tu perfil</p>
      <form onSubmit={handleSubmit(onSubmit)} className="p-10 bg-[#ffe8b5] mt-14 space-y-5 rounded-2xl ">

      <ProfileForm
        errors={errors}
        register={register}
      />

      <input
        type="submit"
        value="Actualizar Perfil"
        className=" bg-[#025961] hover:bg-[#ff6f61] w-full p-3  text-[#fff8f0] hover:text-white font-black  text-xl cursor-pointer rounded"
      />

    </form>

    </div>
    
    
    </>
    
  );
}
