import React from 'react';
import Note from "./Note"

function Notes(props) {
  const {notes} = props

  function handleFocus() {
    console.log("focus!")
  }

  return ( 
    <>
      <input type="text" placeholder='Take a note...' onFocus={handleFocus}/>
      {notes.length 
        ? <div>
            <Note />
          </div>
        : <div className='empty-notes'>
            <i className="fa-solid fa-lightbulb"></i>
            <p>Notes you add appear here</p>
          </div>}
    </>
  );
}

export default Notes;