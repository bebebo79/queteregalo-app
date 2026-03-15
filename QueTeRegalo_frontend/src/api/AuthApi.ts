import { isAxiosError } from "axios";
import api from "../lib/axios";
import {type ConfirmToken, type NewPasswordForm, type UserForgotPassword, type UserLoginForm, type UserRegisterForm } from "../types";


// LOGIN
export async function authenticateUser(formData : UserLoginForm){
    try {
        const url = 'auth/login'
        const{data} = await api.post<string>(url, formData)
        localStorage.setItem('AUTH_TOKEN', data)
        return data
    } catch (error) {
       if(isAxiosError(error)){
        throw new Error(error.response?.data.error)
       } 
    }
}

//CREAR UNA CUENTA
export async function createUser(formData : UserRegisterForm){
    try {
        const url = 'auth/create-account'
        const{data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
       if(isAxiosError(error)){
        throw new Error(error.response?.data.error)
       } 
    }
}
// CONFIRMAR LA CUENTA 
export async function confirmAccount(formData : ConfirmToken){
    try {
        const url = 'auth/confirm-account'
        const{data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
       if(isAxiosError(error)){
        throw new Error(error.response?.data.error)
       } 
    }
}
// OLVIDE MI CONTRASEÑA
export async function restablecerPassword(formData : UserForgotPassword){
    try {
        const url = 'auth/forgot-password'
        const{data} = await api.post<string>(url, formData)
        return data
    } catch (error) {
       if(isAxiosError(error)){
        throw new Error(error.response?.data.error)
       } 
    }
}

type UpdatePassword = {
    formData : NewPasswordForm,
    token : ConfirmToken['token']
}


//CONFIRMAR QUE QUIERO CAMBIAR LA CONTRASEÑA
export async function updatePasswordWithToken({formData, token} : UpdatePassword){
   try {
        const url = `auth/update-password/${token}`
        const {data} = await api.post(url, formData)
        return data
   } catch (error) {
        if(isAxiosError(error)){
            throw new Error(error.response?.data.error)
        }
   }
}

//VALIDAR TOKEN
export async function validarToken(formData : ConfirmToken) {
    try {
        const url = 'auth/validate-token'
        const {data} = await api.post<string>(url,formData)
        return data
    } catch (error) {
        if(isAxiosError(error)){
            throw new Error(error.response?.data.error)
        } 
    }
    
}

// ver el usuario  
export async function getUser() {

    try {
        const {data} = await api('auth/user')
        return data
    } catch (error) {
        if(isAxiosError(error)){
            throw new Error(error.response?.data.error)
        }
    }
    
}


