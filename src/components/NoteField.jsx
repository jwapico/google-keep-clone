import React, { useRef, useEffect } from 'react';

function NoteField() {
  const titleInput = useRef()

  useEffect(() => {titleInput.current.focus()}, [])

  return ( 
    <form className='note-field'>
      <input type="text" placeholder='Title' ref={titleInput}/>
      <textarea cols="30" rows="3" placeholder='Take a note...' className='take-note'></textarea>
      <div className="note-field-buttons">
        <button type='submit'>Create Note</button>
        <button>Close</button>
      </div>
    </form>
  );
}

export default NoteField;