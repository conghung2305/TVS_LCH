import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const LayoutAdmin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken"); 

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]); 

  return token ? <Outlet /> : null;
};

export default LayoutAdmin;
