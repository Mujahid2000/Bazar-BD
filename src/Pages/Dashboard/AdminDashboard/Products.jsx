import { data } from 'autoprefixer';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Products = () => {
	const [myProduct, setMyProducts] = useState(null);
	const [open, setOpen] = useState(false);
	const [selectedProduct , setSelectedProducts] = useState(null)
	const data = selectedProduct;
	

	useEffect(() =>{
		axios.get('https://bazar-bd-server.vercel.app/addProducts')
		.then(res => setMyProducts(res.data)
		)
		.catch((error) => console.error(error))
	},[])

	const handlePassInfoShow = (data) => {
		setOpen(true);
		setSelectedProducts(data)
		}

		const handleProductUpdate = (e) =>{
			e.preventDefault();
			const form = new FormData(e.currentTarget)
			const productName = form.get('productName')
			const price 	  = form.get('Price')
			const discountPrice = form.get('discountPrice')
			const discountPercentage = form.get('discountPercentage')
			const stock = form.get('newStockItem')
			const productData = data;
			console.log({productName,price, discountPrice, stock, productData, discountPercentage});
			axios.post('http://localhost:5000/productDiscount', {productName,price, discountPrice, stock, productData, discountPercentage})
		} 


		const handleSelectChange = async (event, data) => {
			const selectedValue = event.target.value;
			const response = await axios.put(
				`https://bazar-bd-server.vercel.app/addProductsUpdate/${data._id}`,{ stock: selectedValue }
			  ); console.log(response.data); // Handle success response if needed
		
			} 
			


    return (
        <div>

<div className="max-w-7xl ">

	<div className="relative overflow-x-auto bg-gray-950 shadow-md sm:rounded-lg">
		<div className="p-4">
			<label for="table-search" className="sr-only">Search</label>
			<div className="relative mt-1">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd"
							d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
							clip-rule="evenodd"></path>
					</svg>
				</div>
				<input type="text" id="table-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items"/>
        </div>
			</div>
			<table className="w-full  text-sm text-left text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="p-4">
							<div className="flex items-center">
								<input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
								<label for="checkbox-all-search" className="sr-only">checkbox</label>
							</div>
						</th>
						<th scope="col" className="px-6 py-3">
							Product name
						</th>
						<th scope="col" className="px-6 py-3">
							Color
						</th>
						<th scope="col" className="px-6 py-3">
							Category
						</th>
						
						<th scope="col" className="px-6 py-3">
							Price
						</th>
						<th scope="col" className="px-6 py-3">
							Stock
						</th>
						<th scope="col" className="px-6 py-3">
							<span className="sr-only">Edit</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{
					myProduct &&	myProduct.map(data => (
							<tr key={data._id}
						className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
						<td className="w-4 p-4">
							<div className="flex items-center">
								<input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
								<label for="checkbox-table-search-1" className="sr-only">checkbox</label>
							</div>
						</td>
						<th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
							{data?.productName}
						</th>
						<td className="px-6 py-4">
							Sliver
						</td>
						<td className="px-6 py-4">
							{data?.category}
						</td>
						<td className="px-6 py-4">
							${data?.price}
						</td>
						<td className="px-6 py-4">
							<select onChange={(event) => handleSelectChange(event, data)} className='bg-white rounded-md'>
								<option value="In Stock"> In Stock</option>
								<option value="Stock Out"> Stock Out</option>
							</select>
						</td>
						<td className="px-6 py-4 text-right">
					<p onClick={() => {handlePassInfoShow(data)}}  className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline">Edit</p>
						</td>
						
					</tr>
					
						))
					}
					
				</tbody>
			</table>
		</div>

		<p className="mt-5">Here is All Products List. In here you can Update or Delete any Products using this table. This Table is for Admin for control the Product Available.
		</p>
		
	</div>
	<div className="flex justify-center items-center h-screen">
      <div>
        
        {open && (
          <div className="fixed inset-0 px-2 z-10 overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75"></div>
            {/* Modal Content */}
            <div className="bg-white rounded-md shadow-xl overflow-hidden max-w-md w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3 z-50">
              {/* Modal Header */}
              <div className="bg-indigo-500 text-white px-4 py-2 flex justify-between">
                <h2 className="text-lg font-semibold text-center">Update Product</h2>
              </div>
              {/* Modal Body */}
              <div className="p-4">
			
<body className="bg-white  flex items-center justify-center ">

    <div className="bg-white p-8 rounded shadow-md max-w-md w-full mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Details</h2>

        <form onSubmit={handleProductUpdate} method="POST">
         
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label  className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input type="text" id="productName" name="productName" placeholder={selectedProduct.productName} value={selectedProduct.productName} className="mt-1 p-2 w-full border rounded-md"/>
                </div>
                <div>
                    <label  className="block text-sm font-medium text-gray-700">Price</label>
                    <input type="number" placeholder={selectedProduct.price} id="Price" name="Price" value={selectedProduct.price} className="mt-1 p-2 w-full border rounded-md"/>
                </div>
            </div>

          <div className='grid grid-cols-2 gap-4'>
            <div className="mt-4">
                <label  className="block text-sm font-medium text-gray-700">Discount Price</label>
                <input type="text" id="discountPrice" placeholder='Type discount price' name="discountPrice" className="mt-1 p-2 w-full border rounded-md"/>
            </div>
            <div className="mt-4">
                <label  className="block text-sm font-medium text-gray-700">Discount Percentage</label>
                <input type="text" id="discountPercentage" placeholder='Type percentage' name="discountPercentage" className="mt-1 p-2 w-full border rounded-md"/>
            </div>

		  </div>

            
            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Stock Item</label>
                <input type="number" id="stockItem" placeholder='Stock Item' name="newStockItem" className="mt-1 p-2 w-full border rounded-md"/>
            </div>

            
            <div className="mt-6">
                <button type="submit" className="w-full p-3 bg-indigo-500 text-white rounded-md hover:bg-blue-600">Update</button>
            </div>
        </form>
    </div>

</body>
              </div>
              {/* Modal Footer */}
              <div className="border-t px-4 py-2 flex justify-end">
                <button onClick={() => setOpen(false)} className="px-3 py-1 bg-indigo-500 text-white rounded-md w-full sm:w-auto">Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
        </div>
    );
};

export default Products;