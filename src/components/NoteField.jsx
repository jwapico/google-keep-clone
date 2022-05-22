import React, { useRef, useEffect, useState } from 'react';

function NoteField(props) {
  const [title, setTitle] = useState("")
  const [noteText, setNoteText] = useState("")

  const titleInput = useRef()
  useEffect(() => {titleInput.current.focus()}, [])

  function onSubmit(event) {
    event.preventDefault()
    props.closeNoteField()
    props.addNote({
      title: title,
      noteText: noteText,
      isBookMarked: false,
      labels: ""
    })
  }

  function onClose(event) {
    event.preventDefault()
    props.closeNoteField()
  }

  return ( 
    <form className='note-field'>
      <input type="text" placeholder='Title' ref={titleInput} value={title} onChange={e => setTitle(e.target.value)}/>
      <textarea cols="30" rows="1" placeholder='Take a note...' className='take-note' value={noteText} onChange={e => setNoteText(e.target.value)}></textarea>
      <div className="note-field-buttons">
        <button type='submit' onClick={(e) => onSubmit(e)}>Create Note</button>
        <button onClick={(e) => onClose(e)}>Close</button>
      </div>
    </form>
  );
}

export default NoteField;