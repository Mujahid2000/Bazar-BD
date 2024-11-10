import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductsCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      axios.get('https://postgre-server.vercel.app/product')
          .then(res => {
              setProducts(res.data.data);
              setLoading(false);
          })
          .catch(error => {
              console.error(error);
              setError("Failed to load products.");
              setLoading(false);
          });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
      <div className='max-w-[1400px] mx-auto my-8 px-4 lg:px-0'>
          <h2 className='text-2xl font-bold mb-6'>Recommended items</h2>
          <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
              {Array.isArray(products) && products?.slice(0, 10).map((item) => (
                  <div key={item.id} className='bg-white border rounded-lg p-4 flex flex-col justify-between'>
                      <img
                          className='w-full h-40 object-contain mb-4'
                          src={item.product_image || 'default-image-url.jpg'}
                          alt={item.productname || 'Product'}
                      />
                      <Link to={`/productDetails/${item.id}`}>
                          <div>
                              <p className='text-lg font-semibold'>${item.price || 'N/A'}</p>
                              <p className='text-gray-500 hover:text-sky-600'>{item. productname ? item?.productname.slice(0,30) : 'Unnamed Product'}</p>
                          </div>
                      </Link>
                  </div>
              ))}
          </div>
      </div>
  );
};

export default ProductsCard;
