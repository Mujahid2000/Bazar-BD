

const Cancel = () => {
    return (
        <div className="border">
            <div className="bg-white mx-96 min-h-screen flex items-center fixed justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-sm w-full">
        <h2 className="text-3xl text-center text-gray-800 font-semibold mb-4">Payment Cancelled</h2>
        <p className="text-gray-600 text-lg mb-6 text-center">We're sorry, but your payment was cancelled.</p>
        <div className="flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Return to Homepage
          </button>
        </div>
      </div>
    </div>
        </div>
    );
};

export default Cancel;