import { FaEdit, FaTrash } from "react-icons/fa";

export const Table = ({ headers, data, onEdit, onDelete }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white border rounded-xl'>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className='py-2 px-4 border-b'>
                {header}
              </th>
            ))}
            <th className='py-2 px-4 border-b'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className='text-center'>
              {headers.map((headerKey, idx) => (
                <td key={idx} className='py-2 px-4 border-b'>
                  {item[headerKey.toLowerCase()]}
                </td>
              ))}
              <td className='py-2 px-4 border-b'>
                <button
                  className='text-blue-500 hover:text-blue-700 mr-2'
                  onClick={() => onEdit(item)}
                >
                  <FaEdit />
                </button>
                <button
                  className='text-red-500 hover:text-red-700'
                  onClick={() => onDelete(item)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
