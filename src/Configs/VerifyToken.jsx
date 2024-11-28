import { createContext, useState, useEffect, useCallback, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const VerifyContext = createContext();

export const UserVerify = ({ children }) => {
  const { token, setToken } = useContext(AuthContext);
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const [isErrorHandled, setIsErrorHandled] = useState(false);
  const queryClient = useQueryClient();

console.log(token);

  const fetchToken = async () => {
    if (!token) throw new Error("No token provided");

    try {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      const response = await axios.post("https://postgre-server.vercel.app/verify-token");
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        console.error("Invalid token:", error.message);
        throw new Error("Forbidden: Invalid token");
      }
      throw error;
    }
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["verifyToken", token],
    queryFn: fetchToken,
    enabled: !token, 
    retry: false,
    onError: () => {
      if (!isErrorHandled) {
        setIsErrorHandled(true);
        setIsTokenVerified(false);
        localStorage.removeItem("access-token");
        setToken(null); // Clear the token state
      }
    },
  });

  // React to token verification success or failure
  useEffect(() => {
 
    if (data) {
      console.log("Token Verified:", data);
      setIsTokenVerified(true);
      setIsErrorHandled(false);
    } else if (error) {
      console.error("Token Verification Error:", error.message);
    }
  }, [data, error]);

  // Function to set token and trigger verification
  const saveToken = (newToken) => {
    localStorage.setItem("access-token", newToken); // Save to localStorage
    setToken(newToken); // Update state and trigger verification
    queryClient.invalidateQueries(["verifyToken"]); // Force re-fetch
  };

  const verifyToken = useCallback(() => {
    if (token) {
      queryClient.invalidateQueries(["verifyToken"]);
    }
    return fetchToken();
  }, [token, queryClient]);

  return (
    <VerifyContext.Provider
      value={{
        token,
        setToken: saveToken, // Use saveToken to ensure synchronization
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
