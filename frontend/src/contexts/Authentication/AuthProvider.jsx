import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";

export function AuthProvider({ children }) {
  const url = "http://localhost:3000/api/v1";
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const [err, setErr] = useState(null);

  const login = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${url}/users/login`, data, {
        withCredentials: true,
      });
      console.log(response);
      setUser(response.data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${url}/users/me`, {
          credentials: "include",
        });
        if (response.ok) {
          const res = await response.json();
          setUser(res.user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [url]);
  return (
    <AuthContext.Provider value={{ user, loading, err, url, login }}>
      {children}
    </AuthContext.Provider>
  );
}
