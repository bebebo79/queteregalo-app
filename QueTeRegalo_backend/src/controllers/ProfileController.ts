import { Request, Response } from "express"
import User from "../models/User.model"
import Profile from "../models/Profile.model"

export class ProfileController{

    static createProfile = async (req:Request, res:Response)=>{
        try {
            const userId = req.user.id
            const { shirtSize, pantSize, shoeSize} = req.body
            
            //comprobamos que el usuario exista
            const user = await User.findByPk(userId)
            if(!user) {
                res.status(404).json('Usuario No Encontrado')
                return
            }
            //creamos el perfil
            const profile = await Profile.create({
                shirtSize,
                pantSize,
                shoeSize,
                userId : userId,
              
            })
            
            // generamos la respuesta
            res.send('Perfil Creado')
            



        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    static getAllProfiles = async (req:Request, res: Response)=>{
        try {
            const profile = await Profile.findAll()
            res.json(profile)
            return
        } catch (error) {
            res.status(404).json({error: 'Hubo un error'})  
        }
    }
    static getProfile = async (req: Request, res: Response) => {
        const userId = req.user.id;

        const profile = await Profile.findOne({
            where: { userId },
            include: [{
                model: User,
                attributes: ["name"]
            }],
            
        });

        return res.json(profile); // null si no existe
    };


    static getProfileById = async (req:Request, res:Response) =>{
        try {
            const {userId} = req.params

            //comprobamos que el usuario exita
            const profile = await Profile.findByPk(userId)

            if(!profile) {
                res.status(500).json('Perfil No encontrado')
            }

            res.json(profile)
            return
        
        } catch (error) {
            res.status(44).json({error: 'Hubo un error'})
        }
    }

    static updateProfile = async (req: Request, res:Response)=>{
        try {
            const userId = req.user.id
            const {shirtSize,pantSize, shoeSize} = req.body

            // validamos que el perfil exista
            const profile = await Profile.findOne({where : {userId}})
            if(!profile) {
                res.status(404).json('Perfil no encontrado')
                return
            }
            //requerimos los datos del perfil
            profile.shirtSize = shirtSize
            profile.pantSize = pantSize
            profile.shoeSize = shoeSize

            //guardamos los nuevos datos
            await profile.save()
            res.json('Perfil Actualizado Correctamente')

        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
}