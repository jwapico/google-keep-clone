import React, { useState } from 'react';
import Note from "./Note"
import NoteField from './NoteField';

function Notes(props) {
  const { notes } = props
  const [isNoteFieldOpen, setIsNoteFieldOpen] = useState(false)

  return ( 
    <>
      {isNoteFieldOpen ? <NoteField /> : <input type="text" placeholder='Take a note...' className='take-a-note' onFocus={() => {setIsNoteFieldOpen(true)}}/>}
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