
import country from '../../../public/Country.json';


const Region = () => {
    return (
        <div className='max-w-[1540px] 2xl:w-fit ml-auto justify-center items-center px-5 my-14 mx-auto'>
            <h3 className='text-black font-inter font-semibold text-xl md:text-2xl lg:text-3xl xl:text-3xl leading-10 md:leading-12 lg:leading-14 xl:leading-16 tracking-tighter md:tracking-normal lg:tracking-normal xl:tracking-normal'>Suppliers by region</h3>
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-28 mt-7'>
            {
                country.map((co, index) =>(

                <div key={index} className="flex flex-col md:flex-col lg:flex-col xl:flex-row 2xl:flex-row  gap-3 items-center justify-between">
                <div>
                <img src={co.image} alt="" className='min-w-28 h-full'/>
                </div>
                <div>
                    <h4 className="text-gray-700 font-inter text-xs font-normal leading-6">{co.country}</h4>
                    <p className="text-gray-500 font-inter text-sm font-normal leading-4">{co.address}</p>
                </div>  
            </div>
                ))
            }
        </div>
        </div>
    );
};

export default Region;