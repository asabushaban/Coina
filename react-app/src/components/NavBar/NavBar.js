import React from "react";
import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { useSelector } from "react-redux";
import "./NavBar.css";

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  const searchRef = useRef();
  const [query, setQuery] = useState("");

  const showResults = () => {
    const searchRes = document.querySelector(".searchResults");
    searchRes.style.display = "flex";
  };

  // const SearchBar = () => {
  //   useEffect(() => {
  // 	// add when mounted
  // 	document.addEventListener("mousedown", handleClick);
  // 	// return function to be called when unmounted
  // 	return () => {
  // 		document.removeEventListener("mousedown", handleClick);
  // 	};
  // }, [])

  return (
    <nav>
      <div id={"navContainer"}>
        {/* <h1 id={"logo"}>Coina</h1> */}
        <NavLink to="/" exact={true} id={"logo"}>
          Coina
        </NavLink>
        <p>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </p>
        <p>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </p>
        <p>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </p>
        <div className="search">
          <div className="dashboard-search">
            <div className="searchIcon">
              <svg
                className="search-logo"
                fill="none"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M15.3201 16.7344C14.0741 17.5354 12.5913 18 11 18C6.58172 18 3 14.4183 3 10C3
                  5.58172 6.58172 2 11 2C15.4183 2 19 5.58172 19 10C19 12.1038 18.1879 14.0179 16.8601 15.446L21.7071
                  20.293L20.2928 21.7072L15.3201 16.7344ZM17 10C17 13.3137 14.3137 16 11 16C7.68629 16 5 13.3137 5 10C5 6.68629
                  7.68629 4 11 4C14.3137 4 17 6.68629 17 10Z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>

            <div
              className="searchbar"
              ref={searchRef}
              // onMouseEnter={showResults}

              // onMouseLeave={hideResults}
            >
              <input
                type="search"
                // onKeyUp={e => {
                //   setQuery(e.target.value);
                //   showResults();
                // }}
                style={{
                  width: "100%",
                  height: 44,
                  border: "none",
                  outline: "none",
                  fontSize: 15,
                }}
                placeholder="Search Coina"
                type="search"
                className="SB"
              ></input>

              {/* <SearchBar /> */}
            </div>
          </div>
        </div>
        <p>
          {sessionUser ? (
            <>
              <NavLink
                to={`/myprofile/${sessionUser.id}`}
                exact={true}
                activeClassName="active"
              >
                Profile
              </NavLink>
            </>
          ) : null}
        </p>
        <p>
          <LogoutButton />
        </p>
      </div>
    </nav>
  );
};

export default NavBar;
