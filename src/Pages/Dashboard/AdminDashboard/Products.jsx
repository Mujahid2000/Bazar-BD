import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Products = () => {
    const [myProducts, setMyProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [selectAllChecked, setSelectAllChecked] = useState(false);
	// console.log(selectedProducts);
    useEffect(() => {
        axios.get('https://bazar-bd-server.vercel.appaddProducts')
            .then(res => setMyProducts(res.data))
            .catch(error => console.error(error));
    }, [myProducts]);

    const handlePassInfoShow = (data) => {
        setOpen(true);
        setSelectedProducts([data]);
    };

    const handleProductUpdate = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const productName = form.get('productName');
        const price = form.get('Price');
        const discountPriceString = form.get('discountPrice');
        const discountPrice = parseFloat(discountPriceString);
        const discountPercentageString = form.get('discountPercentage');
        const discountPercentage = parseFloat(discountPercentageString);
        const stock = form.get('newStockItem');
        const productData = selectedProducts[0];
        console.log({ productName, price, discountPrice, stock, productData, discountPercentage });
        await axios.post('https://bazar-bd-server.vercel.appproductDiscount', { productName, price, discountPrice, stock, productData, discountPercentage });
        setOpen(false);
        Swal.fire({
            title: "Good job!",
            text: "You Successfully Added Discount Program",
            icon: "success"
        });
    };

    const handleSelectChange = async (event, data) => {
        const selectedValue = event.target.value;
        const response = await axios.put(`https://bazar-bd-server.vercel.appaddProductsUpdate/${data._id}`, { stock: selectedValue });
        console.log(response.data);
    };

    const handleProductSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleCheckedAll = (isChecked) => {
        setSelectAllChecked(isChecked);
        if (isChecked) {
            setSelectedProducts([...myProducts]);
        } else {
            setSelectedProducts([]);
        }
    };

    const handleChecked = (isChecked, data) => {
        if (isChecked) {
            setSelectedProducts(prevSelected => [...prevSelected, data]);
        } else {
            setSelectedProducts(prevSelected => prevSelected.filter(item => item._id !== data._id));
        }
    };

    const handleDeleteSelectedProducts = async () => {
        try {
            // Get the IDs of selected products
            const selectedProductIds = selectedProducts.map(product => product._id);

            // Send a DELETE request to the backend API
            const response = await axios.delete('https://bazar-bd-server.vercel.appproducts', { data: { ids: selectedProductIds } });

            if (response.data.success) {
                // Remove deleted products from the selectedProducts state
                setSelectedProducts([]);
                // Show success message
                Swal.fire({
                    title: "Success!",
                    text: "Selected products have been deleted.",
                    icon: "success"
                });
            } else {
                // Show error message
                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete selected products.",
                    icon: "error"
                });
            }
        } catch (error) {
            console.error("Error deleting products:", error);
            // Show error message
            Swal.fire({
                title: "Error!",
                text: "Failed to delete selected products.",
                icon: "error"
            });
        }
    };


    const filteredProducts = myProducts.filter(product => {
        return product?.productName.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div>
            <div className="max-w-7xl mt-20">
                <div className="relative bg-gray-950 shadow-md sm:rounded-lg">
                    <div className="p-4 flex  gap-5 items-center">
                        <label htmlFor="checkbox-all-search" className="sr-only text-white">Select All</label>
                        <div className="relative mt-1">
                            <input id="checkbox-all-search" type="checkbox" onChange={(e) => handleCheckedAll(e.target.checked)} checked={selectAllChecked} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        </div>

					<input onChange={ handleProductSearch} type="text" id="table-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Products"/>
					<h2 className='text-white text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl'>Total Products: {filteredProducts.length}</h2>
                        <div className='ml-[500px]'>
                            <button onClick={handleDeleteSelectedProducts} className={`${selectedProducts.length === 0 ? 'hidden' : 'middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'}`} data-ripple-light="true">Delete</button>
                        </div>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" onChange={(e) => handleCheckedAll(e.target.checked)} checked={selectAllChecked} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
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
                            {filteredProducts.map(data => (
                                <tr key={data._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input onChange={(e) => handleChecked(e.target.checked, data)} id={`checkbox-table-search-${data._id}`} type="checkbox" checked={selectAllChecked || selectedProducts.some(item => item._id === data._id)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label htmlFor={`checkbox-table-search-${data._id}`} className="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                        {data?.productName}
                                    </th>
                                    <td className="px-6 py-4 text-white">
                                        Sliver
                                    </td>
                                    <td className="px-6 py-4 text-white">
                                        {data?.category}
                                    </td>
                                    <td className="px-6 py-4 text-white">
                                        ${data?.price}
                                    </td>
                                    <td className="px-6 py-4">
                                        <select onChange={(event) => handleSelectChange(event, data)} className='bg-white rounded-md'>
                                            <option value="In Stock">In Stock</option>
                                            <option value="Stock Out">Stock Out</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p onClick={() => { handlePassInfoShow(data) }} className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline">Edit</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-5">Here is All Products List. In here you can Update or Delete any Products using this table. This Table is for Admin for control the Product Available.</p>
            </div>
            <div className="flex justify-center items-center h-screen">
                <div>
                    {open && (
                        <div className="fixed inset-0 px-2 z-10 overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 bg-gray-500 bg-opacity-75"></div>
                            <div className="bg-white rounded-md shadow-xl overflow-hidden max-w-md w-full sm:w-96 md:w-1/2 lg:w-2/3 xl:w-1/3 z-50">
                                <div className="bg-indigo-500 text-white px-4 py-2 flex justify-between">
                                    <h2 className="text-lg font-semibold text-center">Update Product</h2>
                                </div>
                                <div className="p-4">
                                    <form onSubmit={handleProductUpdate} method="POST">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                                                <input type="text" id="productName" name="productName" placeholder={selectedProducts[0]?.productName} value={selectedProducts[0]?.productName} className="mt-1 p-2 w-full border rounded-md" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700">Price</label>
                                                <input type="number" placeholder={selectedProducts[0]?.price} id="Price" name="Price" value={selectedProducts[0]?.price} className="mt-1 p-2 w-full border rounded-md" />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 gap-4'>
                                            <div className="mt-4">
                                                <label className="block text-sm font-medium text-gray-700">Discount Price</label>
                                                <input type="text" id="discountPrice" placeholder='Type discount price' name="discountPrice" className="mt-1 p-2 w-full border rounded-md" />
                                            </div>
                                            <div className="mt-4">
                                                <label className="block text-sm font-medium text-gray-700">Discount Percentage</label>
                                                <input type="text" id="discountPercentage" placeholder='Type percentage' name="discountPercentage" className="mt-1 p-2 w-full border rounded-md" />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-sm font-medium text-gray-700">Stock Item</label>
                                            <input type="number" id="stockItem" placeholder='Stock Item' name="newStockItem" className="mt-1 p-2 w-full border rounded-md" />
                                        </div>
                                        <div className="mt-6">
                                            <button type="submit" className="w-full p-3 bg-indigo-500 text-white rounded-md hover:bg-blue-600">Update</button>
                                        </div>
                                    </form>
                                </div>
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
