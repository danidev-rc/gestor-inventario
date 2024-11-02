import { useEffect, useState } from "react";
import { usePurchases } from "../../context/PurchaseContext";
import { useSuppliers } from "../../context/SupplierContext";
import { useProducts } from "../../context/ProductContext";
import { FaEdit, FaTrash } from "react-icons/fa";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import Modal from "../../components/Modal";

dayjs.extend(utc);

export default function PurchasePage() {
  const {
    purchases,
    getPurchases,
    createPurchase,
    updatePurchase,
    deletePurchase,
  } = usePurchases();
  const { suppliers, getSuppliers } = useSuppliers();
  const { products, getProducts } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState(null);
  const [supplierId, setSupplierId] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [purchaseDetails, setPurchaseDetails] = useState([
    { productId: "", quantity: "", price: "" },
  ]);

  useEffect(() => {
    getPurchases();
    getSuppliers();
    getProducts();
  }, []);

  const handleAddDetail = () => {
    setPurchaseDetails([
      ...purchaseDetails,
      { productId: "", quantity: "", price: "" },
    ]);
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = purchaseDetails.map((detail, i) =>
      i === index ? { ...detail, [field]: value } : detail
    );
    setPurchaseDetails(updatedDetails);
  };

  const handleOpenModal = (purchase = null) => {
    if (purchase) {
      // Set data for editing
      setEditingPurchase(purchase);
      setSupplierId(purchase.supplierId.toString());
      setPurchaseDate(dayjs(purchase.purchaseDate).format("YYYY-MM-DD"));
      setPurchaseDetails(
        purchase.purchaseDetails.map((detail) => ({
          productId: detail.productId.toString(),
          quantity: detail.quantity.toString(),
          price: detail.price.toString(),
        }))
      );
    } else {
      // Set data for new purchase
      setEditingPurchase(null);
      setSupplierId("");
      setPurchaseDate("");
      setPurchaseDetails([{ productId: "", quantity: "", price: "" }]);
    }
    setIsModalOpen(true);
  };

  const handleCreateOrUpdatePurchase = async () => {
    const formattedDate = dayjs(purchaseDate).toISOString();
    const purchase = {
      supplierId: parseInt(supplierId),
      purchaseDate: formattedDate,
      purchaseDetails: purchaseDetails.map((detail) => ({
        productId: parseInt(detail.productId),
        quantity: parseInt(detail.quantity),
        price: parseFloat(detail.price),
      })),
    };

    try {
      if (editingPurchase) {
        await updatePurchase(editingPurchase.id, purchase);
      } else {
        await createPurchase(purchase);
      }
      setIsModalOpen(false);
      setSupplierId("");
      setPurchaseDate("");
      setPurchaseDetails([{ productId: "", quantity: "", price: "" }]);
      getPurchases(); // Refresh purchases
    } catch (error) {
      console.error("Error al crear/editar la compra:", error.response.data);
    }
  };

  const handleDeletePurchase = async (purchaseId) => {
    try {
      await deletePurchase(purchaseId);
      getPurchases(); // Refresh purchases after deletion
    } catch (error) {
      console.error("Error al eliminar la compra:", error);
    }
  };

  const getSupplierName = (id) => {
    const supplier = suppliers.find((supplier) => supplier.id === id);
    return supplier ? supplier.name : "Proveedor no encontrado";
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4 text-center'>COMPRAS</h1>
      <div className='py-5'>
        <button
          onClick={() => handleOpenModal()}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Crear Compra
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className='text-xl font-bold mb-4'>
          {editingPurchase ? "Editar Compra" : "Nueva Compra"}
        </h2>
        <div className='mb-4'>
          <label className='block'>Proveedor:</label>
          <select
            value={supplierId}
            onChange={(e) => setSupplierId(e.target.value)}
            className='w-full p-2 border rounded mb-2'
          >
            <option value=''>Seleccione un proveedor</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
          <label className='block'>Fecha de Compra:</label>
          <input
            type='date'
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className='w-full p-2 border rounded mb-2'
          />
          <h3 className='font-semibold mb-2'>Detalles de Compra:</h3>
          {purchaseDetails.map((detail, index) => (
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
              onClick={handleCreateOrUpdatePurchase}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              {editingPurchase ? "Actualizar Compra" : "Crear Compra"}
            </button>
          </div>
        </div>
      </Modal>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 rounded-xl'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b'>#</th>
              <th className='py-2 px-4 border-b'>Proveedor</th>
              <th className='py-2 px-4 border-b'>Monto Total</th>
              <th className='py-2 px-4 border-b'>Fecha</th>
              <th className='py-2 px-4 border-b'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.id} className='hover:bg-gray-100 text-center'>
                <td className='py-2 px-4 border-b'>{purchase.id}</td>
                <td className='py-2 px-4 border-b'>
                  {getSupplierName(purchase.supplierId)}
                </td>
                <td className='py-2 px-4 border-b'>{purchase.totalAmount}</td>
                <td className='py-2 px-4 border-b'>
                  {dayjs(purchase.purchaseDate).utc().format("MMMM DD, YYYY")}
                </td>
                <td className='py-2 px-4 border-b'>
                  <button
                    className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2'
                    onClick={() => handleOpenModal(purchase)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2'
                    onClick={() => handleDeletePurchase(purchase.id)}
                  >
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
