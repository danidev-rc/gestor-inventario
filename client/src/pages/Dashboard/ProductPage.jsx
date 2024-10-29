import { useEffect, useState } from "react";
import { useProducts } from "../../context/ProductContext";
import { useCategories } from "../../context/CategoryContext";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Table } from "../../components/Table";

export default function Products() {
  const { products, getProducts, getProductsByCategory } = useProducts();
  const { categories, getCategories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    if (categoryId) {
      getProductsByCategory(categoryId);
    } else {
      getProducts();
    }
  };

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-2xl font-bold my-4 text-center'>PRODUCTS</h1>
      <div className='mb-4'>
        <label htmlFor='category' className='mr-2'>
          Filter by Category:
        </label>
        <select
          id='category'
          value={selectedCategory}
          onChange={handleCategoryChange}
          className='border rounded p-2'
        >
          <option value=''>All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {/* <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border rounded-xl'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b'>Name</th>
              <th className='py-2 px-4 border-b'>Description</th>
              <th className='py-2 px-4 border-b'>Price</th>
              <th className='py-2 px-4 border-b'>Stock</th>
              <th className='py-2 px-4 border-b'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className='text-center'>
                <td className='py-2 px-4 border-b'>{product.name}</td>
                <td className='py-2 px-4 border-b'>{product.description}</td>
                <td className='py-2 px-4 border-b'>{product.price}</td>
                <td className='py-2 px-4 border-b'>{product.stock}</td>
                <td className='py-2 px-4 border-b'>
                  <button className='text-blue-500 hover:text-blue-700 mr-2'>
                    <FaEdit />
                  </button>
                  <button className='text-red-500 hover:text-red-700'>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
      <div>
        <Table
          headers={["Name", "Description", "Price", "Stock"]}
          data={products}
          onEdit={(item) => console.log("Edit", item)}
          onDelete={(item) => console.log("Delete", item)}
        />
      </div>
    </div>
  );
}
