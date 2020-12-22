import React from "react";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <a href="/" rel="noreferrer" className="navbar-logo">
          Notes <span className="f-light">Application</span>
        </a>
        <div className="nav-link">
          <a href="https://github.com/haykmell" target="_blank">
            GitHub
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
