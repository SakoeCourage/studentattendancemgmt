import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "../api/Api";
import User from "../api/User";
import Cookies from "js-cookie";


const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [notificationsCount, setNotificationsCount] = useState({})
    const [checkingforuser, setCheckingforUser] = useState('idle')
    const navigate = useNavigate();

    const getUser = () => {
        setCheckingforUser('processing')
        Api.get("/user").then(res => {
            setUser(res.data)
        }).catch(err => {
        })
            .finally(() => {
                setCheckingforUser('fullfiled')
            })
    }


    const login = async (formData) => {
        return new Promise((resolve, reject) => {
            Api.post('/login', formData)
                .then(res => {
                    const { token } = res.data
                    Cookies.set('BearerToken', token)
                    resolve(token)
                    getUser()
                    
                })
                .catch(err => {
                    if (err?.response?.status === 422) {
                        reject(err?.response?.data?.errors)
                    }
                })
        })

    };

    const logout = () => {
        setCheckingforUser('processing')
        User.logout()
            .then(res => {
                setUser(null);
                Cookies.remove('BearerToken')
                navigate("/login", { replace: true });
                setCheckingforUser('fullfiled')
            })
            .catch(err=>{
                setCheckingforUser('fullfiled')
                console.log(err.response)
            })

    };

    const value = useMemo(
        () => ({
            user,
            login,
            logout,
            getUser,
            checkingforuser,
            notificationsCount
        }),
        [checkingforuser, user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

