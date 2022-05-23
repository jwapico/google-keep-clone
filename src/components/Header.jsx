import React, { useState, useRef } from 'react';

import googleKeepLogo from "../assets/googleKeepLogo.png"
import ThemeContext from '../ThemeContext';

function Header({ toggleIsNavOpen, makeSearch, isSearching, searchTerm, endSearch, toggleIsDarkMode }) {
  const [searchQuery, setSearchQuery] = useState("")
  const searchInput = useRef(null)
  const {isDarkMode} = React.useContext(ThemeContext)

  function handleSubmit(e) {
    e.preventDefault()
    makeSearch(searchQuery)
    setSearchQuery("")
    searchInput.current.blur()
  }

  return ( 
    <header className={`home__header ${!isDarkMode ? "light-mode" : ""}`}>
        <div className="ham-logo-keep-container">
          <div className="ham-container">
            <svg onClick={toggleIsNavOpen} focusable="false" viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
          </div>
          <a href='https://keep.google.com/' target="_blank"><img src={googleKeepLogo} alt="Google Keep Logo" className='logo'/></a>
          <a href='https://keep.google.com/' target="_blank"><h1>Keep</h1></a>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <svg focusable="false" height="24px" viewBox="0 0 24 24" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M20.49,19l-5.73-5.73C15.53,12.2,16,10.91,16,9.5C16,5.91,13.09,3,9.5,3S3,5.91,3,9.5C3,13.09,5.91,16,9.5,16 c1.41,0,2.7-0.47,3.77-1.24L19,20.49L20.49,19z M5,9.5C5,7.01,7.01,5,9.5,5S14,7.01,14,9.5S11.99,14,9.5,14S5,11.99,5,9.5z"></path><path d="M0,0h24v24H0V0z" fill="none"></path></svg>
          <input type="text" placeholder={`${searchTerm && isSearching ? searchTerm : "Search"}`} className={isSearching ? "searching" : ""} ref={searchInput} value={searchQuery} onChange={e => {setSearchQuery(e.target.value)}}/>
        </form>
        <div className='header-btns-container'>
          {isSearching && <button onClick={() => endSearch()}>Confirm</button>}
          <div className='toggler-container'>
            <label className="switch">
              <input type="checkbox"  onClick={() => toggleIsDarkMode()}/>
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </header>
  );
}

export default Header;