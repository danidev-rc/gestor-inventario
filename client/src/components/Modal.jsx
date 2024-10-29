export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-4 rounded shadow-lg'>
        <button className='absolute top-2 right-2' onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
