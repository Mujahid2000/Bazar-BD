import axios from "axios";
import { useEffect, useState } from "react";


const User = () => {
    const [allUser, setAllUser] = useState(null);
	const [search, setSearch] = useState('')
	console.log(search);
    
    useEffect(() => {
        axios.get('https://postgre-server.vercel.app/user')
            .then(res => setAllUser(res.data.data))
            .catch(error => console.error(error));
    }, []);

	const filterUser = allUser && allUser.filter(user => {
		return user?.name.toLowerCase().includes(search.toLowerCase())
	})


    return (
        <div>
            <div className="bg-white p-9 ml-6 md:ml-12 lg:ml-7 min-w-[90rem] mt-9 rounded-md w-full">
	<div className=" flex items-center justify-evenly pb-6">
		<div>
			<h2 className="text-gray-600 text-center font-semibold">Total User</h2>
			<span className="text-xs">All Information</span>
		</div>
		<div className="flex items-center justify-between">
			<div className="flex bg-gray-50 items-center p-2 rounded-md">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
					fill="currentColor">
					<path fillRule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clipRule="evenodd" />
				</svg>
				<input onChange={(e) => setSearch(e.target.value)} className="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..."/>
          </div>
				
			</div>
		</div>
		<div>
			<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table className="min-w-full leading-normal">
						<thead>
							<tr>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									User Name
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Email
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Registration Date
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Total Order
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Amount 
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Role
								</th>
							</tr>
						</thead>
						<tbody>
							{
                              filterUser &&   filterUser.map(data => (
                                    <tr key={data._id}>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<div className="flex items-center">
												<p className="text-gray-900 whitespace-no-wrap">
													{data.name}
												</p>
										</div>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<p className="text-gray-900 whitespace-no-wrap">{data.email}</p>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<p className="text-gray-900 whitespace-no-wrap">
										Jan 21, 2020
									</p>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<p className="text-gray-900 whitespace-no-wrap">
										{data.admin == true ? data.order : '33'}
									</p>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<p className="text-gray-900 whitespace-no-wrap">$599.99</p>
								</td>
								<td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
									<span
                                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                        <span aria-hidden
                                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
									<span className="relative">{data.admin == true ? 'Admin' : 'User'}</span>
									</span>
								</td>
							</tr>
                                ))
                            }
			
						</tbody>
					</table>
					<div
						className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
						<span className="text-xs xs:text-sm text-gray-900">
                            Showing 1 to 4 of 50 Entries
                        </span>
						<div className="inline-flex mt-2 xs:mt-0">
							<button
                                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                Prev
                            </button>
							&nbsp; &nbsp;
							<button
                                className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                Next
                            </button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
        </div>
    );
};

export default User;