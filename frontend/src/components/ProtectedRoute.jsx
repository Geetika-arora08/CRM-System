import { Navigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';  //reads JWT token (not verify).Sirf payload extract karega.

const ProtectedRoute = ({ children, role }) => {
    const token =localStorage.getItem("token");  // fetch token from local storage

    if (!token) {
    return <Navigate to={role === "admin" ? "/admin" : "/login"} replace />;
    }
    try{
        const decoded = jwtDecode(token);

    //Expiry check - decoded.exp → seconds me hota hai && Date.now() → milliseconds me hota hai
    if(decoded.exp * 1000 < Date.now()) {
        localStorage.clear();
        return <Navigate to="/login" replace />;
    }

    //Role Based Check
    if(role) {
        const userRole = decoded.role?.toLowerCase();

    // if user is trying admin page
    if(role === 'admin' && userRole !== "admin"){
        return <Navigate to="/login" replace />;
    }

    // admin trying user page
    if (role === "user" && userRole !== "user") {
        return <Navigate to="/admin-panel" replace />;
        }
    }
       return children ? children : <Outlet />;
    }
    catch {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  
};

export default ProtectedRoute;