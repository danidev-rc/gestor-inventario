import { useEffect } from "react";
import { useCustomers } from "../../context/CustomerContext";

export default function CustomerPage() {
  const { customers, getCustomers } = useCustomers();

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <div className='text-center'>
      <h1>CustomerPage</h1>
      <div>
        {customers.map((customer) => (
          <div key={customer.id}>
            <h1>{customer.id}</h1>
            <h1>{customer.firstName}</h1>
            <h1>{customer.lastName}</h1>
            <h1>{customer.email}</h1>
            <h1>{customer.phone}</h1>
            <h1>{customer.userId}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
