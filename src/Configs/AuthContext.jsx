import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import {app} from "./firebase.config"
import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const AuthContext= createContext(null);
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const faceBookProvider = new FacebookAuthProvider();
    
    const createUser = (email, password) =>{
        setLoading(true);
        console.log("Email:", email); // Check if email is received correctly
        console.log("Password:", password); // Check if password is received correctly
        return createUserWithEmailAndPassword(auth, email, password)
            .catch(error => {
                console.error("Error creating user:", error); // Log any errors
                throw error; // Rethrow the error to be caught by the caller
            });
    }
    

    const signIn = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const handleUpdateProfile = (name, photoURL) =>{
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
        })
    }

    const googleLogin = (name, email) =>{
        return signInWithPopup(auth, googleProvider);
    }

    const faceBookLogin = (auth, ) =>{
        return signInWithPopup(auth, faceBookProvider)
    }

    const logOut = () =>{
        setLoading(true);
        return signOut(auth)
    }
    

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
                setUser(currentUser);
                if(currentUser){
                    // token store
                    const userInfo = {email: currentUser.email}
                    axios.post('https://bazar-bd-server.vercel.app/jwt', userInfo)
                    .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false);
                    } 
                    })
    
                }else{
                    // something doing
                    localStorage.removeItem('access-token');
                    setLoading(false);
                }
                
            })
            return () =>{
                return unsubscribe();
            }
        }, []);


    const authInfo = { 
        user,
        loading,
        createUser,
        signIn,
        logOut,
        handleUpdateProfile,
        setLoading ,
        googleLogin ,
        faceBookLogin}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;