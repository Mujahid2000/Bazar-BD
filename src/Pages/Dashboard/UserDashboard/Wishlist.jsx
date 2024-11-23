import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Configs/AuthContext";
import Rating from "../../Result/Rating";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useContext(AuthContext);
  const email = user?.email;
// console.log(wishlist);
  useEffect(() => {
    
    if (email) {
      axios
        .get(`https://postgre-server.vercel.app/wishlist/${email}`)
        .then((res) => setWishlist(res.data.data))
        .catch((error) => console.log(error));
    }
  }, [email, wishlist]);

  const handleDelete = (id) => {
    axios
      .delete(`https://postgre-server.vercel.app/wishlist/${id}`)
      .then(() =>
        setWishlist((prevState) => prevState.filter((item) => item._id !== id))
      )
      .catch((error) => console.log(error));
  };

  return (
    <div className="mt-20 mb-5">
      <h2 className="text-2xl font-semibold mb-6 text-center">Your Wishlist</h2>
      {wishlist.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rating
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {wishlist.map((item) => (
              <tr key={item.
                wish_id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-20 w-20">
                      <Link to={`/productDetails/${item.product_id}`}>
                      <img className="h-20 w-20 rounded-full" src={item.product_image[0]} alt="" />
                      </Link>
                    </div>
                    <div className="ml-4">
                     
                      
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`/productDetails/${item.product_id}`}>
                  <div className="text-sm hover:text-orange-600 text-gray-900">{item.productname || "Regional Paradigm Technician"}</div>
                  </Link>
                  <div className="text-sm text-gray-500">{item.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  ${item.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Rating stars={item.rating}/>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.description || "description"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDelete(item.wish_id)}
                    className="text-white rounded-md px-3 py-2 bg-red-600 hover:bg-gradient-to-r from-sky-600 to-cyan-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-600 mt-6">Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default Wishlist;
