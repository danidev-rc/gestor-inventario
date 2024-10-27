import { useEffect } from "react";
import { useSales } from "../context/SaleContext";

export default function SalePage() {
  const { sales, getSales } = useSales();

  useEffect(() => {
    getSales();
  }, []);

  return (
    <div className='text-center py-6'>
      <h1 className='text-3xl font-bold'>SALES</h1>
      <div className='py-4'>
        <table className='table-auto w-full'>
          <thead>
            <tr>
              <th className='px-4 py-2'>Sale ID</th>
              <th className='px-4 py-2'>Customer ID</th>
              <th className='px-4 py-2'>Total Amount</th>
              <th className='px-4 py-2'>Sale Date</th>
              <th className='px-4 py-2'>User ID</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td className='border px-4 py-2'>{sale.id}</td>
                <td className='border px-4 py-2'>{sale.customerId}</td>
                <td className='border px-4 py-2'>{sale.totalAmount}</td>
                <td className='border px-4 py-2'>{sale.saleDate}</td>
                <td className='border px-4 py-2'>{sale.userId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
