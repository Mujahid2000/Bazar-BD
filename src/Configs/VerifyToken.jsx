import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const VerifyContext = createContext();

export const UserVerify = ({ children }) => {
  const { token, setToken } = useContext(AuthContext);
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [isErrorHandled, setIsErrorHandled] = useState(false);
  const queryClient = useQueryClient();

  /**
   * Function to verify the token by making a backend API request.
   */
  const fetchToken = async () => {
    if (!token) throw new Error("No token provided");
    try {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      const response = await axios.post("https://postgre-server.vercel.app/verify-token");
      return response.data;
    } catch (error) {
      console.error("Token Verification Failed:", error.message);
      throw error;
    }
  };

  /**
   * React Query to handle token verification.
   */
  const { data, error, isLoading } = useQuery({
    queryKey: ["verifyToken", token],
    queryFn: fetchToken,
    enabled: !!token, // Only run if token exists
    retry: false,
    onError: () => {
      if (!isErrorHandled) {
        handleTokenError();
      }
    },
  });

  /**
   * Handles token verification failure by resetting states.
   */
  const handleTokenError = () => {
    setIsErrorHandled(true);
    setIsTokenVerified(false);
    localStorage.removeItem("access-token");
    setToken(null);
  };

  /**
   * React to token verification success or failure.
   */
  useEffect(() => {
    if (data) {
      console.log("Token Verified:", data);
      setIsTokenVerified(true);
      setIsErrorHandled(false);
    } else if (error) {
      console.error("Token Verification Error:", error.message);
      setIsTokenVerified(false);
    }
  }, [data, error]);

  /**
   * Function to save a new token and trigger re-verification.
   */
  const saveToken = (newToken) => {
    localStorage.setItem("access-token", newToken);
    setToken(newToken);
    queryClient.invalidateQueries(["verifyToken"]); // Force re-fetch
  };

  /**
   * Callback to manually verify the token.
   */
  const verifyToken = useCallback(() => {
    if (token) {
      queryClient.invalidateQueries(["verifyToken"]);
    }
    return fetchToken();
  }, [token, queryClient]);

  /**
   * Show a loading spinner when the token verification is in progress.
   */
  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="w-10 h-10 animate-spin rounded-full border-4 border-r-[#3B9DF8] border-[#3b9df84b]"></div>
  //     </div>
  //   );
  // }

  return (
    <VerifyContext.Provider
      value={{
        token,
        setToken: saveToken,
        verifyToken,
        isTokenVerified,
        isLoading,
        error,
      }}
    >
      {children}
    </VerifyContext.Provider>
  );
};

export default UserVerify;
