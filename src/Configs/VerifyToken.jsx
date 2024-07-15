import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const VerifyContext = createContext();

export const UserVerify = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access-token"));


  const verifyToken = async  () => {
    try {
      if (!token) {
        throw new Error("No token found");
      }
      axios.defaults.headers.common['authorization'] = token
      const response = await axios.post("https://bazar-bd-server.vercel.app/verify-token", {
        token,
      });
      return response.data;
    } catch (error) {
      localStorage.removeItem("access-token");
      throw error;
    }
  };


  useEffect(() =>{
    verifyToken();
  }, [verifyToken])

  
  return (
    <VerifyContext.Provider value={{ token, setToken, verifyToken }}>
      {children}
    </VerifyContext.Provider>
  );
};

export default UserVerify;
