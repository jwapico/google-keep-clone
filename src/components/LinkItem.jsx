import React from 'react';
import { Link } from "react-router-dom"

function LinkItem(props) {
  const className = `nav__link ${props.isNavOpen ? "" : "closed"} ${props.isSelected ? "selected" : ""}`
  return ( 
    <Link to={props.to} className={className}>
      {props.icon}      
      <p>{props.text}</p>
    </Link>
  );
}

export default LinkItem;