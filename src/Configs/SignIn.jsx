import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { Toaster, toast } from "sonner";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";

const SignIn = () => {
    const { googleLogin, user , signIn, setLoading} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';



const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get('email');
    const password = form.get('password');
    console.log({ email, password });
    signIn(email, password)
        .then(result => {
            const user = result.user;
            
            console.log(user);
            toast.success('User has been created')
            setLoading(false)
            navigate(from , {replace: true});
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


useEffect(() => {
    if (user) {
        navigate(location.state || '/');
    }
});



    return (
       
        <div className="p-8 mb-4  flex items-center gap-5 justify-center">
        
        <div
          className={` w-full h-screen fixed top-0 left-0 bg-[#000]  transition-all duration-300 flex items-center justify-center`}
        >
          <div
            className={`
            } w-[90%] md:w-[80%] lg:w-[35%] bg-[#fff] rounded-lg transition-all duration-300 mx-auto mt-8`}
          >
            <div className="w-full flex items-end p-4 justify-between border-b border-[#d1d1d1]">
              <h1 className="text-[1.5rem] font-bold">
                Sign in to BazarBD
              </h1>
             
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-5 p-4">
              <div>
                <label
                  htmlFor="email"
                  className="text-[1rem] font-[500] text-[#464646]"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={'admin12@gamil.com'}
                  id="email"
                  required
                  placeholder="user@gmail.com"
                  className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
                />
              </div>

              <div>
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
                  value={12345678}
                  placeholder="**********"
                  className="py-2 px-3 border border-[#d1d1d1] rounded-md w-full focus:outline-none mt-1 focus:border-[#3B9DF8]"
                />
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

                <p  className="text-[#3B9DF8] cursor-pointer font-[400] text-[1rem]">
                  Forget Password
                </p>
              </div>

              <button
                type="submit"
                className="py-2 px-4 active:scale-[0.9] transition-all duration-300 w-full bg-[#3B9DF8] text-[#fff] rounded-md"
              >
                Sign In
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
                <Link to={'/signUp'} href="#" className="text-[#3B9DF8] underline">
                  Sign Up
                </Link>
              </p>
            </div>
</div>
            
          </div>
        </div>
      </div>
    );
};

export default SignIn;