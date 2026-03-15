
import { isAxiosError } from "axios"
import api from "../lib/axios"
import type { Profile} from "../types"



// OBTENER EL PERFIL YA AUTENTICADO
export async function getProfile() {
    try {
        const {data} = await api.get('profile/profile')
        return data
    } catch (error) {
        if(isAxiosError(error)){
        throw new Error(error.response?.data.error)
       } 
    }
}



// CREAR EL PERFIL
export async function createProfile(formData: Profile
){
    try {
        const{data} = await api.post('profile/create-profile', formData)
        return data
    } catch (error) {
       if(isAxiosError(error)){
        throw new Error(error.response?.data.error)
       } 
    }
}



  

// ACTUALIZAR EL PERFIL
export async function updateProfile(formData : Profile
){
    try {
        const url = `profile/update-profile`
        const{data} = await api.put<string>(url, formData)
        return data
    } catch (error) {
       if(isAxiosError(error)){
        throw new Error(error.response?.data.error)
       } 
    }
}


