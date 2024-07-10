import Banner from "../Components/Home/Banner";
import DiscountCard from "../Components/Home/CardData";
import Category from "../Components/Home/Category";
import Cupon from "../Components/Home/Cupon";
import Delivery from "../Components/Home/Delivery";
import ElectronicSection from "../Components/Home/ElectronicSection";
import HomeOutdoorSection from "../Components/Home/HomeOutdoorSection";
import NewArrivals from "../Components/Home/NewArrivals";
import ProductCard from "../Components/Home/ProductCard";
import ProductsCard from "../Components/Home/ProductsCard";
import Region from "../Components/Home/Region";
import Service from "../Components/Home/Service";
import Subscribe from "../Components/Home/Subscribe";
import Suppliers from "../Components/Home/Suppliers";
import TopProducts from "../Components/Home/TopProducts";


const Home = () => {
    return (
        <div className="w-full">
        <Banner></Banner>
        {/* <Category></Category> */}
        <DiscountCard/>
        <HomeOutdoorSection/>
        <ElectronicSection/>
        <Suppliers/>
        <ProductsCard/>
        <Subscribe/>
        <Service/>
        {/* <ProductCard/>
        <TopProducts/>
        <Cupon></Cupon>
        <NewArrivals/>
        <Region/>
        <Delivery/>
        <Subscribe/> */}
        </div>
    );
};

export default Home;