import { useEffect } from "react";
import { useCustomers } from "../../context/CustomerContext";

export default function CustomerPage() {
  const { customers, getCustomers } = useCustomers();

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4 text-center'>CLIENTES</h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white border rounded-xl'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b'>#</th>
              <th className='py-2 px-4 border-b'>Nombre</th>
              <th className='py-2 px-4 border-b'>Apellidos</th>
              <th className='py-2 px-4 border-b'>Correo</th>
              <th className='py-2 px-4 border-b'>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className='text-center hover:bg-gray-100'>
                <td className='py-2 px-4 border-b'>{customer.id}</td>
                <td className='py-2 px-4 border-b'>{customer.firstName}</td>
                <td className='py-2 px-4 border-b'>{customer.lastName}</td>
                <td className='py-2 px-4 border-b'>{customer.email}</td>
                <td className='py-2 px-4 border-b'>{customer.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
