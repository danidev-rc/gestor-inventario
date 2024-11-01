import { useEffect, useState } from "react";
import { useCategories } from "../../context/CategoryContext";
import Modal from "../../components/Modal";
import { Table } from "../../components/Table";

export default function CategoryPage() {
  const {
    categories,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleCreateClick = () => {
    setSelectedCategory({ name: "" });
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const handleDeleteClick = async (id) => {
    await deleteCategory(id);
    getCategories(); // Refrescar la lista de categorías
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      await updateCategory(selectedCategory.id, selectedCategory);
    } else {
      await createCategory(selectedCategory);
    }
    handleCloseModal();
    getCategories(); // Refrescar la lista de categorías
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Category</h1>
      <button
        className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4'
        onClick={handleCreateClick}
      >
        Create Category
      </button>
      <Table
        headers={["id", "Name"]}
        data={categories}
        onEdit={handleEditClick}
        onDelete={(item) => handleDeleteClick(item.id)}
      />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className='text-xl font-semibold mb-4'>
          {isEditMode ? "Edit Category" : "Create Category"}
        </h2>
        <form onSubmit={handleFormSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Name
            </label>
            <input
              type='text'
              value={selectedCategory?.name || ""}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              onChange={(e) =>
                setSelectedCategory({
                  ...selectedCategory,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className='flex justify-end'>
            <button
              type='submit'
              className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
              {isEditMode ? "Save" : "Create"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
