// CookieContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
const CookieContext = createContext();

export const useCookieContext = () => useContext(CookieContext);

const CookieProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate()
        return;
      }

      try {
        // Make your API request using cookies.token for authentication
        // ...

        // Example using your axios request:
        // const response = await axios.get("http://localhost:4000/projects", {
        //   withCredentials: true,
        // });
        
        // const { status, data } = response;

        // if (status) {
        //   setProjects(data); // Set the project data in the state.
        //   toast("Projects fetched successfully", {
        //     position: "top-right",
        //   });
        // } else {
        //   removeCookie("token");
        //   navigate("/signin");
        // }
      } catch (error) {
        console.error("Error:", error);
        removeCookie("token");
        // Handle error and navigation
        // navigate("/signin");
      }
    };
    verifyCookie();
  }, [cookies, removeCookie]);

  return (
    <CookieContext.Provider value={{ cookies, setCookie, removeCookie, projects }}>
      {children}
    </CookieContext.Provider>
  );
};

export default CookieProvider;
