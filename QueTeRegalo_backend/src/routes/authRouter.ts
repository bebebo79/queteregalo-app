import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { AuthController } from "../controllers/AuthController";
import { authentication } from "../middleware/authentication";


const router = Router()

// router de Autenticacion


//crear cuenta
router.post('/create-account',
    body('name')
        .notEmpty().withMessage('El Nombre no puede ir vacio'),
    body('email')
        .isEmail().withMessage('Email No Valido'),    
    body('password')
        .isLength({min : 8}).withMessage('El password tiene que tener 8 caracteres'),
    body('password_confirmation')
        .custom((value, {req})=>{
            if(value !== req.body.password){
            throw new Error('Los passwords no coinciden')
            } return true
        }),
    handleInputErrors,
    AuthController.createAccount
               
)
//confirmar cuenta
router.post('/confirm-account',
    body('token')
        .notEmpty().withMessage('El token no tiene que ir vacio'),
    handleInputErrors,
    AuthController.confirmAccount
)

// iniciar sesion
router.post('/login', 
    body('email')
        .notEmpty().withMessage('El mail es obligatorio'),
    body('password')
        .notEmpty().withMessage('El password es obligatorio'),
    handleInputErrors,
    AuthController.login        
)

// reestablecer contraseña
router.post('/forgot-password',
    body('email')
        .notEmpty().withMessage('El Mail es obligatorio'),
    handleInputErrors,
    AuthController.forgotPassword
)

//validar token
router.post('/validate-token',
    body('token')
        .notEmpty().withMessage('El Token no puede ir vacio'),
    handleInputErrors,
    AuthController.validarToken
)

//confirmar reestablecer password con token
router.post('/update-password/:token',
    param('token')
        .isNumeric().withMessage('Token No valido'),
        
    body('password')
        .isLength({min:8}).withMessage('El password tiene que tener 8 caracteres minimo'),
    body('password_confirmation')
        .custom((value, {req} )=>{
           if(value !== req.body.password){
            throw new Error('Los Password no son iguales')
           } return true

        }),
    handleInputErrors,
    AuthController.updatePasswordWithToken   

)

router.get('/user', authentication, AuthController.user)








export default router