
import axios from "axios";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";

const ProductUpolad = () => {
    const [product_image, setProduct_image] = useState(null)
    
    
    const handleProductData = (e) =>{
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const productName = form.get('productName')
        const shopName = form.get('shopName')
        const price = form.get('price')
        const category = form.get('category')
        const Stock = form.get('Stock')
        const description = form.get('description')
        const product_image = form.get('product_image')
        
        console.log({productName, shopName, price, category, Stock, description, product_image})

        const data = new FormData();
        data.append('image', product_image)
        axios.post('https://api.imgbb.com/1/upload?key=1c99abe3d21865b74ed75d740f58ca9d', data)
        .then(res => {
            const imageUrl = res.data.data.display_url;
            const newData = { productName, shopName, price, category, Stock, description, product_image: imageUrl };

            axios.post('https://bazar-bd-server.vercel.app/uploadProduct', newData)
                .then(res => console.log(res.data))
                .catch((error) => console.log(error));
        })
        .catch(error => console.error(error));
}



    return (
        <div className=" mt-9">
            <div className="bg-white rounded-md px-5 dark:bg-gray-900">
  <div className="max-w-5xl px-4 py-8 mx-auto lg:py-16">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Update product</h2>
      <form onSubmit={handleProductData}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
              <div className="sm:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                  <input type="text" name="productName" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  placeholder="Type product name" required=""/>
              </div>
              <div className="w-full">
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Shop Name</label>
                  <input type="text" name="shopName" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  placeholder="Product brand" required=""/>
              </div>
              <div className="w-full">
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                  <input type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  placeholder="Type Price" required=""/>
              </div>
              <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                  <select name="category" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option selected="">Electronics</option>
                      <option value="Home Appliance">Home Appliance</option>
                      <option value="Beauty Products">Beauty Products</option>
                      <option value="Food Item">Food Item</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Women's Fashion">Women's Fashion</option>
                  </select>
              </div>
              <div>
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                  <input type="number" name="Stock" id="item-weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"  placeholder="Type Stock Item" required=""/>
              </div> 
              <div className="sm:col-span-3">
                  <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                  <textarea name="description" id="description" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Write a product description here..."></textarea>
                    <div className="flex justify-center">

                  <label className="w-64  justify-center col-span-3 mt-4 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase  cursor-pointer hover:bg-blue-500 hover:text-white">
        <IoCloudUploadOutline className="w-7 h-7"/>
        <span className="mt-2 text-base leading-normal">Select a file</span>
        <input type='file' name="product_image" className="hidden" />
    </label>
                    </div>
              </div>
              
          </div>
          <div className="flex items-center justify-center space-x-4">
          <button type="submit" className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                        Upload Product
                    </button>
              
          </div>
      </form>
  </div>
</div>
        </div>
    );
};

export default ProductUpolad;