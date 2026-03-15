import { Router } from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { PresentController } from "../controllers/PresentController";
import { authentication } from "../middleware/authentication";


const router = Router()


//// CATEGORIAS ////

/// para dar de alta las categorias ///
router.post('/create-category',
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio'),
    handleInputErrors,
    PresentController.createCategory    

)
router.get('/', 
    handleInputErrors,
    authentication,
    PresentController.getCategories
)


export default router