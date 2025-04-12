import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

export default function Layout({ ...props }) {
  const authContext = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    setTimeout(() => {
      if (!token || !authContext.isTokenValid(token)) {
        navigate("/login");
      }
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{props.children}</div>;
}
