import React from 'react';

function Note(props) {
  return ( 
    <div className='note'>
      <h2>{props.note.title}</h2>
      <p>{props.note.noteText}</p>
    </div>
  );
}

export default Note;