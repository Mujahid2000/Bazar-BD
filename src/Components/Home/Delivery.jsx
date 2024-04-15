import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineHeadsetMic } from "react-icons/md";
import { LuShieldCheck } from "react-icons/lu";


const Delivery = () => {
    return (
        <div>
            <div className="  flex justify-center items-center">
    <section className="grid gap-6 md:grid-cols-3 p-4 md:p-8 max-w-6xl mx-auto w-full ">
        <div className="p-6 bg-white shadow rounded-2xl ">
        <TbTruckDelivery  className="text-white border p-3 rounded-full bg-black w-16 h-16 flex justify-center mx-auto"/>
        <h2 className="text-center mt-2">FREE AND FAST DELIVERY</h2>
        <p className="text-center">Free delivery for all orders over $140</p>
        </div>

        <div className="p-6 bg-white shadow rounded-2xl ">
        <MdOutlineHeadsetMic  className="text-white border p-3 rounded-full bg-black w-16 h-16 flex justify-center mx-auto"/>
        <h2 className="text-center mt-2">24/7 CUSTOMER SERVICE</h2>
        <p className="text-center">Friendly 24/7 customer support</p>
        </div>

        <div className="p-6 bg-white shadow rounded-2xl ">
        <LuShieldCheck  className="text-white border p-3 rounded-full bg-black w-16 h-16 flex justify-center mx-auto"/>
        <h2 className="text-center mt-2">MONEY BACK GUARANTEE</h2>
        <p className="text-center">We reurn money within 30 days</p>
        </div>
    </section>

</div>
        </div>
    );
};

export default Delivery;