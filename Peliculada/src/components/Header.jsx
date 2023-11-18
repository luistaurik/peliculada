import React, { useState } from 'react';
import logo from '../assets/Logo-peliculada.png';
import '../components/Header.css';

function Header({ setSearchM, validateMovies }) {
  const [inputValue, setInputValue] = useState("");

  const searchMovies = async (e) => {
    e.preventDefault();
    setSearchM(inputValue);
    validateMovies(inputValue);
  };

  return (
    <>
      <header className="p-3 text-bg-dark">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
              <img src={logo} className="header-logo" alt="Logo" />
            </a>
            <ul className="nav col-8 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="#footer" className="nav-link px-2 text-secondary">About</a></li>
            </ul>
            <form className="d-flex col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" onSubmit={searchMovies}>
              <input type="search" className="form-control input-search form-control-dark text-bg-light" placeholder="Search..." aria-label="Search" onChange={(e) => setInputValue(e.target.value)}
              />
              <button type="submit" className="btn btn-search me-2" placeholder="Search a movie...">
                Search
              </button>
            </form>
            <div className="text-end"></div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
