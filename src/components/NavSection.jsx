import React from 'react';
import LinkItem from "./LinkItem"

function NavSection(props) {
  return ( 
    <nav>
      {props.linkValues.map((linkVal, index) => (
        <LinkItem 
          key={index}
          to={linkVal.to}
          text={linkVal.text}
          isSelected={linkVal.isSelected}
          isNavOpen={props.isNavOpen}
          icon={linkVal.icon}/>
      ))}
    </nav>
  );
}

export default NavSection;