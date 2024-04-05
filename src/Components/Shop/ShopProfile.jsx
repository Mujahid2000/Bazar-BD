import axios from "axios";
import { useEffect, useState } from "react";
import { Parallax } from "react-parallax";
import { Link, useParams } from "react-router-dom";
import Rating from "../../Pages/Result/Rating";
import { MdOutlineRateReview } from "react-icons/md";
import { Toaster, toast } from "sonner";

const ShopProfile = ({ shop }) => {
  const { shopName } = useParams();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState([]);
  const [name, setName] = useState([]);

  const [userData] = useState({
    totalOrders: 52,
    averageRating: 4.8,
    responseTime: "1-2 business days",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/addProducts")
      .then((res) => setProducts(res.data))
      .catch((error) => console.error(error));
  }, []);

  const filterData = products.filter((cat) => cat.shopName == shopName);

  const posterImg = filterData.filter((pro) => {
    if (
      pro.shopName === shopName &&
      !filter.find((item) => item === pro.shopPicture)
    ) {
      setFilter((prevFilter) => [...prevFilter, pro.shopPicture]);
      return true;
    } else {
      return false;
    }
  });

  useEffect(() => {
    const myShop = filterData.filter((name) => {
      if (
        name?.shopName === shopName &&
        !filter.find((item) => item === name?.shopName)
      ) {
        setName((prevFilter) => [...prevFilter, name?.shopName]);
        return true;
      } else {
        return false;
      }
    });
  }, [filter, shopName]);

  const handleAddCart = (data) => {
    axios
      .post(`http://localhost:5000/addCart`, { data })
      .then((response) => console.log(response));
    toast.success("Item added to cart!").catch(console.log("error"));
  };

  return (
    <div className="mt-[5rem] ">
      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={filter}
        bgImageAlt="the dog"
        strength={200}
      >
        <div style={{ height: "40rem" }} />
      </Parallax>
      <div>
        <h1 className="text-5xl text-center font-bold mt-5">{name[0]}</h1>
        <div className="flex flex-wrap mt-5 mx-5 removable">
          <div className="w-full max-w-full px-3 mb-6 sm:w-1/4 sm:flex-none xl:mb-0 xl:w-1/4 drop-zone">
            <div
              className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable"
              draggable="true"
            >
              <div className="flex flex-col items-start justify-between flex-auto py-8 px-9">
                <div className="m-0">
                  <img
                    className="w-[35px]"
                    src="https://i.ibb.co/2sVWwNK/8439799.png"
                    alt="youtube"
                  />
                </div>
                <div className="flex flex-col my-7">
                  <span className="text-secondary-inverse text-4xl tracking-[-0.115rem] font-bold">
                    24 Hours
                  </span>
                  <div className="m-0">
                    <span className="font-medium text-secondary-dark text-lg/normal">
                      Response
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-1 mr-auto font-semibold text-center align-baseline rounded-lg text-base/none text-success bg-success-light border border-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    ></path>
                  </svg>
                  90%
                </span>
              </div>
            </div>
          </div>
          <div className="w-full max-w-full px-3 mb-6 sm:w-1/4 sm:flex-none xl:mb-0 xl:w-1/4 drop-zone">
            <div
              className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable"
              draggable="true"
            >
              <div className="flex flex-col items-start justify-between flex-auto py-8 px-9">
                <div className="m-0">
                  <img
                    className="w-[35px]"
                    src="https://i.ibb.co/KhQSsKk/star.png"
                    alt="youtube"
                  />
                </div>
                <div className="flex flex-col my-7">
                  <span className="text-secondary-inverse text-4xl tracking-[-0.115rem] font-bold">
                    4.8
                  </span>
                  <div className="m-0">
                    <span className="font-medium text-secondary-dark text-lg/normal">
                      Rating
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-1 mr-auto font-semibold text-center align-baseline rounded-lg text-base/none text-success bg-success-light border border-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    ></path>
                  </svg>
                  Good Review
                </span>
              </div>
            </div>
          </div>
          <div className="w-full max-w-full px-3 mb-6 sm:w-1/4 sm:flex-none xl:mb-0 xl:w-1/4 drop-zone">
            <div
              className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable"
              draggable="true"
            >
              <div className="flex flex-col items-start justify-between flex-auto py-8 px-9">
                <div className="m-0">
                  <img
                    className="w-[35px]"
                    src="https://i.ibb.co/x7Y6D8r/1267879-200.png"
                    alt="youtube"
                  />
                </div>
                <div className="flex flex-col my-7">
                  <span className="text-secondary-inverse text-4xl tracking-[-0.115rem] font-bold">
                    10+
                  </span>
                  <div className="m-0">
                    <span className="font-medium text-secondary-dark text-lg/normal">
                      Partner Companies
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-1 mr-auto font-semibold text-center align-baseline rounded-lg text-base/none text-danger bg-danger-light border border-danger">
                  <img
                    src="https://i.ibb.co/pWdQjZt/growth-increase-profit-single-isolated-icon-vector-36074248.jpg"
                    alt=""
                    className="w-4 mr-1"
                  />
                  1.12%
                </span>
              </div>
            </div>
          </div>
          <div className="w-full max-w-full px-3 mb-6 sm:w-1/4 sm:flex-none xl:mb-0 xl:w-1/4 drop-zone">
            <div
              className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 draggable"
              draggable="true"
            >
              <div className="flex flex-col items-start justify-between flex-auto py-8 px-9">
                <div className="m-0">
                  <img
                    className="w-[35px]"
                    src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/logos/facebook.svg"
                    alt="youtube"
                  />
                </div>
                <div className="flex flex-col my-7">
                  <span className="text-secondary-inverse text-4xl tracking-[-0.115rem] font-bold">
                    Facebook
                  </span>
                  <div className="m-0">
                    <span className="font-medium text-secondary-dark text-lg/normal">
                      Follow Us
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-1 mr-auto font-semibold text-center align-baseline rounded-lg text-base/none text-success bg-success-light border border-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    ></path>
                  </svg>
                  9.4%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-8 place-items-center">
        {filterData.map((filter) => (
          <div
            key={filter._id}
            className="w-72 cursor-pointer shadow-lg rounded-lg h-96 border mt-8 ml-4"
          >
            <Link to={`/productDetails/${filter._id}`}>
              <img
                className="h-60 mx-auto border-b transform hover:scale-110 transition-transform duration-300"
                src={filter?.product_image}
                alt=""
              />
              <h1 className="text-center hover:text-orange-600 text-xl font-semibold">
                {filter.productName.length > 20
                  ? filter.productName.slice(0, 20) + "..."
                  : filter?.productName}
              </h1>
              <p className="text-center text-lg font-bold ">
                $<span className="text-orange-600">{filter.price} </span>
              </p>
              <p className="text-center w-60 mx-auto">
                {filter.description.slice(0, 30)}
              </p>
              <Rating stars={filter.rating} />
            </Link>
            <button
              onClick={() => {
                handleAddCart(filter); // Call handleAddCart after successful toast display
              }}
              className="border-none hover:bg-slate-500 outline-none px-3 py-2 rounded-b-lg text-white bg-orange-600 text-center cursor-pointer w-full text-lg"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            success: "text-green-400",
          },
        }}
      />
    </div>
  );
};

export default ShopProfile;
