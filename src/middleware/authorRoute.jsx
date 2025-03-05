import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AuthorRoute = () => {
    const log = useSelector((state) => state.login);
    const author = log.islogin && log.userType == "author";
    // console.log(log)
    useEffect(()=>{
        if(!author)  toast.warn('Access denied. Author authorization is required.', { autoClose: 2700 });
    })
   
    return author ?  <Outlet />:<Navigate to="/login" />;
};

export default AuthorRoute;
