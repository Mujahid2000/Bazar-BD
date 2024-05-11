import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const CheckAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(null);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        const fetchAdminStatus = async () => {
            if (user && !loading) {
                setIsAdminLoading(false);
                try {
                    
                    const res = await axios.get(`https://bazar-bd-server.vercel.app/user/${user.email}`);
                    
                    setIsAdmin(res.data.admin);
                } catch (error) {
                    console.error("Error fetching admin status:", error);
                } finally {
                    setIsAdminLoading(false);
                }
            }
        };

        fetchAdminStatus();
    }, [user, loading]);

    return [isAdmin, isAdminLoading];
};

export default CheckAdmin;
