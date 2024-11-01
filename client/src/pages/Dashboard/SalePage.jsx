import { useEffect } from "react";
import { useSales } from "../../context/SaleContext";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default function SalePage() {
  const { sales, getSales } = useSales();

  useEffect(() => {
    getSales();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-4 text-center'>VENTAS</h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border border-gray-200 rounded-xl'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b'>#</th>
              <th className='py-2 px-4 border-b'>Cliente ID</th>
              <th className='py-2 px-4 border-b'>Monto Total</th>
              <th className='py-2 px-4 border-b'>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id} className='hover:bg-gray-100 text-center'>
                <td className='py-2 px-4 border-b'>{sale.id}</td>
                <td className='py-2 px-4 border-b'>{sale.customerId}</td>
                <td className='py-2 px-4 border-b'>{sale.totalAmount}</td>
                <td className='py-2 px-4 border-b'>
                  {dayjs(sale.saleDate).utc().format("MMMM DD, YYYY")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
