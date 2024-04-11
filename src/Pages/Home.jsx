import Banner from "../Components/Home/Banner";
import Category from "../Components/Home/Category";
import Cupon from "../Components/Home/Cupon";
import ProductCard from "../Components/Home/ProductCard";


const Home = () => {
    return (
        <div className="w-full">
        <Banner></Banner>
        <Category></Category>
        <ProductCard/>
        <Cupon></Cupon>
        </div>
    );
};

export default Home;