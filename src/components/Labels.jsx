import React from 'react';
import Note from "./Note"

function Labels(props) {
  const labeledNotes = props.notes.filter(note => note.labels.length)
  const allLabels = []
  labeledNotes.forEach(note => note.labels.forEach(label => allLabels.includes(label) ? null : allLabels.push(label)))
  const sortedNotes = allLabels.map(label => {
    return labeledNotes.map(note => note.labels.includes(label) ? {label: label, note} : null).filter(item => item)    
  })


  return ( 
    <>
      {sortedNotes.length 
        ? 
          <>
            <h1 className='labels-header'>Notes Sorted by Label</h1>
            {sortedNotes.map((labelArr, index) => (
              <div className='labels-notes-container' key={index}>
                <p className='label-name'>{labelArr[0].label}</p>
                <div className='notes-container'>
                  {labelArr.map(({note}) => (
                    <Note 
                      key={note.id} 
                      note={note} 
                      id={index} 
                      deleteNote={props.deleteNote} 
                      bookMarkNote={props.bookMarkNote}
                      addLabel={props.addLabel}
                      clearLabels={props.clearLabels}
                      removeLabel={props.removeLabel}/>
                      )
                  )}
                </div>
              </div  >
            ))}
          </>
        : 
          <div className='empty-labels'>
            <p>No labeled Notes</p>
            <i className="fa-solid fa-inbox"></i>
          </div>
      }
    </>
  );
}

export default Labels;