import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../Configs/AuthContext';


const DetailPayment = () => {

    const { payment, id } = useParams();
    const [cart, setProducts] = useState(null);
    console.log(cart);
   
    const {user} = useContext(AuthContext);
    const email = user?.email;
    const name = user?.displayName;
    const currentDate = new Date();

    useEffect(() => {
        axios
          .get(`https://postgre-server.vercel.app/addProducts/${id}`)
          .then((res) => setProducts(res.data))
          .catch((error) => console.error(error));
      }, [id]);



    const handlePayment = async (payment, email, currentDate, name, cart) =>{
        // console.log(payment, email, currentDate, name, cart);
        try{
        axios.post(`https://postgre-server.vercel.app/myPayment`, {payment, email, currentDate, name, cart})
        .then((response) => {console.log(response.data.url)
    window.location.replace(response.data.url)});
    } catch(error){
        console.error('the error', error);
    }
}
    return (
        <div  className='mx-40 mt-20'>
        <div className="max-w-2xl flex justify-center items-center mx-auto">
        <div className="bg-gray-500 p-6 grid grid-cols-1 md:mx-auto border rounded-lg mx-auto">
        <button type="button" className="text-gray-900 bg-white active:bg-slate-800 border border-gray-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 active:text-white mr-2 mb-2">
        <img src="https://i.ibb.co/WDdJtgw/visa-removebg-preview.png" alt="" className='w-9 h-4'/>
        Pay with Visa
        </button>
            <button type="button" className="text-gray-900 bg-white  border border-gray-200 active:bg-white active:text-black focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  dark:bg-gray-800 dark:border-gray-700 dark:text-white  mr-2 mb-2">
        <img src="https://i.ibb.co/rcWgG3W/mastercard-removebg-preview.png" alt="" className='w-8 h-4'/>
        Pay with MasterCard
        </button>
            <button  onClick={() => { handlePayment(payment, email, currentDate, name, cart); 
               }} type="button" className="text-gray-900 bg-gray-100 active:text-white  active:bg-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center  mr-2 mb-2">
        <img src="https://i.ibb.co/R9mqbMR/pngtree-letter-z-logo-png-png-image-3045054-removebg-preview.png" alt="" className='w-4 h-4 mx-3'/>
        Pay with SSLCOMMERZ
        </button>
               
            </div>
        
        </div>
        </div>
       
    );
};

export default DetailPayment;