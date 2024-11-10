import Banner from "../Components/Home/Banner";
import DiscountCard from "../Components/Home/CardData";
import ElectronicSection from "../Components/Home/ElectronicSection";
import HomeOutdoorSection from "../Components/Home/HomeOutdoorSection";
import ProductsCard from "../Components/Home/ProductsCard";
import Service from "../Components/Home/Service";
import Subscribe from "../Components/Home/Subscribe";
import Suppliers from "../Components/Home/Suppliers";


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
        <TopProducts/> */}
      
        </div>
    );
};

export default Home;