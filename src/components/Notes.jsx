import React, { useState } from 'react';
import Note from "./Note"
import NoteField from './NoteField';

function Notes(props) {
  const { notes } = props
  const [isNoteFieldOpen, setIsNoteFieldOpen] = useState(false)

  return ( 
    <>
      {isNoteFieldOpen 
        ? <NoteField 
            notes={notes} 
            addNote={props.addNote} 
            closeNoteField={() => setIsNoteFieldOpen(false)}
          /> 
        : <input 
            type="text" 
            placeholder='Take a note...' 
            className='take-a-note' 
            disabled={props.isSearching} 
            onFocus={() => {setIsNoteFieldOpen(true)}}
          />
      }
      
      {notes.length && notes.filter(note => !note.isDeleted).length
        ? <div className='notes-container'>
            {notes.map((note, index) => (
              note.isArchived || note.isDeleted
              ? 
                null
              : 
                <Note 
                  key={note.id} 
                  note={note} 
                  id={index} 
                  deleteNote={props.deleteNote} 
                  bookMarkNote={props.bookMarkNote}
                  addLabel={props.addLabel}
                  clearLabels={props.clearLabels}
                  removeLabel={props.removeLabel}
                  archiveNote={props.archiveNote}/>
              
              ))
            }
          </div>
        : <div className='empty-notes'>
            <i className="fa-solid fa-lightbulb"></i>
            <p>Notes you add appear here</p>
          </div>}
    </>
  );
}

export default Notes;