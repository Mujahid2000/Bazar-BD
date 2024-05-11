import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

const CheckAdmin = () => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(null);
    const [isAdminLoading, setIsAdminLoading] = useState(true);

    useEffect(() => {
        const fetchAdminStatus = async () => {
            if (user && !loading) {
                setIsAdminLoading(true);
                try {
                    const token = await user.getIdToken();

                    // Set token as cookie
                    document.cookie = `jwtToken=${token}; path=/`;

                    const res = await axios.get(`https://bazar-bd-server.vercel.app/user/${user.email}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
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
