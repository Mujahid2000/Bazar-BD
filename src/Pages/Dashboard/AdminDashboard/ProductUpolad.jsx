
import axios from "axios";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { toast, Toaster } from "sonner";

const ProductUpolad = () => {
    const [productImage, setProductImage] = useState(null);
    const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
    };

    const handleProductData = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);

        // Retrieve fields from form
        const productname = form.get('productName');
        const shopName = form.get('shopName');
        const price = form.get('price');
        const category = form.get('category');
        const stock = form.get('stock');
        const description = form.get('description');
        const shoppicture = form.get('shoppicture');
        const rating = form.get('rating');
        const color = form.get('color');
        console.log({
            productname, shopName, price, category, stock, description, productImage, shoppicture, rating, color
        });
        if (!productImage) {
            toast.error("Please select an image to upload.");
            return;
        }
        try {
            // Upload image to Cloudinary
            const imageFormData = new FormData();
            imageFormData.append('file', productImage);
            imageFormData.append('upload_preset', 'jocqw4zs'); // Replace with your Cloudinary upload preset

            // Replace with your Cloudinary API URL
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/dhfqokxun/image/upload`, // Replace `your_cloud_name` with your Cloudinary cloud name
                imageFormData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                   
                }
            );

            const imageUrl = res.data.secure_url; // Cloudinary URL
            console.log(imageUrl);

            const newData = {
                productname, shopName, price, category, stock, description, product_image: imageUrl, shoppicture, rating, color
            };

            console.log(newData);

            // Send product data to your server
            await axios.post('https://postgre-server.vercel.app/product', newData);
            toast.success("Item added to cart!");

            // reset form if the product upload complete
            e.target.reset();
        setProductImage(null);
        } catch (error) {
            console.error("Image upload error:", error);
            toast.error("Failed to add item. Please try again.");
        }
    };


    return (
        <div className="mt-20">
        <div className="bg-white shadow-md border rounded-md px-5">
            <div className="max-w-5xl px-4 py-8 mx-auto lg:py-8">
                <h2 className="mb-4 text-2xl text-center font-bold text-gray-900">Add Product</h2>
                <form onSubmit={handleProductData}>
                    <div className="">
                        <div className="flex  flex-col md:flex-row gap-4">
                        <div className="col-span-3 w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                            <input required type="text" name="productName" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type product name"  />
                        </div>
                        
                        <div className="col-span-2">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Shop Name</label>
                            <input required type="text" name="shopName" id="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Product brand"  />
                        </div>
                        </div>
                        {/* end1 */}

                        <div className=" flex flex-col md:flex-row gap-5 py-4">
                        <div className="">
                        <label className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                        <input
                            required
                            type="number"
                            name="price"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder="Type Price"
                            min="0"          // Optional: sets a minimum value
                            step="0.01"      // Allows decimals to two places
                        />
                    </div>

                        
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                            <select required name="category" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5">
                                <option defaultChecked>Select</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Home Appliance">Home Appliance</option>
                                <option value="Beauty Products">Beauty Products</option>
                                <option value="Food Item">Food Item</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Women's Fashion">Men's Fashion</option>
                                <option value="Women's Fashion">Women's Fashion</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900">Stock</label>
                            <input  type="text" name="stock" id="item-weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type Stock Item" required />
                        </div>
                        </div>
                        {/* end 2 */}
                       <div className="flex flex-col md:flex-row gap-5 py-4">
                       <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Shop Picture</label>
                            <input type="text" name="shoppicture" id="color" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Product color" required />
                        </div>
                        
                        {/* Rating Input */}
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Color</label>
                            <input type="text" name="color" id="rating" min="1" max="5" step="0.1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Insert Color" required />
                        </div>
                        <div className="w-full">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Rating</label>
                            <input type="number" name="rating" id="rating" min="1" max="5" step="0.1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Rate the product (1-5)" required />
                        </div>
                       </div>

                       {/* end3 */}
                        <div className="col-span-1 md:col-span-3">
                            <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                            <textarea required name="description" id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500" placeholder="Write a product description here...">
                                
                            </textarea>
                        </div>
    
                        {/* Shop Picture Input */}
                        <div className="col-span-3 w-full">
                            <label className="block mb-2 py-3 text-sm font-medium text-gray-900">Product Picture</label>
                            <label className="w-full flex justify-center mt-4 flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase cursor-pointer hover:bg-blue-500 hover:text-white">
                                <IoCloudUploadOutline className="w-7 h-7"/>
                                <span className="mt-2 text-base leading-normal">Select a file</span>
                                <input 
                                    required 
                                    type="file" 
                                    name="product_image" 
                                    className="hidden w-full" 
                                    onChange={handleImageChange} 
                                />
                            </label>
                        </div>
                        
                        {/* Color Input */}
                    </div>
    
                    <div className="flex items-center justify-center space-x-4">
                        <button type="submit" className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-md tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                            Upload Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            success: "text-green-400",
          },
        }}
      />
    </div>
    
    );
};

export default ProductUpolad;