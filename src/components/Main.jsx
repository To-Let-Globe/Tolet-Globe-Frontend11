import { Route, Routes } from "react-router-dom";
import { Layout, Admin } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API } from "../config/axios";
import { login } from "../store/authSlice";

const Main = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchUserInfo = async () => {
      if (!token) return null;
      try {
        const res = await API.get("/user/info", {
          params: {
            token: token,
          },
        });
        const dispatch = useDispatch();
        const authState = useSelector((state) => state.auth);
        useEffect(() => {
          const token = localStorage.getItem("token");
          const fetchUserInfo = async () => {
            if (!token) return null;
            try {
              const res = await API.get("/user/info", {
                params: {
                  token: token,
                },
              });
              const data = {
                token: token,
                userData: res.data,
              };
              dispatch(login(data));
            } catch (err) {
              console.error("Error fetching user info: ", err);
            }
          };
          fetchUserInfo();
        }, [authState]);
        const data = {
          token: token,
          userData: res.data,
        };
        dispatch(login(data));
      } catch (err) {
        console.error("Error fetching user info: ", err);
      }
    };
    fetchUserInfo();
  }, [authState]);

  return (
    <Routes>
      <Route path="/*" element={<Layout />} />
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
  );
};

export default Main;
