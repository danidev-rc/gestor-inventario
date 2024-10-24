import { prisma } from '../config/db.js'

export const getSales = async (req, res) => {
  try {
    const sales = await prisma.sale.findMany({
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
  try {
    const { customerId, saleDate, saleDetails } = req.body

    const newSale = await prisma.sale.create({
      data: {
        customerId,
        saleDate,
        totalAmount: saleDetails.reduce((acc, item) => acc + item.price * item.quantity, 0),
        saleDetails: {
          create: saleDetails.map(detail => ({
            productId: detail.productId,
            quantity: detail.quantity,
            price: detail.price
          }))
        }
      },
      include: {
        saleDetails: true
      }
    })

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
