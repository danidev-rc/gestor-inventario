import { useEffect } from "react";
import { useCategories } from "../context/CategoryContext";
import { FaSearch } from "react-icons/fa";

export default function CategoryPage() {
  const { categories, getCategories } = useCategories();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Category</h1>
      <main className='text-center flex justify-center gap-2 items-center mb-4'>
        <span>
          <strong>Search bar</strong>
        </span>
        <FaSearch />
        <strong>Filtrado</strong>
      </main>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {categories.map((category) => (
          <div key={category.id} className='bg-white shadow-md rounded-lg p-4'>
            <h2 className='text-xl font-semibold mb-2'>{category.name}</h2>
            <div className='flex justify-between'>
              <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                Edit
              </button>
              <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
