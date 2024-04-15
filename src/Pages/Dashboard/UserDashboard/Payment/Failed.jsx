import { Link } from "react-router-dom";


const Failed = () => {
    return (
        <div className="flex justify-center items-center mx-96 fixed">
            <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4 text-center">
              <div className="ui icon negative message">
                <i className="warning icon"></i>
                <div className="content">
                  <div className="header">
                    Oops! Something went wrong.
                  </div>
                  <p>While trying to reserve money from your account</p>
                </div>
              </div>
            </div>
            <Link to={'/dashboard/cart'}>
            
            <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded w-full">
              Try again
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
        </div>
    );
};

export default Failed;