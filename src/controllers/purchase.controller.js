import { prisma } from '../config/db.js'

export const getPurchases = async (req, res) => {
  try {
    const purchases = await prisma.purchase.findMany({
      include: {
        supplier: true,
        user: true,
        purchaseDetails: {
          include: {
            product: true
          }
        }
      }
    })

    res.json(purchases)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createPurchase = async (req, res) => {
  try {
    const { supplierId, purchaseDate, purchaseDetails } = req.body

    const newPurchase = await prisma.purchase.create({
      data: {
        supplierId,
        purchaseDate,
        totalAmount: purchaseDetails.reduce((acc, item) => acc + item.price * item.quantity, 0),
        userId: req.user.id,
        purchaseDetails: {
          create: purchaseDetails.map(detail => ({
            productId: detail.productId,
            quantity: detail.quantity,
            price: detail.price
          }))
        }
      },
      include: {
        purchaseDetails: true
      }
    })

    res.json(newPurchase)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getPurchaseById = async (req, res) => {
  try {
    const { id } = req.params

    const purchase = await prisma.purchase.findUnique({
      where: { id: parseInt(id) },
      include: {
        supplier: true,
        user: true,
        purchaseDetails: {
          include: {
            product: true
          }
        }
      }
    })

    if (!purchase) return res.status(404).json({ message: 'Compra no encontrada' })

    res.json(purchase)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deletePurchase = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.purchase.delete({
      where: { id: parseInt(id) }
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
