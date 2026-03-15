import { transport } from "../config/nodemailer"


interface IMail  {
    email : string,
    name : string,
    token: string
}


export class AuthEmail {

    static sendConfirmationEmail = async( user : IMail)=>{
        const info = await transport.sendMail({
            from : 'queteregalo@admin.com',
            to: user.email,
            subject : 'QueTeRegalo - Confirma tu Cuenta',
            html : `<p>Hola ${user.name}, has creado esta cuenta en Que Te Regalo</p>
                    <p>Solo tienes que visitar este enlace y confirmar tu mail</p>
                    <a href= "${process.env.FRONTEND_URL}/auth/confirm-account">Confirma tu Mail</a>
                    <p>En ingresa el siguiente codigo: <b>${user.token}</b></p>
                    <p>Este codigo expira en 10 minutos</p> `
        })
        console.log('Mensaje Enviado', info.messageId)
    }
    static sendPasswordResetToken = async( user : IMail)=>{
        const info = await transport.sendMail({
            from : 'queteregalo@admin.com',
            to: user.email,
            subject : 'QueTeRegalo- Reestablece tu Password',
            text: 'QueTeRegalo - Reestablece tu Password',
            html : `<p>Hola ${user.name}, has solicitado reestablece tu password </p>
                    <p>Solo tienes que visitar este enlace: </p>
                    <a href= "${process.env.FRONTEND_URL}/auth/new-password">Reestablece tu Password</a>
                    <p>ingresa el siguiente codigo: <b>${user.token}</b></p>
                    <p>Este codigo expira en 10 minutos</p> `
        })
        console.log('Mensaje Enviado', info.messageId)
    }
}