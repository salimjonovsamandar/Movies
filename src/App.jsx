import { useState, useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Bookmarks from "./pages/Bookmarks";
import About from "./pages/About";

import Error from "./pages/Error";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("token") && location.pathname != "/register") {
      navigate("/login");
    }
  }, []);

  function ProtectedRoute({
    children,
    redirectTo = "/login",
    isAuthentication,
  }) {
    if (!isAuthentication) {
      navigate(redirectTo);
    }
    return children;
  }

  return (
    <>
      <Routes>
        {/*Public */}
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>

        {/*Protected*/}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthentication={token ? true : false}>
              <Home></Home>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/movies"
          element={
            <ProtectedRoute isAuthentication={token ? true : false}>
              <Movies></Movies>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/series"
          element={
            <ProtectedRoute isAuthentication={token ? true : false}>
              <Series></Series>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/bookmarks"
          element={
            <ProtectedRoute isAuthentication={token ? true : false}>
              <Bookmarks></Bookmarks>
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/movies/about/:id"
          element={
            <ProtectedRoute isAuthentication={token ? true : false}>
              <About></About>
            </ProtectedRoute>
          }
        ></Route>

        <Route path="*"  element={<Error></Error>}></Route>
      </Routes> 
    </>
  );
}

export default App;
