import Banner from "../Components/Home/Banner";
import Category from "../Components/Home/Category";
import ProductCard from "../Components/Home/ProductCard";


const Home = () => {
    return (
        <div className="w-full">
        <Banner></Banner>
        <Category></Category>
        <ProductCard/>
        </div>
    );
};

export default Home;