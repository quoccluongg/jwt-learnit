import React from "react";
import { Navigate } from "react-router-dom";
import { LOCAL_STORAGE_TOKEN_NAME } from "../context/constants";
const Lading = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
  return (
    <>
    {token ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />}
    </>
  );
};

export default Lading;
