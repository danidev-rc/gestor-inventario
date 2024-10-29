import { useEffect } from "react";
import { useSuppliers } from "../../context/SupplierContext";

export default function SupplierPage() {
  const { suppliers, getSuppliers } = useSuppliers();

  useEffect(() => {
    getSuppliers();
  }, []);

  return (
    <div className='text-center'>
      <h1>SupplierPage</h1>
      <div>
        {suppliers.map((supplier) => (
          <div key={supplier.id}>
            <h1>{supplier.id}</h1>
            <h1>{supplier.name}</h1>
            <h1>{supplier.email}</h1>
            <h1>{supplier.phone}</h1>
            <h1>{supplier.address}</h1>
            <h1>{supplier.userId}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}
