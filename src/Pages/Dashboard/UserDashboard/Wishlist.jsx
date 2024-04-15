import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Configs/AuthContext";
import Rating from "../../Result/Rating";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState(null);
    const { user } = useContext(AuthContext);
    const email = user.email;

    useEffect(() => {
        axios.get(`https://bazar-bd-server.vercel.app/wishlist/${email}`)
            .then(res => {
                console.log(res.data); // Log the response to check if it's as expected
                setWishlist(res.data);
            })
            .catch(error => console.log(error));
    }, [email]);

	const handleDelete = (id) =>{
		console.log(id);
		axios.delete(`https://bazar-bd-server.vercel.app/wishlist/${id}`)
		.then(() => setWishlist(prevState => prevState.filter(item => item._id !== id)))
		.catch(error => console.log(error))
	}

    return (
       
            <div className="ml-14 mt-20 mb-5 md:mx-64 lg:mx-80">
            {wishlist?.map(({ _id, product }) => (
                <div key={_id} className="flex flex-col justify-center mt-4">
                    <div className="relative flex flex-col md:flex-row rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
                        <div className="w-full md:w-1/3 bg-white grid place-items-center">
                            <img src={product.product_image} alt={product.productName} className="rounded-xl" />
                        </div>
                        <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
                            <div className="flex justify-between item-center">
                                <p className="text-gray-500 font-medium hidden md:block">{product.category}</p>
                               <Rating stars={product.rating}/>
                                <button onClick={() =>handleDelete(_id)} className="bg-gray-300 rounded-md px-4 active:bg-red-600 active:text-white py-1 text-xs font-medium text-gray-800 hidden md:block">Remove</button>
                            </div>
                            <h3 className="font-black text-gray-800 md:text-3xl text-xl">{product.productName}</h3>
                            <p className="md:text-lg text-gray-500 text-base">{product.description}</p>
                            <p className="text-xl font-black text-gray-800">
                                ${product.price}
                                <span className="font-normal text-gray-600 text-base">/item</span>
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      
    );
};

export default Wishlist;
