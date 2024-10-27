import { prisma } from '../config/db.js'

export const getSales = async (req, res) => {
  try {
    const sales = await prisma.sale.findMany({
      where: {
        userId: req.userId
      },
      include: {
        customer: true,
        user: true,
        saleDetails: {
          include: {
            product: true
          }
        }
      }
    })

    res.json(sales)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createSale = async (req, res) => {
  const { customerId, saleDetails } = req.body

  try {
    const totalAmount = saleDetails.reduce((total, detail) => {
      return total + detail.price * detail.quantity
    }, 0)

    const newSale = await prisma.sale.create({
      data: {
        customerId,
        userId: req.userId,
        totalAmount,
        saleDate: new Date(),
        saleDetails: {
          create: saleDetails.map(detail => ({
            productId: detail.productId,
            quantity: detail.quantity,
            price: detail.price
          }))
        }
      }
    })
    // Actualizar stock de productos vendidos
    for (const detail of saleDetails) {
      await prisma.product.update({
        where: { id: detail.productId },
        data: {
          stock: {
            decrement: detail.quantity
          }
        }
      })
    }

    res.json(newSale)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateSale = async (req, res) => {
  try {
    const { id } = req.params

    const sale = await prisma.sale.findUnique({
      where: { id: parseInt(id) },
      include: {
        customer: true,
        user: true,
        saleDetails: {
          include: {
            product: true
          }
        }
      }
    })

    if (!sale) return res.status(404).json({ message: 'Venta no encontrada' })

    res.json(sale)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteSale = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.sale.delete({
      where: {id: parseInt(id)}
    })

    res.json({ message: 'Venta eliminada correctamente' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
