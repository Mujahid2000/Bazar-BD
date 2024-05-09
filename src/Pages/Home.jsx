import Banner from "../Components/Home/Banner";
import Category from "../Components/Home/Category";
import Cupon from "../Components/Home/Cupon";
import Delivery from "../Components/Home/Delivery";
import NewArrivals from "../Components/Home/NewArrivals";
import ProductCard from "../Components/Home/ProductCard";
import Region from "../Components/Home/Region";
import Service from "../Components/Home/Service";
import Suppliers from "../Components/Home/Suppliers";
import TopProducts from "../Components/Home/TopProducts";


const Home = () => {
    return (
        <div className="w-full">
        <Banner></Banner>
        <Category></Category>
        <ProductCard/>
        <Suppliers/>
        <TopProducts/>
        <Service/>
        <Cupon></Cupon>
        <NewArrivals/>
        <Region/>
        <Delivery/>
        </div>
    );
};

export default Home;