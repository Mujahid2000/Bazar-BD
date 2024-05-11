import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Configs/AuthContext';
import axios, { all } from 'axios';
import { FaUser } from 'react-icons/fa';
import { FcSalesPerformance } from 'react-icons/fc';
import { TbTruckDelivery } from 'react-icons/tb';
import { GrDocumentPerformance } from 'react-icons/gr';

const Dasboard = () => {
    const {user } = useContext(AuthContext);
    const [allUser, setAllUser] = useState(null);
    const [order, setOrder] = useState(null);
    const [totalOrder, setTotalOrder] = useState(null);
    const [totalPrice , setTotalPrice] = useState(null);
    const totalUser = (allUser?.length);
    const photo = user?.photoURL;

    useEffect(() => {
        axios.get('https://bazar-bd-server.vercel.appusers')
            .then(res => {
                setAllUser(res.data)})
            .catch(error => console.error(error));
    }, []);
 
    useEffect(() =>{
        axios.get('https://bazar-bd-server.vercel.apptotalOrder')
        .then(res => {
          setOrder(res.data)
          let dataLength = 0;
          let totalPrice = 0;
          res.data.forEach(item => {
            dataLength += item.sendingData.length
          });
          res.data.forEach(item => {
            res.data.map(item => (
              item?.sendingData.map(taka => (
                totalPrice += taka?.data?.price
              ))
            ))
          });
          setTotalOrder(dataLength)
          setTotalPrice(totalPrice)
        })
      },[])
  
    
    return (
        <div className='lg:min-w-[90rem] lg:ml-16 px-5 mt-24 mx-auto '>
      

<div className="flex flex-wrap bg-pink-500 ">
    <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5 mb-4">
    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-3 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
        <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            <h5 className="text-blueGray-400 uppercase font-bold text-xs"> New Users</h5>
            <span className="font-semibold text-xl text-blueGray-700">{totalUser}</span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-red-500">
            <FaUser />
            </div>
            </div>
        </div>
        <p className="text-sm text-blueGray-400 mt-4">
            <span className="text-emerald-500 mr-2"><i className="fas fa-arrow-up"></i> 2,99% </span>
            <span className="whitespace-nowrap"> Since last month </span></p>
        </div>
    </div>
    </div>

    <div className=" mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-4 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
        <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            <h5 className="text-blueGray-400 uppercase font-bold text-xs">Monthly Sales</h5>
            <span className="font-semibold text-xl text-blueGray-700">${totalPrice?.toFixed(2)}</span>

            </div>
            <div className="relative w-auto pl-4 flex-initial">
            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-white">
            <FcSalesPerformance />
            </div>
            </div>
        </div>
        <p className="text-sm text-blueGray-400 mt-4">
            <span className="text-red-500 mr-2"><i className="fas fa-arrow-down"></i> 4,01%</span>
            <span className="whitespace-nowrap"> Previous Month </span></p>
        </div>
    </div>
    </div>

    <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
        <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            <h5 className="text-blueGray-400 uppercase font-bold text-xs">Monthly Delivery</h5>
            <span className="font-semibold text-xl text-blueGray-700">{totalOrder}</span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-black">
            <TbTruckDelivery className='' />
            </div>
            </div>
        </div>
        <p className="text-sm text-blueGray-400 mt-4">
            <span className="text-red-500 mr-2"><i className="fas fa-arrow-down"></i> 1,25% </span>
            <span className="whitespace-nowrap"> Since yesterday </span></p>
        </div>
    </div>
    </div>

    <div className="mt-4 w-full lg:w-6/12 xl:w-3/12 px-5">
    <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
        <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
            <h5 className="text-blueGray-400 uppercase font-bold text-xs">Performance</h5>
            <span className="font-semibold text-xl text-blueGray-700">51.02% </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full  bg-emerald-500">
            <GrDocumentPerformance />
            </div>
            </div>
        </div>
        <p className="text-sm text-blueGray-400 mt-4">
            <span className="text-emerald-500 mr-2"><i className="fas fa-arrow-up"></i> 12% </span>
            <span className="whitespace-nowrap"> Since last mounth </span></p>
        </div>
    </div>
    </div>
</div>
</div>
    );
};

export default Dasboard;
