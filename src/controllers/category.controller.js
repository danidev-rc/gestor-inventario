import { prisma } from '../config/db.js'

export const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany()
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body

    const newCategory = await prisma.category.create({
      data: {
        name
      }
    })

    res.json(newCategory)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params
    const { name } = req.body

    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name }
    })

    res.json(updatedCategory)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.category.delete({
      where: { id: parseInt(id) }
    })

    res.json({ message: 'Category deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
