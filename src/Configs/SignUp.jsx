import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { Toaster, toast } from "sonner";


const SignUp = () => {
    const { createUser,googleLogin, user, handleUpdateProfile, setLoading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
   


    useEffect(() =>{
        if(user)
        location.state ? location.state : '/'
    },[user, location.state])

    const handleSignUp = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const email = form.get('email');
        const password = form.get('password');
        const PhotoURL = form.get('PhotoURL');
        console.log({name, email, password, PhotoURL});
        
        createUser(email, password)
        .then(() =>{
            handleUpdateProfile(name, PhotoURL)
            .then(() =>{
                const userInfo ={
                    name: name,
                    email: email,
                    password: password,
                    admin: false
                }
                axios.post('https://postgre-server.vercel.app/user', userInfo)
                .then(res => {
                    if(res.data.insertedId){
                        toast.success('User has been created')
                        setLoading(false)
                    }
                    navigate('/')
                })
            })
        }).catch(error => {
            setLoading(false)
            console.error(error);
            if(error.code === 'auth/email-already-in-use'){
                toast.error('Email has already used')
            }
        })
    
    };


    const handleGoogleLogin = () => {
        googleLogin().then((result) => {
        console.log(result.user);
        const userInfo = {
            email: result.user?.email,
            name: result.user?.displayName,
            admin: false
        };
        axios.post("https://postgre-server.vercel.app/user", userInfo)
        .then((res) => {
            console.log(res.data);
            navigate('/')
        });
        });
    };
    

	return (
<div className="p-8 mb-4 flex items-center gap-5 justify-center">
        
        <div
          className={` w-full h-screen fixed top-0 left-0 bg-black transition-all duration-300 flex items-center justify-center`}
        >
          <div
            className={`w-[90%] md:w-[80%] lg:w-[35%] bg-[#fff] rounded-lg transition-all duration-300 mx-auto mt-8`}
          >
            <div className="w-full flex items-end p-4 justify-between border-b border-[#d1d1d1]">
              <h1 className="text-base md:text-[1.5rem] font-bold">
                Registration in our Platform
              </h1>
              
            </div>

            <form onSubmit={handleSignUp} className="flex flex-col gap-5 p-4">
              <div className="flex gap-3 justify-between">
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="text-[1rem] font-[500] text-[#464646]"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="email"
                  required
                  placeholder="Type your name"
                  className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="password"
                  className="text-[1rem] font-[500] text-[#464646]"
                >
                  PhotoURL
                </label>
                <input
                  type="text"
                  name="PhotoURL"
                  required
                  id="PhotoURL"
                  placeholder="PhotoURL"
                  className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
                />
              </div>
              </div>
              <div className="flex gap-3 justify-between">
              <div className="w-full">
                <label
                  htmlFor="email"
                  className="text-[1rem] font-[500] text-[#464646]"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  id="email"
                  placeholder="user@gmail.com"
                  className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
                />
              </div>

              <div className="w-full">
                <label
                  htmlFor="password"
                  className="text-[1rem] font-[500] text-[#464646]"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="**********"
                  className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
                />
              </div>
              </div>

              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="checkbox"
                    id="checkbox"
                    className="w-[17px] h-[17px]"
                  />
                  <label htmlFor="checkbox">Remember me</label>
                </div>

                
              </div>

              <button
                type="submit"
                className="py-2 px-4 w-full active:scale-[0.9] transition-all duration-300 bg-[#3B9DF8] text-[#fff] rounded-md"
              >
                Sign Up
              </button>
            </form>

            <div className="flex flex-col md:flex-row gap-2 justify-evenly items-center py-3 ">
<button onClick={handleGoogleLogin}
                className="border active:scale-[0.9] transition-all duration-300 border-[#e5eaf2] rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] text-[#424242] hover:bg-gray-50 transition-all duration-200">
                <img src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png" alt="google logo"
                     className="w-[23px]"/>
                Sign in with Google
            </button>

<div className="flex items-center justify-center  ">
              <p className="text-[1rem] font-[400] text-[#464646c]">
                Not have any account?{" "}
                <Link to={'/signIn'} href="#" className="text-[#3B9DF8] underline">
                  Sign In
                </Link>
              </p>
            </div>
</div>
          </div>
        </div>
      </div>
		
	);
};

export default SignUp;