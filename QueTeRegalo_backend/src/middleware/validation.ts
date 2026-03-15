import {Request, Response, NextFunction} from 'express'
import { validationResult} from 'express-validator'
import bcrypt from 'bcrypt'


export const handleInputErrors = (req:Request, res:Response, next: NextFunction) => {
    let errors = validationResult(req)
    if(!errors.isEmpty()) {
        res.status(400).json({errors:errors.array()})
       
    }else {
        next()
    }

}


export const checkPassword= async(enteredPassword:string, storedHash: string) =>{
    return await bcrypt.compare(enteredPassword, storedHash)
}