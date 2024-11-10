import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Products = () => {
    const [myProducts, setMyProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [discountId, setPId] = useState();

    useEffect(() => {
        // Fetch products only once
        axios.get('https://postgre-server.vercel.app/product')
            .then(res => setMyProducts(res.data.data))
            .catch(error => console.error(error));
    }, []); // Empty dependency array to fetch once

    const handlePassInfoShow = (data) => {
        setOpen(true);
        if(!open){
            setPId(null)
        }
        setSelectedProducts([data]);
    };

    const handleProductUpdate = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        // const productName = form.get('productName');
        // const price = form.get('Price');
        const discountPrice = parseFloat(form.get('discountPrice'));
        const percentage = parseFloat(form.get('discountPercentage'));
        const stock = form.get('newStockItem');
        // const productData = selectedProducts[0];

        await axios.post('https://postgre-server.vercel.app/discount', { discountId, discountPrice, stock, percentage });
        setOpen(false);
        Swal.fire({
            title: "Good job!",
            text: "You Successfully Added Discount Program",
            icon: "success"
        });
    };

    const handleSelectChange = async (event, data) => {
        const selectedValue = event.target.value;
    
        try {
            const response = await axios.put(`https://postgre-server.vercel.app/product/${data.id}`, { stock: selectedValue });
            console.log(response.data);
        } catch (error) {
            console.error("Error in PUT request:", error);
        }
    };
    

    const handleProductSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleCheckedAll = (isChecked) => {
        setSelectAllChecked(isChecked);
        if (isChecked) {
            setSelectedProducts([...myProducts]); // Select all products
        } else {
            setSelectedProducts([]); // Deselect all products
        }
    };

    const handleChecked = (isChecked, data) => {
        if (isChecked) {
            setSelectedProducts(prevSelected => [...prevSelected, data]); // Add selected product
        } else {
            setSelectedProducts(prevSelected => prevSelected.filter(item => item.id !== data.id)); // Remove unselected product
        }
        setSelectAllChecked(false); // Reset 'select all' if individual rows are being toggled
    };

    const handleDeleteSelectedProducts = async () => {
        try {
            const selectedProductIds = selectedProducts.map(product => product._id);
            const response = await axios.delete('https://postgre-server.vercel.app/products', { data: { ids: selectedProductIds } });

            if (response.data.success) {
                setSelectedProducts([]);
                Swal.fire({
                    title: "Success!",
                    text: "Selected products have been deleted.",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Failed to delete selected products.",
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: "Failed to delete selected products.",
                icon: "error"
            });
        }
    };

    const filteredProducts = myProducts.filter(product =>
        product?.productname.toLowerCase().includes(search?.toLowerCase())
    );

    return (
        <div>
            <div className="max-w-7xl mt-20">
                <div className="relative  shadow-md sm:rounded-lg">
                    <div className="p-4 flex  gap-5 items-center">
                        <input
                            type="checkbox"
                            onChange={(e) => handleCheckedAll(e.target.checked)}
                            checked={selectAllChecked}
                            className="w-4 h-4 text-blue-600 bg-gray-200 border-gray-50 rounded"
                        />
                        <input
                            onChange={handleProductSearch}
                            type="text"
                            className=" border border-gray-200 text-gray-900 rounded-lg p-2.5"
                            placeholder="Search Products"
                        />
                        <h2 className='text-white'>Total Products: {filteredProducts.length}</h2>
                        {selectedProducts.length > 0 && (
                            <button onClick={handleDeleteSelectedProducts} className="bg-red-500 py-2 px-4 text-white rounded">
                                Delete
                            </button>
                        )}
                    </div>
                    <table className="w-full text-sm text-left text-black ">
                        <thead className="bg-gray-200  text-gray-400">
                            <tr>
                                <th className="p-4">
                                    <input
                                        type="checkbox"
                                        onChange={(e) => handleCheckedAll(e.target.checked)}
                                        checked={selectAllChecked}
                                        className="w-4 h-4 text-blue-600  border-gray-50 rounded"
                                    />
                                </th>
                                <th className="px-6 text-gray-900 py-3">Product name</th>
                                <th className="px-6 text-gray-900 py-3">Color</th>
                                <th className="px-6 text-gray-900 py-3">Category</th>
                                <th className="px-6 text-gray-900 py-3">Price</th>
                                <th className="px-6 text-gray-900 py-3">Stock</th>
                                <th className="px-6 text-gray-900 py-3">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map(data => (
                                <tr key={data._id} className=" border-b shadow-sm border-gray-50 ">
                                    <td className="p-4">
                                        <input
                                            onChange={(e) => handleChecked(e.target.checked, data)}
                                            type="checkbox"
                                            checked={selectedProducts.some(item => item.id === data.id)}
                                            className="w-4 h-4 text-blue-600 border-b bg-gray-50 border-gray-50 rounded"
                                        />
                                    </td>
                                    <td className="px-6 text-gray-900 font-semibold py-4">{data.productname}</td>
                                    <td className="px-6 text-gray-900 font-semibold py-4">Silver</td>
                                    <td className="px-6 text-gray-900 font-semibold py-4">{data.category}</td>
                                    <td className="px-6 text-gray-900 font-semibold py-4">${data.price}</td>
                                    <td className="px-6 text-gray-900 font-semibold py-4">
                                    <select onChange={(event) => handleSelectChange(event, data)} className="bg-white rounded-md">
                                    <option value="In Stock" selected={data.stock === "In Stock"}>In Stock</option>
                                    <option value="Stock Out" selected={data.stock === "Stock Out"}>Stock Out</option>
                                </select>

                                    </td>
                                    <td className="px-6 text-gray-900 font-semibold py-4">
                                        <p onClick={() => {
  handlePassInfoShow(data);
  setPId(data.idp);
}}
 className="text-blue-600 cursor-pointer">Edit</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* modal */}
            <div className="flex justify-center items-center h-screen bg-gray-100">
  <div>
    {open && (
      <div className="fixed inset-0 z-10 flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Overlay */}
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        {/* Modal Content */}
        <div className="relative z-20 w-full max-w-lg bg-white rounded-lg shadow-lg">
          {/* Modal Header */}
          <div className="flex items-center justify-between bg-indigo-600 p-2 text-white rounded-t-lg">
            <h2 className="text-lg font-semibold px-4">Update Product</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-white bg-indigo-500 hover:bg-indigo-400 px-3 py-1 rounded-md"
            >
              Close
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            <form onSubmit={handleProductUpdate} method="POST">
              {/* Product Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    placeholder={selectedProducts[0]?.productname || "Enter product name"}
                    value={selectedProducts[0]?.productname}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder={selectedProducts[0]?.price || "Enter price"}
                    value={selectedProducts[0]?.price}
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Discount Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Discount Price</label>
                  <input
                    type="number"
                    id="discountPrice"
                    min="0"          // Optional: sets a minimum value
                    step="0.01"      // Allows decimals to two places
                    name="discountPrice"
                    placeholder="Type discount price"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Discount Percentage</label>
                  <input
                    type="number"
                    id="discountPercentage"
                    name="discountPercentage"
                    placeholder="Type percentage"
                    className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Stock Information */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Stock Item</label>
                <input
                  type="number"
                  id="stockItem"
                  name="newStockItem"
                  placeholder="Stock item quantity"
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full p-3 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition"
                >
                  Update
                </button>
              </div>
            </form>
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
