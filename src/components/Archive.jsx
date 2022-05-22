import React from 'react';
import Note from "./Note"

function Archive(props) {
  const archivedNotes = props.notes.filter(note => note.isArchived)

  return ( 
    <>
      {archivedNotes.length && props.notes.filter(note => !note.isDeleted).length
        ? (
            <>
              <h1 className='archive-header'>Archived Notes</h1>
              <div className='notes-container'>
                {archivedNotes.map((note, index) => {
                  return !note.isDeleted ? (
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
                  ) : null
                })}
              </div>
            </>
        )
        : (
          <div className='empty-archive'>
            <p>No Archived Notes</p>
            <i className="fa-brands fa-dropbox"></i>
          </div>
        )}
    </>
  );
}

export default Archive;