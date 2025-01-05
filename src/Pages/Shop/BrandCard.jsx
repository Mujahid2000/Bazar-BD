import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const BrandCard = ({ name, imageUrl }) => (
    <Link to={`/shopDetail/${name}`} className="p-4">
      <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-center h-48">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="max-w-full transition-all max-h-full object-contain" />
        ) : (
          <div className="w-20 h-20 bg-blue-200 flex items-center justify-center">
            <Search className="w-8 h-8 text-blue-400" />
          </div>
        )}
      </div>
      <h3 className="mt-3 font-medium text-lg text-center text-gray-800">{name}</h3>
    </Link>
  );

  export default BrandCard;