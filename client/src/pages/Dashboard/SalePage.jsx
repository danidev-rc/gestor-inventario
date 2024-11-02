import { useEffect, useState } from "react";

import { useSales } from "../../context/SaleContext";
import { useCustomers } from "../../context/CustomerContext";
import { useProducts } from "../../context/ProductContext";
import { FaEdit, FaTrash } from "react-icons/fa";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Modal from "../../components/Modal";

dayjs.extend(utc);

export default function SalePage() {
  const { sales, getSales, createSale } = useSales();
  const { customers, getCustomers } = useCustomers();
  const { products, getProducts } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [saleDate, setSaleDate] = useState("");
  const [saleDetails, setSaleDetails] = useState([
    { productId: "", quantity: "", price: "" },
  ]);

  useEffect(() => {
    getSales();
    getCustomers();
    getProducts();
  }, []);

  const handleAddDetail = () => {
    setSaleDetails([
      ...saleDetails,
      { productId: "", quantity: "", price: "" },
    ]);
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = saleDetails.map((detail, i) =>
      i === index ? { ...detail, [field]: value } : detail
    );
    setSaleDetails(updatedDetails);
  };

  const handleCreateSale = async () => {
    const formattedDate = dayjs(saleDate).toISOString();
    const purchase = {
      customerId: parseInt(customerId),
      saleDate: formattedDate,
      saleDetails: saleDetails.map((detail) => ({
        productId: parseInt(detail.productId),
        quantity: parseInt(detail.quantity),
        price: parseFloat(detail.price),
      })),
    };
    console.log("Datos de la venta a enviar:", purchase); // Verifica los datos aquí
    try {
      await createSale(purchase);
      setIsModalOpen(false);
      setCustomerId("");
      setSaleDate("");
      setSaleDetails([{ productId: "", quantity: "", price: "" }]);
      getSales();
    } catch (error) {
      console.error("Error al crear la venta:", error.response.data);
    }
  };

  const getCustomerName = (id) => {
    const customer = customers.find((customer) => customer.id === id);
    return customer ? customer.firstName : "Desconocido";
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4 text-center'>VENTAS</h1>
      <div className='py-5'>
        <button
          onClick={() => setIsModalOpen(true)}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Crear Venta
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className='text-xl font-bold mb-4'>Nueva Venta</h2>
        <div className='mb-4'>
          <label className='block'>Cliente:</label>
          <select
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className='w-full p-2 border rounded mb-2'
          >
            <option value=''>Seleccione Cliente</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.firstName}
              </option>
            ))}
          </select>
          <label className='block'>Fecha de Venta:</label>
          <input
            type='date'
            value={saleDate}
            onChange={(e) => setSaleDate(e.target.value)}
            className='w-full p-2 border rounded mb-2'
          />
          <h3 className='font-semibold mb-2'>Detalles de Venta:</h3>
          {saleDetails.map((detail, index) => (
            <div key={index} className='mb-4'>
              <label className='block'>Producto:</label>
              <select
                value={detail.productId}
                onChange={(e) =>
                  handleDetailChange(index, "productId", e.target.value)
                }
                className='w-full p-2 border rounded mb-2'
              >
                <option value=''>Seleccione un producto</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
              <label className='block'>Cantidad:</label>
              <input
                type='number'
                value={detail.quantity}
                onChange={(e) =>
                  handleDetailChange(index, "quantity", e.target.value)
                }
                className='w-full p-2 border rounded mb-2'
              />
              <label className='block'>Precio:</label>
              <input
                type='number'
                step='0.01'
                value={detail.price}
                onChange={(e) =>
                  handleDetailChange(index, "price", e.target.value)
                }
                className='w-full p-2 border rounded mb-2'
              />
            </div>
          ))}
          <button
            onClick={handleAddDetail}
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4'
          >
            Agregar Detalle
          </button>
          <div className='flex justify-end'>
            <button
              onClick={() => setIsModalOpen(false)}
              className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2'
            >
              Cancelar
            </button>
            <button
              onClick={handleCreateSale}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Crear Venta
            </button>
          </div>
        </div>
      </Modal>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 rounded-xl'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b'>#</th>
              <th className='py-2 px-4 border-b'>Cliente ID</th>
              <th className='py-2 px-4 border-b'>Monto Total</th>
              <th className='py-2 px-4 border-b'>Fecha</th>
              <th className='py-2 px-4 border-b'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className='hover:bg-gray-100 text-center'>
                <td className='py-2 px-4 border-b'>{sale.id}</td>
                <td className='py-2 px-4 border-b'>
                  {getCustomerName(sale.customerId)}
                </td>
                <td className='py-2 px-4 border-b'>{sale.totalAmount}</td>
                <td className='py-2 px-4 border-b'>
                  {dayjs(sale.saleDate).utc().format("MMMM DD, YYYY")}
                </td>
                <td className='py-2 px-4 border-b'>
                  <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2'>
                    <FaEdit />
                  </button>
                  <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2'>
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
