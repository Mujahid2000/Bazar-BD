import Banner from "../Components/Home/Banner";
import Category from "../Components/Home/Category";
import Cupon from "../Components/Home/Cupon";
import Delivery from "../Components/Home/Delivery";
import NewArrivals from "../Components/Home/NewArrivals";
import ProductCard from "../Components/Home/ProductCard";


const Home = () => {
    return (
        <div className="w-full">
        <Banner></Banner>
        <Category></Category>
        <ProductCard/>
        <Cupon></Cupon>
        <NewArrivals/>
        <Delivery/>
        </div>
    );
};

export default Home;