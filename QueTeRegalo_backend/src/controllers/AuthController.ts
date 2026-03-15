import type {Request, Response} from 'express'
import User from '../models/User.model'
import { hashearPassword } from '../utils/auth'
import Token from '../models/Token.model'
import { generationToken } from '../utils/token'
import { AuthEmail } from '../mails/AuthMails'
import { checkPassword } from '../middleware/validation'
import { generateJWT } from '../utils/jwt'



export class AuthController{
    /// crear usuario

    static createAccount = async (req :Request, res: Response )=> {
        try {
            const {name, email, password, password_confirmation} = req.body

            // comprobar que el usuario exista
            const userExists = await User.findOne({where: {email}})
            if(userExists) {
                const error = new Error('Usuario ya esta registrado')
                res.status(409).json({error : error.message})
                return
            }

            // creamos el usuario
            const user = await  User.create({name, email, password : await hashearPassword(password)})

            //generamos el token
            const token = await Token.create({token : generationToken(), userId : user.id})

            //generamos el mail
            AuthEmail.sendConfirmationEmail({
                email : user.email,
                name : user.name,
                token: token.token
            })
           
            res.send('Cuenta creada correctamente, revisa tu mail para confirmar cuenta')

        } catch (error) {
            console.error("error en createAccount", error)
            res.status(500).json({error: 'Hubo un error'})
        }
    }


    static confirmAccount = async (req :Request, res: Response )=> {
        try {
            const {token} = req.body
            // comprobar que el token exista ya que puede expirar
            const tokenExist = await Token.findOne({where : {token}})
            if(!tokenExist){
                const error = new Error('El Token No valido')
                res.json({error: error.message})
                return
            }

            //cambiamos el confrimacion a true del user
            const user = await User.findByPk(tokenExist.userId)
            user.confirmed = true

            //guardamos el usuario y anulamos el token
            await user.save()
            await tokenExist.destroy()

            //generamos la respuesta
            res.json('Cuenta Confirmada, Inicie Sesion')



        } catch (error) {
            console.error("error en createAccount", error)
            res.status(500).json({error: 'Hubo un error'})
        }

    }

    static login = async (req :Request, res: Response )=> {
        try {
            const {email, password} = req.body

        //1. comprobar que el mail exista
        const user = await User.findOne({where : {email}})
        if(!user) {
            const error = new Error('Usuario No existe')
            res.status(404).json({error : error.message})
            return
        }
        // 2. que la cuenta este confirmada  
        if(!user.confirmed){
            //generamos otro token
            const token = await Token.create({token : generationToken(), userId : user.id})
            //generamos el mail
            AuthEmail.sendConfirmationEmail({
                email : user.email,
                name : user.name,
                token: token.token
            })
            const error = new Error('Cuenta no Confirmada, hemos enviado otro mail')
            res.status(401).json({error: error.message})
            return
        }
        //3. revisamos que el passsword es correcto
        const isPasswordCorrect = await checkPassword(password, String(user.password))
        if(!isPasswordCorrect){
            const error = new Error('Password Incorrecto')
            res.status(401).json({error : error.message})
            return
        }

        //4. generamos el jwt
        const token = generateJWT({id : user.id})

        //5. generamos la respuesta
        res.send(token)
        return
        


        } catch (error) {
            console.error("error en createAccount", error)
            res.status(500).json({error: 'Hubo un error'})
        }
        

    }

     static forgotPassword = async (req :Request, res: Response )=>{
        try {
            const {email, name} = req.body

            // comprobar que el usuario exista
            const user = await User.findOne({where : {email}})
            if(!user) {
                const error = new Error('Usuario No existe')
                res.status(404).json({error : error.message})
                return
            }

            // comprobar que el usuario este registrado
            if(!user.confirmed){
                const error = new Error('El Usuario no confirmo su cuenta, consulte su email    ')
                res.status(409).json({error:error.message})
            }

            //generamos el token
            const token = await Token.create({
                token : generationToken(), userId : user.id
            })

            //generamos el mail
            AuthEmail.sendPasswordResetToken({
                email : user.email,
                name : user.name,
                token: token.token
            })

            //enviamos la respuesta 
            res.send('Consulta tu emal y sigue las instrucciones')


        } catch (error) {
           res.status(500).json({error: 'Hubo un error'}) 
            
        }
     }

     static validarToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.body;

            // comprobar que el token exista ya que puede expirar
            const tokenExist = await Token.findOne({ where: { token } });

            if (!tokenExist) {
            res.status(404).json({ error: "Token no válido" });
            return
        }

            return res.json({ msg: 'Reestablece tu Password' });

        } catch (error) {
            res.status(500).json({ error: "Hubo un error" });
            return
        }
    };

     static updatePasswordWithToken = async (req: Request, res:Response)=>{
        try {
            const {token} = req.params
            const {password} = req.body

            // para comprobar que el token existe ( expira en 10 min)
            const tokenExist = await Token.findOne({where:{token}})
            if(!tokenExist) {
                const error = new Error('Token No Valido')
                res.status(404).json({error: error.message})
                return
            }

            // unimos el token con el id del usuario para poder cambiar los datos
            const user = await User.findByPk(tokenExist.userId)
            user.password = await hashearPassword(password)
            
            //guardamos el nuevo password del usuario y borramos el token
            await Promise.all([user.save(), tokenExist.destroy()])
            
            res.send('Password Modificado Correctamente')
            
        } catch (error) {
            res.status(500).json({error : 'Hubo un Error'})
        }
        
        }

    static user = async (req:Request, res:Response)=>{
        res.json(req.user)
        return
    }

    

}