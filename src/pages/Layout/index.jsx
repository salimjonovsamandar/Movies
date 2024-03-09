import React from "react";
import "../Layout/index.css";
import Logo from "../../assets/Logo.svg";
import Bookmark from "../../assets/Bookmark.svg";
import Movies from "../../assets/Movies.svg";
import Shape from "../../assets/Shape.svg";
import tv from "../../assets/tv.svg";
import search from "../../assets/search.svg";
import user from "../../assets/user.svg";

function Layout({ children }) {
  return (
    <div className="layout">
      <div className="siedBar">
        <div className="wrapperSidebar">
          <div className="logo">
            <img width={32} src={Logo} alt="logo" />
          </div>
          <div className="icons">
            <img width={20} src={Shape} alt="home icon" />
            <img width={20} src={Movies} alt="Shape icon" />
            <img width={20} src={tv} alt="Tv icon" />
            <img width={20} src={Bookmark} alt="Book icon" />
          </div>
        </div>
        <div className="user">
          <img src={user} alt="User" />
        </div>
      </div>
      <main>
        <header>
          <form className="search">
            <img src={search} alt="search-icon" />
            <input type="text" placeholder="Search for movies or TV series" />
          </form>
        </header>
        {children}
      </main>
    </div>
  );
}

export default Layout;
