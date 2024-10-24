import { z } from 'zod'

export const createSaleSchema = z.object({
  totalAmount: z.number({
    required_error: 'Total amount is required'
  }),
  saleDate: z.string().datetime().optional()
})
