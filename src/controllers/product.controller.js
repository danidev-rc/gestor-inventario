import { prisma } from '../config/db.js'

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        user: true
      }
    })
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, categoryId } = req.body

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        categoryId,
        userId: req.user.id
      }
    })

    res.json(newProduct)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description, price, stock, categoryId } = req.body

    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price,
        stock,
        categoryId
      }
    })

    res.json(updatedProduct)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.product.delete({
      where: { id: parseInt(id) }
    })

    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
