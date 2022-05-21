import React from 'react';
import LinkItem from "./LinkItem"

function NavSection(props) {
  return ( 
    <nav onMouseOver={props.onMouseOver}>
      {props.linkValues.map(linkVal => (
        <LinkItem 
          key={linkVal.id}
          id={linkVal.id}
          to={linkVal.to}
          text={linkVal.text}
          isSelected={linkVal.isSelected}
          isNavOpen={props.isNavOpen}
          icon={linkVal.icon}
          changeIsSelected={props.changeIsSelected}/>
      ))}
    </nav>
  );
}

export default NavSection;