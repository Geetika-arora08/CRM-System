import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ChangePassword from "./pages/user/ChangePassword";
import ForgotPassword from "./pages/auth/ForgetPassword";

import UserPortal from "./pages/user/UserDashboard";
import Profile from "./pages/user/Profile";
import RequestQuote from "./pages/user/RequestQuote";
import QuoteHistory from "./pages/user/QuoteHistory";
import CreateTicket from "./pages/user/CreateTicket";
import ViewTicket from "./pages/user/ViewTicket";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLayout from "./components/AdminLayout";
import Users from "./pages/admin/Users";
import Tickets from "./pages/admin/Tickets";
import Quotes from "./pages/admin/Quotes";
import AccessLog from "./pages/admin/Visitors";
import AdminChangePassword from "./pages/admin/AdminChangePassword";
import Visitors from "./pages/admin/Visitors";
// import Dashboard from "./pages/admin/Dashboard";


function App() {

  return (
    <BrowserRouter>
    

    <Routes>
    <Route path="/" element={ <Home/>} />
    <Route path="/register" element={ <Register />}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/forgotpassword" element={<ForgotPassword />}/>
    <Route path="/userdashboard" element={<ProtectedRoute role="user"> <UserPortal /> </ProtectedRoute>}/>
    <Route path="/changepassword" element={<ChangePassword/>}/>
    <Route path="/profile" element={<Profile/>}/>
    <Route path="/requestquote" element={<RequestQuote/>}/>
    <Route path="/quotehistory" element={<QuoteHistory/>}/>
    <Route path="/createticket" element={<CreateTicket/>}/>
    <Route path="/my-tickets" element={<ViewTicket/>}/>

     {/* ADMIN LOGIN */}
    <Route path="/admin" element={<AdminLogin />} />

    {/* ADMIN PANEL */}
    <Route path="/admin-panel" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>

  <Route index element={<AdminDashboard />} />
  <Route path="users" element={<Users />} />
  <Route path="tickets" element={<Tickets />} />
  <Route path="quotes" element={<Quotes />} />
  <Route path="visitors" element={<Visitors />} />
  <Route path="change-password" element={<AdminChangePassword />} />

</Route>
    </Routes>

    
  
    </BrowserRouter>
  )
}

export default App
