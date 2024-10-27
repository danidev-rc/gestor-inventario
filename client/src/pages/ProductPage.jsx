import { useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";

export default function Products() {
  const { products, getProducts } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-2xl font-bold my-4 text-center'>PRODUCTS</h1>
      <main className='text-center flex justify-center gap-2 items-center mb-4'>
        <span>
          <strong>Search bar</strong>
        </span>
        <FaSearch />
        <strong>Filtrado</strong>
      </main>
      <div className='overflow-x-auto'>
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
      </div>
    </div>
  );
}
