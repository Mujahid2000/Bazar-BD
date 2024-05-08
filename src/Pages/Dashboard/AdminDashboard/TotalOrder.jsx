import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";


const TotalOrder = () => {
  const [order, setOrder] = useState(null);
 console.log(order);
  const [totalOrder, setTotalOrder] = useState(null);
  const [totalPrice , setTotalPrice] = useState(null);
  // console.log(totalPrice);


  useEffect(() =>{
    axios.get('https://bazar-bd-server.vercel.app/totalOrder')
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
  <div className="flex flex-col  bg-gray-100 mx-auto mt-20 ">
<div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-5">
<div className="container mx-auto ">
    <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
      <div className="h-20 bg-red-400 flex items-center justify-between">
        <p className="mr-0 text-white text-lg pl-5">Total Order Items</p>
      </div>
      <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
        <p>TOTAL</p>
      </div>
      <p className="py-4 text-3xl ml-5">{totalOrder}</p>
  
    </div>
  </div>
   
  <div className="container mx-auto ">
    <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
      <div className="h-20 bg-blue-500 flex items-center justify-between">
        <p className="mr-0 text-white text-lg pl-5">Today Total Customer</p>
      </div>
      <div className="flex justify-between px-5 pt-6 mb-2 text-sm text-gray-600">
        <p>TOTAL</p>
      </div>
      <p className="py-4 text-3xl ml-5">{order?.length}</p>

    </div>
  </div>

  <div className="container mx-auto ">
    <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
      <div className="h-20 bg-purple-400 flex items-center justify-between">
        <p className="mr-0 text-white text-lg pl-5">Total Sell</p>
      </div>
      <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
        <p>TOTAL</p>
      </div>
      <p className="py-4 text-3xl ml-5">${totalPrice?.toFixed(2)}</p>

    </div>
  </div>

  <div className="container mx-auto">
    <div className="w-72 bg-white max-w-xs mx-auto rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-100 cursor-pointer">
      <div className="h-20 bg-purple-900 flex items-center justify-between">
        <p className="mr-0 text-white text-lg pl-5">Total Delivery</p>
      </div>
      <div className="flex justify-between pt-6 px-5 mb-2 text-sm text-gray-600">
        <p>TOTAL</p>
      </div>
      <p className="py-4 text-3xl ml-5">0</p>
 
    </div>
  </div>
</div>

<div className="flex justify-center bg-gray-100 py-10 p-5">

<div className="bg-white p-9 ml-6 md:ml-12 lg:ml-1 mt-9 mr-3 rounded-md w-full">
	<div className=" flex items-center justify-between pb-6">
		<div>
			<h2 className="text-gray-600 font-semibold">Products Order List</h2>
			<span className="text-xs">All products item</span>
		</div>
		<div className="flex items-center justify-between">
			<div className="flex bg-gray-50 items-center p-2 rounded-md">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
					fill="currentColor">
					<path fill-rule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clip-rule="evenodd" />
				</svg>
				<input className="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..."/>
          </div>
				
			</div>
		</div>
		<div>
			<div className="  overflow-x-auto">
        <div className="h-80 scroll-m-0"> 

				<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table className="min-w-full leading-normal ">
						<thead>
							<tr>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Products Name
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Shop Name
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Delivery Date
								</th>
								
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Price 
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Status
								</th>
							</tr>
						</thead>
						<tbody className="">
         

						{
    order && order.map(item => (
        item.sendingData && item.sendingData.map(orderItem => (
            <tr key={orderItem._id} className="">
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                            <img className="w-full h-full rounded-md" src={orderItem.data.product_image} alt="" />
                        </div>
                        <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">{orderItem.data.productName}</p>
                        </div>
                    </div>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">Jan 11, 2020</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">Jan 21, 2020</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">${orderItem.data.price}</p>
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">True</p>
                </td>
            </tr>
        ))
    ))
}

						
						</tbody>
					</table>
					<div
						className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
						<span className="text-xs xs:text-sm text-gray-900">
                            Showing 1 to 4 of 50 Entries
                        </span>
						<div className="inline-flex mt-2 xs:mt-0">
							<button
                                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                Prev
                            </button>
							&nbsp; &nbsp;
							<button
                                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                Next
                            </button>
						</div>
					</div>
				</div>
        </div>
			</div>
		</div>
	</div>
  

   
   
    
      
    </div>
        </div>
    );
};

export default TotalOrder;