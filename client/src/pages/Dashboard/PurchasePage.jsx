import { useEffect } from "react";
import { usePurchases } from "../../context/PurchaseContext";
import { useSuppliers } from "../../context/SupplierContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
export default function PurchasePage() {
  const { purchases, getPurchases } = usePurchases();
  const { suppliers, getSuppliers } = useSuppliers();

  useEffect(() => {
    getPurchases();
    getSuppliers();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4 text-center'>COMPRAS</h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 rounded-xl'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b'>#</th>
              <th className='py-2 px-4 border-b'>Proveedor</th>
              <th className='py-2 px-4 border-b'>Monto Total</th>
              <th className='py-2 px-4 border-b'>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.id} className='hover:bg-gray-100 text-center'>
                <td className='py-2 px-4 border-b'>{purchase.id}</td>
                <td className='py-2 px-4 border-b'>{purchase.supplierId}</td>
                <td className='py-2 px-4 border-b'>{purchase.totalAmount}</td>
                <td className='py-2 px-4 border-b'>
                  {dayjs(purchase.purchaseDate).utc().format("MMMM DD, YYYY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
