import { z } from 'zod'

export const createPurchaseSchema = z.object({
  totalAmount: z.number({
    required_error: 'Total amount is required'
  }),
  purchaseDate: z.string().datetime().optional()
})
