import { z } from "zod"



// *** auth ***//
export const AuthSchema = z.object({
    name : z.string(),
    email : z.string().email(),
    password : z.string(),
    password_confirmation : z.string(),
    confirmed : z.boolean(),
    token : z.string()
    
})

export type Auth = z.infer<typeof AuthSchema>
export type UserLoginForm = Pick<Auth, 'email'| "password">
export type UserRegisterForm = Pick<Auth, 'name' |'email' | 'password' |'password_confirmation' >
export type ConfirmToken =  Pick<Auth, 'token'>
export type UserForgotPassword = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' |'password_confirmation'>

//*** USER */
export const UserSchema = AuthSchema.pick({
    name:true,
    email: true
}).extend({
    _id : z.string()
})

export type User = z.infer<typeof UserSchema>

//**** PROFILE *****/

export const ProfileShema = z.object({
    name : UserSchema,
    shirtSize : z.string(),
    pantSize : z.string(),
    shoeSize: z.string()
})


export type Profile= z.infer<typeof ProfileShema>
export type ProfileFormData = Pick<Profile, 'name' | 'shirtSize' | 'pantSize'| 'shoeSize'>

//***** OPCIONES **** */
export const OpcionSchema = z.enum([
    'deseable', 'evitable'
])

export type Option = z.infer<typeof OpcionSchema>


//****** CATEGORIAS ******/
export const CategoriesShema = z.object({
    id: z.number(),
    name : z.string()
})

export type Category = z.infer<typeof CategoriesShema>

//******  REGALOS */
export const PresentSchema = z.object({
    id : z.number(),
    category : CategoriesShema,
    description : z.string(),
    option : OpcionSchema
})

export const PresentFormShema = z.object({
    categoryId : z.number(),
    description: z.string(),
    option : OpcionSchema.or(z.literal(''))
})

export type Present = z.infer<typeof PresentSchema>
export type PresentFormData = z.infer<typeof PresentFormShema>