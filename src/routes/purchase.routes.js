import { Router } from 'express'
import { authRequired } from '../middlewares/validateToken.js'
import {
  getPurchases,
  createPurchase,
  getPurchaseById,
  deletePurchase
} from '../controllers/purchase.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js'
import { createPurchaseSchema } from '../schemas/purchase.schema.js'

const router = Router()

router.get('/', authRequired, getPurchases)
router.get('/:id', authRequired, getPurchaseById)
router.post('/', authRequired, validateSchema(createPurchaseSchema), createPurchase)
router.delete('/:id', authRequired, deletePurchase)

export default router
