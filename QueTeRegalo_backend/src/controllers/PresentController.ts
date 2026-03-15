import {Request, Response} from 'express'
import Category from '../models/Category.model'
import Present from '../models/Present.model'
import User from '../models/User.model'



export class PresentController{


    //para las categorias ( por ahora solo backend)
    static createCategory = async (req:Request, res:Response)=>{
        try {
            const {name} = req.body

            // creamos la categoria
            const category = await Category.create({name: name})

            //respuesta
            res.send('Categoria Creada Correctamente')

        } catch (error) {
            res.status(500).json({error:'Hubo un error'})
        }
    }

    static getCategories = async (req:Request,res: Response) =>{
        try {
            const categories = await Category.findAll()
            res.json(categories)
        } catch (error) {
            res.status(500).json({error:'Hubo un error'})
        }
    }

    /// REGALOSS ///
    // Crear Regalos //
    static createPresent = async (req:Request, res:Response)=>{
        try {
            const userId = req.user.id
            const { categoryId, description, option} = req.body
            
            //comprobamos que el usuario exista
            const user = await User.findByPk(userId)
            if(!user) {
                res.status(404).json('Usuario No Encontrado')
                return
            }
            // comprobamos que la categoria exista
            const category = await Category.findByPk(categoryId)
            if(!category) {
                res.status(404).json('Categoria No Encontrada')
                return 
            }    

            //creamos el perfil
            const present = await Present.create({
                categoryId,
                description,
                option,
                userId : userId,
              
            })

            // generamos la respuesta
            res.status(202).json('Regalo Creado Correctamente')


        } catch (error) {
            console.log(error)
            res.status(500).json({error: 'Hubo un error'})
        }
    }

    // obtener los regalos de mi lista como usuario
    static getAllPresents = async (req:Request, res:Response)=>{
        try {
            const userId = req.user.id
            const presents =  await Present.findAll({
                where : {userId},
                include : [{model: Category}]
            })

            res.json(presents)
            
        } catch (error) {
            console.log(error)
            res.status(404).json({error:'Hubo un error'})
        }
    }

    // para obtener los regalos de un usuario
    static getPresentsByUserId = async (req:Request, res:Response)=>{
        try {
           const {userId}= req.params
           const presents =  await Present.findAll({
            where: {userId : Number(userId)},
            include : [
                {
                    model: Category,
                    attributes : ['name']
                }
            ]
           })

           if(presents.length === 0) {
            res.status(404).json('Este usuario no tiene ningun regalos')
            return
           }

           res.json(presents)
           
           
        } catch (error) { 
            res.status(404).json({error: 'Hubo un error'})  
            
        }
    } 
    
    // actualizar el regalo
     static updatePresent = async (req:Request, res:Response)=>{
        try {
            const {presentId} = req.params
            const userId = req.user.id
            
            const { categoryId, description, option} = req.body
            
            // validamos que el regalo exista
            const present = await Present.findByPk(presentId)
            if(!present){
                res.status(404).json('Regalo no encontrado')
                return
            }

            //validamos que el usuario que lo creo sea el que lo puede modificar
            if(userId !== present.userId){
                res.status(403).json('Usuario No autorizado para editar')
                return
            }

            //requerimos los datos del regalo
            present.categoryId = categoryId
            present.description = description
            present.option = option

            //guardamos los datos nuevos
            await present.save()
            res.json('Regalo Actualizado Correctamente')



        } catch (error) {
            res.status(500).json({error:'Hubo un error'})
        }   
        
    }
    
    //borrar el regalo
    static deletePresent = async(req: Request, res: Response) => {
        try {
             const {presentId} = req.params
            const userId = req.user.id
            
            // validamos que el regalo exista
            const present = await Present.findByPk(presentId)
            if(!present){
                res.status(404).json('Regalo no encontrado')
                return
            }

            //validamos que el usuario que lo creo sea el que lo puede modificar
            if(userId !== present.userId){
                res.status(403).json('Usuario No autorizado para editar')
                return
            }

            // eliminamos el regalo
            await present.destroy()

            res.send('Regalo Eliminado Correctamente')
            
        } catch (error) {
            res.status(500).json({error: 'Hubo un error'})
        }
    }
}