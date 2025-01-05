import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "./firebase.config";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(); // Track token state
    
    const googleProvider = new GoogleAuthProvider();
    const faceBookProvider = new FacebookAuthProvider();

    useEffect(() => {
        const storedToken = localStorage.getItem("access-token");
        if (storedToken) {
          setToken(storedToken); // স্টেট আপডেট
        }
      }, []);
      

    // Create user with email and password
    const createUser = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            return userCredential;
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }
    };

    // Sign in with email and password
    const signIn = async (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Update user profile
    const handleUpdateProfile = (name, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL,
        });
    };

    // Google login
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    };

    // Facebook login
    const faceBookLogin = () => {
        return signInWithPopup(auth, faceBookProvider);
    };

    // Log out user
    const logOut = () => {
        setLoading(true);
        localStorage.removeItem("access-token"); // Remove token from localStorage
        setToken(null); // Clear token state
        return signOut(auth);
    };

    // On auth state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          setUser(currentUser);
      
          if (currentUser) {
            const userInfo = { email: currentUser.email };
            try {
              const res = await axios.post("https://postgre-server.vercel.app/jwt", userInfo);
              if (res.data.token) {
                localStorage.setItem("access-token", res.data.token);
                setToken(res.data.token); // টোকেন স্টেট আপডেট
              }
            } catch (error) {
              console.error("Error generating token:", error);
            }
          } else {
            localStorage.removeItem("access-token");
            setToken(null);
          }
      
          setLoading(false);
        });
      
        return () => unsubscribe();
      }, []);
      

    // Auth info
    const authInfo = {
        user,
        token, 
        setToken,
        loading,
        createUser,
        signIn,
        logOut,
        handleUpdateProfile,
        setLoading,
        googleLogin,
        faceBookLogin,
    };

    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
