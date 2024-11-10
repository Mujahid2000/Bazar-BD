import { createContext, useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCallback } from "react";

export const VerifyContext = createContext();

export const UserVerify = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("access-token") || null);
  const queryClient = useQueryClient();

  const fetchToken = async () => {
    axios.defaults.headers.common['Authorization']  = token
    const response = await axios.post("https://postgre-server.vercel.app/verify-token", {
      token,
    });
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["verifyToken", token],
    queryFn: fetchToken,
    enabled: !!token,
    retry: false,
    onError: () => {
      localStorage.removeItem("access-token");
    },
  });

  useEffect(() => {
    if (data) {
      console.log("Token Verified:", data);
    }
    if (error) {
      console.error("Token Verification Error:");
    }
  }, [data, error]);

  const verifyToken = useCallback(() =>{
    return fetchToken()
  },[token])

  return (
    <VerifyContext.Provider value={{ token, setToken, verifyToken }}>
      { children}
    </VerifyContext.Provider>
  );
};

export default UserVerify;
