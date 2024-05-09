import { key } from 'localforage';
import country from '../../../public/Country.json';


const Region = () => {
    return (
        <div className='max-w-[1440px] my-14 mx-auto'>
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-5  mt-7'>
            {/* card 1 */}
            {
                country.map((co, index) =>(

                <div key={index} className="flex gap-3 items-center">
                <div>
                <img src={co.image} alt="" className='w-16'/>
                </div>
                <div>
                    <h4 className="text-gray-700 font-inter text-base font-normal leading-6">{co.country}</h4>
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