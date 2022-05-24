import React, {useState} from 'react';

function Note(props) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [labelInput, setLabelInput] = useState("")

  const {note, id, deleteNote, addLabel, clearLabels, removeLabel, archiveNote, permaDeleteNote, recoverNote} = props

  return ( 
    <div 
      className={`note ${isModalOpen ? "open-modal" : ""} ${note.isDeleted ? "deleted-note" : ""}`} 
      onMouseOver={() => {setIsHovered(true)}} 
      onMouseLeave={() => {setIsHovered(false); setIsModalOpen(false)}}
    >

      {/* overlay if the note is deleted */}
      {isHovered && note.isDeleted && (
        <div className="deleted-overlay">
          <button className='delete-btn' onClick={() => permaDeleteNote(note.id)}>Delete Note</button>
          <button onClick={() => recoverNote(note.id)}>Recover Note</button>
        </div>
      )}

      <h2>{note.title}</h2>
      <p>{note.noteText}</p>

      {/* labels */}
      <div className="labels-container">
        {note.labels.length > 0 && note.labels.map((label, index) => (
          <button 
            className='note-label' 
            onClick={() => removeLabel(note.id, label)} 
            key={index}>{label}</button>
            )
        )}
      </div>

      {/* if the note is not deleted */}
      {!note.isDeleted && (
        <>
          <div className={`icons ${isHovered ? "" : "hidden"}`}>
            {note.isArchived 
              ? <i className="fa-solid fa-box-open" onClick={() => {archiveNote(note.id)}}></i>
              : <svg
                  onClick={() => {archiveNote(note.id)}} 
                  xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z"></path>
                </svg>
            }

            <svg 
              onClick={() => {setIsModalOpen(true)}} 
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path>
            </svg>

            <svg 
              onClick={() => deleteNote(note.id)} 
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path><path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
            </svg>
          </div>

          {/* label modal */}
          {isModalOpen && isHovered && (
            <div className='label-modal'>
              <p>Label Note</p>
              <input 
                type="text" 
                placeholder='Enter label name' 
                autoFocus
                value={labelInput} 
                onChange={e => setLabelInput(e.target.value)}
              />
              
              {/* modal buttons */}
              <div className="modal-options">
                <button onClick={() => {clearLabels(note.id); setIsModalOpen(false)}}>Remove Labels</button>
                <div className="modal-icons-container">
                  <i className="fa-solid fa-ban" onClick={() => setIsModalOpen(false)}></i>
                  <i
                    className="fa-solid fa-check"
                    onClick={() => {
                      addLabel(id, labelInput); 
                      setLabelInput(""); 
                      setIsModalOpen(false); 
                      setIsHovered(false)
                    }}>
                  </i>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Note;
