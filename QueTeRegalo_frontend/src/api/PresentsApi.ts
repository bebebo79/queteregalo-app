import { isAxiosError } from "axios"
import api from "../lib/axios"
import type { PresentFormData } from "../types"



export async function getPresents() {
    try {
        const {data} = await api.get('presents/')
        return data
    } catch (error) {
        if(isAxiosError(error)){
        throw new Error(error.response?.data.error)
       } 
    }
}

export async function createPresent(formData: PresentFormData) {
    try {
        const {data} = await api.post('presents/create-present',formData)
        return data
    } catch (error) {
       if(isAxiosError(error)){
        throw new Error(error.response?.data.error)
       } 
    }
    
}

export async function getCategories() {
    try {
        const {data} = await api.get('category/')
        return data
    } catch (error) {
        if(isAxiosError(error)){
        throw new Error(error.response?.data.error)
       } 
    }
    
}