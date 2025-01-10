import { useContext } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'; 
import { AuthContext } from '../../Configs/AuthContext';

const categories = [
    { "id": 1, "name": "Home Appliance", "color": "#3498db" },
    { "id": 2, "name": "Beauty Products", "color": "#d946ef" },
    { "id": 8, "name": "Women's Fashion", "color": "#e74c3c" },
    { "id": 7, "name": "Men's Fashion", "color": "#c026d3" },
    { "id": 3, "name": "Food Item", "color": "#e67e22" },
    { "id": 5, "name": "Electronics", "color": "#34495e" },
    { "id": 4, "name": "Furniture", "color": "#9b59b6" },
    { "id": 6, "name": "Kids Item", "color": "#1abc9c" },
    { "id": 9, "name": "Mobile", "color": "#4f46e5" }
];

const Banner = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex flex-col pt-32 px-7 md:flex-row justify-center md:justify-between lg:justify-center items-center">
            {/* Preload the banner image */}
            <Helmet>
                <link
                    rel="preload"
                    href="https://res.cloudinary.com/diez3alve/image/upload/v1736522849/detailed_gezp9o.webp"
                    as="image"
                />
            </Helmet>

            {/* Category Section */}
            <div
                className="w-[23.8rem] rounded-l-md bg-white py-4 lg:w-auto scroll-m-0 overflow-x-auto px-1 custom-scrollbar"
            >
                <ul className="md:space-y-2 flex flex-row md:flex-col">
                    {categories.map((cat) => (
                        <Link key={cat.id} to={`/categoryPage/${cat.name}`}>
                            <li>
                                <button className="w-[12.625rem] py-2 hover:bg-blue-100 mx-0 md:mx-1 text-left px-2 rounded-md font-semibold">
                                    {cat.name}
                                </button>
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>

            {/* Banner Picture */}
            <div className="w-full bg-white py-[18px] lg:w-2/4">
                <div className="relative w-full h-full md:h-[420px] bg-teal-200 flex items-center justify-center">
                    {/* Background Image */}
                    <img
                        src="https://res.cloudinary.com/diez3alve/image/upload/v1736522849/detailed_gezp9o.webp"
                        srcSet="
                            https://res.cloudinary.com/diez3alve/image/upload/c_scale,w_768/v1736522849/detailed_gezp9o.webp 768w,
                            https://res.cloudinary.com/diez3alve/image/upload/c_scale,w_1280/v1736522849/detailed_gezp9o.webp 1280w
                        "
                        sizes="(max-width: 768px) 100vw, 50vw"
                        alt="Banner"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Overlay Content */}
                    <div className="relative z-10 text-center">
                        <h1 className="text-xl md:text-4xl font-bold my-4">Latest trending</h1>
                        <h2 className="text-sm md:text-3xl font-bold mb-6">Electronic items</h2>
                        <button className="bg-white text-black font-semibold py-2 mb-5 px-4 rounded-md shadow-md">
                            Learn more
                        </button>
                    </div>
                    {/* Overlay Background */}
                    <div className="absolute inset-0 bg-teal-200 opacity-75"></div>
                </div>
            </div>

            {/* User Info */}
            <div className={`${user ? 'space-y-10' : 'space-y-2'} hidden lg:flex bg-white py-5 rounded-r-md flex-col items-center px-4`}>
                {user ?
                    <div className='bg-blue-100 w-[14rem] h-[7rem] p-5 rounded-lg hidden lg:block'>
                        <div className='flex gap-6'>
                            <div className=''>
                                <p className='font-semibold pb-5'>Hi User</p>
                                <p className='font-semibold'>Thanks for Login</p>
                            </div>
                        </div>
                    </div> :
                    <div className='bg-blue-100 hidden lg:block p-5 rounded-lg'>
                        <div className='flex gap-6'>
                            <button className='p-3 rounded-full bg-blue-200'><FaUser className='text-white text-2xl' /></button>
                            <div className=''>
                                <p className='font-semibold'>Hi User</p>
                                <p className='font-semibold'>Let's get started</p>
                            </div>
                        </div>
                        <div className=''>
                            <button className="w-full bg-blue-500 text-white py-1 px-4 rounded-md mt-2">Join now</button>
                            <Link to={'/signIn'}><button className="bg-white w-full text-blue-500 py-1 px-4 rounded-md mt-2 border border-blue-500">Log in</button></Link>
                        </div>
                    </div>
                }
                <div className="bg-[#F38332] hidden lg:block w-[14rem] text-white h-[7rem] p-4 rounded-md text-lg shadow-md ">
                    <p className='w-[9rem]'>Get US $10 off  with a new supplier</p>
                </div>
                <div className="bg-[#55BDC3] hidden lg:block text-white w-[14rem] text-lg h-[7rem] p-4 rounded-md shadow-md">
                    <p className=' w-[10rem]'>Send quotes with supplier preferences</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;
