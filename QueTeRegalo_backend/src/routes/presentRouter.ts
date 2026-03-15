import { Router } from "express";
import { authentication } from "../middleware/authentication";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { PresentController } from "../controllers/PresentController";




const router = Router()


///// REGALOS //////

// crear regalo
router.post(
  '/create-present',
  authentication,
  body('categoryId')
    .isInt().withMessage('La categoría es obligatoria'),
  body('description')
    .notEmpty().withMessage('La descripción no puede ir vacía'),
  body('option')
    .isIn(['deseable', 'evitable'])
    .withMessage('La opción debe ser deseable o evitable'),
  handleInputErrors,
  PresentController.createPresent
)

// obtener todos los regalos de mi usuario
router.get('/',
    authentication,
    PresentController.getAllPresents
)

// actualizar el regalo, solo yo puedo como usuario
router.put('/:presentId',
  authentication,
  param('presentId')
    .isNumeric().withMessage('ID no valido'),
  body('categoryId')
    .isInt().withMessage('La categoría es obligatoria'),
  body('description')
    .notEmpty().withMessage('La descripción no puede ir vacía'),
  body('option')
    .isIn(['deseable', 'evitable'])
    .withMessage('La opción debe ser deseable o evitable'),
  handleInputErrors,
  PresentController.updatePresent
)

// eliminar el regalo, solo puedo
router.delete('/:presentId',
  authentication,
  param('presentId')
    .isNumeric().withMessage('ID no valido'),
  handleInputErrors,
  PresentController.deletePresent
)


//obtener los regalos de un usuario especifico
router.get('/:userId',
  param('userId')
    .isNumeric().withMessage('ID no valido'),
  authentication,
  PresentController.getPresentsByUserId

)





export default router