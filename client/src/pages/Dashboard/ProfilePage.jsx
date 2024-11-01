import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { BriefcaseIcon, MapPinIcon } from "@heroicons/react/24/solid";

export default function ProfilePage() {
  const { user, getUser } = useAuth();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className='py-20 px-5'>
      <div className='bg-white shadow rounded-lg overflow-hidden'>
        <div className='h-32 bg-gradient-to-r from-blue-500 to-indigo-600'></div>
        <div className='px-6 py-4'>
          <div className='flex flex-col items-center -mt-16'>
            <img
              src='https://api.dicebear.com/7.x/avataaars/svg?seed=John'
              alt='Profile'
              className='w-32 h-32 rounded-full border-4 border-white bg-white'
            />
            <h2 className='mt-4 text-2xl font-bold text-gray-900'>
              {user.name}
            </h2>
            <p className='text-gray-600'>{user.email}</p>

            <div className='mt-4 flex items-center text-gray-600'>
              <BriefcaseIcon className='h-5 w-5 mr-2' />
              <span>Empresa Gestor de inventario</span>
            </div>

            <div className='mt-2 flex items-center text-gray-600'>
              <MapPinIcon className='h-5 w-5 mr-2' />
              <span>San Francisco, CA</span>
            </div>

            <div className='mt-6 flex space-x-4'>
              <button className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
                Edit Profile
              </button>
              <button className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50'>
                Share Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
