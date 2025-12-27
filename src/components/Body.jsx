import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Body = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    // If no user is in Redux, redirect to login
    // We allow access to /signup so new users can register
    if (!user && window.location.pathname !== "/signup") {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Body;