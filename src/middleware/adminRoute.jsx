import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AdminRoute = () => {
   const log = useSelector((state) => state.login);
       const admin = log.islogin && log.userType == "admin";
    //    console.log(log)
       useEffect(()=>{
           if(!admin)  toast.warn('Access denied. Admin authorization is required.', { autoClose: 2700 });
       })
      
       return admin ?  <Outlet />:<Navigate to="/login" />;
};

export default AdminRoute;
