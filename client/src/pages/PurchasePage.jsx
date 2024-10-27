import { useEffect } from "react";
import { usePurchases } from "../context/PurchaseContext";

export default function PurchasePage() {
  const { purchases, getPurchases } = usePurchases();

  useEffect(() => {
    getPurchases();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>PurchasePage</h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b'>ID</th>
              <th className='py-2 px-4 border-b'>Supplier ID</th>
              <th className='py-2 px-4 border-b'>Total Amount</th>
              <th className='py-2 px-4 border-b'>Purchase Date</th>
              <th className='py-2 px-4 border-b'>User ID</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase) => (
              <tr key={purchase.id} className='hover:bg-gray-100 text-center'>
                <td className='py-2 px-4 border-b'>{purchase.id}</td>
                <td className='py-2 px-4 border-b'>{purchase.supplierId}</td>
                <td className='py-2 px-4 border-b'>{purchase.totalAmount}</td>
                <td className='py-2 px-4 border-b'>{purchase.purchaseDate}</td>
                <td className='py-2 px-4 border-b'>{purchase.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
