import Swal from 'sweetalert2';
import { useFetchProduct } from '../store';
import { useEffect } from 'react';

const formatDate = (date) => {
  const dateObj = new Date(date);
  const dd = String(dateObj.getDate()).padStart(2, '0');
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const yyyy = dateObj.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

const Dashboard = () => {
  const { loading, error, data, fetchProduct } = useFetchProduct(
    (state) => state
  );

  console.log(data);
  useEffect(() => {
    if (error) {
      Swal.fire({
        title: 'Error',
        text: error,
        icon: 'error',
      });
    }

    fetchProduct();
  }, [error]);
  return (
    <>
      <div className="m-8">
        <div>
          <h1 className="text-2xl font-medium text-gray-700 mb-5">Dashboard</h1>
        </div>
        {loading ? (
          'Loading...'
        ) : (
          <div className="overflow-x-auto relative shadow-md rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                <tr>
                  <th scope="col" className="py-5 px-6">
                    No.
                  </th>
                  <th scope="col" className="py-5 px-6">
                    Product Name
                  </th>
                  <th scope="col" className="py-5 px-6">
                    Image
                  </th>
                  <th scope="col" className="py-5 px-6">
                    Price
                  </th>
                  <th scope="col" className="py-5 px-6">
                    Created At
                  </th>
                  <th scope="col" className="py-5 px-6">
                    Posted by
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-100 "
                  >
                    <td className="py-3 px-6">{item.id}</td>
                    <td className="py-3 px-6">{item.productName}</td>
                    <td className="py-3 px-6">
                      <img
                        src={item.imageUrl}
                        alt={item.productName}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="py-3 px-6">{item.price}</td>
                    <td className="py-3 px-6">{formatDate(item.createdAt)}</td>
                    <td className="py-3 px-6">{item.User?.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;
