import React from 'react';
import Note from "./Note"

function Trash(props) {
  const deletedItems = props.notes.filter(item => item.isDeleted)

  return ( 
    <>
      {
        deletedItems.length 
          ? (
            <>
              <h1 className='deleted-header'>Deleted Notes</h1>
              <div className="notes-container">
                {deletedItems.map((note, index) => (
                  <Note 
                    key={note.id} 
                    note={note} 
                    id={index} 
                    deleteNote={props.deleteNote} 
                    bookMarkNote={props.bookMarkNote}
                    addLabel={props.addLabel}
                    clearLabels={props.clearLabels}
                    removeLabel={props.removeLabel}
                    archiveNote={props.archiveNote}
                    permaDeleteNote={props.permaDeleteNote}
                    recoverNote={props.recoverNote}/>
                ))}
              </div>
            </>
          )
          : (
            <div className='empty-trash'>
              <p>no deleted items</p>
              <i className="fa-solid fa-parachute-box"></i>
            </div>
          )
      }
    </>
  );
}

export default Trash;