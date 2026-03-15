import { Router } from "express";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { ProfileController } from "../controllers/ProfileController";
import { authentication } from "../middleware/authentication";



const router = Router()


// creando el perfil

router.post('/create-profile',
    authentication,
    
    body('shirtSize')
        .notEmpty().withMessage('Este Campo no puede ir vacio'),
    body('pantSize')
        .notEmpty().withMessage('Este Campo no puede ir vacio'),
    body('shoeSize')
        .notEmpty().withMessage('Este campo no puede ir vacio'),
    handleInputErrors,
    ProfileController.createProfile

)


// obterner el perfil
router.get('/profile',authentication, handleInputErrors, ProfileController.getProfile)

// obtener todos los perfiles
router.get('/get-profiles', authentication, handleInputErrors, ProfileController.getAllProfiles)


//actualizar perfil
router.put('/update-profile',
    authentication,
    body('shirtSize')
        .notEmpty().withMessage('Este Campo no puede ir vacio'),
    body('pantSize')
        .notEmpty().withMessage('Este Campo no puede ir vacio'),
    body('shoeSize')
        .notEmpty().withMessage('Este campo no puede ir vacio'),
    handleInputErrors,
    ProfileController.updateProfile
)




//obtener el perfil segun el id de usuario
router.get('/:userId',
    authentication,
    param('userId')
        .isNumeric().withMessage('ID no valido'),
    handleInputErrors,
    ProfileController.getProfileById
    
)

export default router