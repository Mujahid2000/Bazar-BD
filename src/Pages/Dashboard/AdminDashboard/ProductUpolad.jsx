
import {  Upload } from "antd";
import axios from "axios";
import { useState } from "react";
import { toast, Toaster } from "sonner";

const ProductUpolad = () => {
    const [productImage, setProductImage] = useState(null);
    const [fileList, setFileList] = useState([]);


    const handleProductData = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const productData = {
            productname: form.get("productName"),
            shopName: form.get("shopName"),
            price: form.get("price"),
            category: form.get("category"),
            stock: form.get("stock"),
            description: form.get("description"),
            shoppicture: form.get("shoppicture"),
            rating: form.get("rating"),
            color: form.get("color"),
          };

        if (fileList.length === 0 ) {
            toast.error("Please select an image to upload.");
            return;
        }
        try {
            const imageUrls = await uploadImage(fileList);
            const newProductData = {
                ...productData,
                product_image: imageUrls
            };

            await submitProductData(newProductData)
            // Send product data to your server
            // reset form if the product upload complete
            e.target.reset();
            setFileList([])
            toast.success("Item added to cart!");
            // setProductImage(null);
        } catch (error) {
            console.error("Image upload error:", error);
            toast.error("Failed to add item. Please try again.");
        }
    };


    const uploadImage = async(fileList) =>{
        const imageUrls = [];
        for (const file of fileList) {
            // Upload image to Cloudinary
            const formData = new FormData();
            formData.append('file', file.originFileObj);
            formData.append('upload_preset', 'jocqw4zs'); // my Cloudinary upload preset
            // Replace with your Cloudinary API URL
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dhfqokxun/image/upload`, // Replace `your_cloud_name` with your Cloudinary cloud name
                formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                   
                }
            );
            imageUrls.push(response.data.secure_url); // Cloudinary URL
            console.log(imageUrls);
        }
        return imageUrls
    }


    const submitProductData = async(data) =>{
        await axios.post("https://postgre-server.vercel.app/product", data);
    }

      const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
      };
      const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
          src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
          });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
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
                            <label className="block mb-2 py-3 text-sm font-medium text-gray-900">
                                Product Picture
                            </label>
                            <Upload
                                multiple
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                            >
                                {fileList.length < 4 && "+ Upload"}
                            </Upload>
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