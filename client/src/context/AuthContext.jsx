import React, { createContext, useReducer } from "react";
import axios from "axios";
import { authReducer } from "../reducers/authReducer";
import { apiURL, LOCAL_STORAGE_TOKEN_NAME } from "./constants";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticate: false,
    user: null,
  });

  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiURL}/auth/login`,userForm);
      if (response.data.success) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  // Context data
  const authContextData = {
    authState,
    loginUser,
  };
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};
export {AuthContext}
export default AuthContextProvider;
