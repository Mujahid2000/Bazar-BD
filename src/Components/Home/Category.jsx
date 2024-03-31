import { Link } from "react-router-dom";


const Category = () => {
    const categories = [
        { "id": 1, "name": "Home Appliance", "color": "#3498db" },
        { "id": 2, "name": "Beauty Products", "color": "#d946ef" },
        { "id": 3, "name": "Food Item", "color": "#e67e22" },
        { "id": 4, "name": "Furniture", "color": "#9b59b6" },
        { "id": 5, "name": "Earphones", "color": "#34495e" },
        { "id": 6, "name": "Kids Item", "color": "#1abc9c" },
        { "id": 7, "name": "Men's Fashion", "color": "#c026d3" },
        { "id": 8, "name": "Women's Fashion", "color": "#e74c3c" },
        { "id": 9, "name": "Mobile", "color": "#4f46e5" }
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
            {categories.map((cat) => (
              <Link key={cat.id} to={`/categoryPage/${cat.name}`}>
              <p className={`py-3 px-4 bg-[${cat?.color}] gap-7 text-white rounded-lg cursor-pointer text-center font-semibold text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-lg mx-2 mt-3 transition duration-300 hover:bg-slate-800 hover:shadow-lg`} style={{ backgroundColor: cat.color }}>
                  {cat.name}
              </p>
          </Link>          
            ))}
        </div>
    );
};

export default Category;
