import React, {useState} from 'react';

function Note(props) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [labelInput, setLabelInput] = useState("")

  const {note, id, bookMarkNote, deleteNote, addLabel, clearLabels, removeLabel} = props

  return ( 
    <div className={`note ${isModalOpen ? "open-modal" : ""}`} onMouseOver={() => setIsHovered(true)} onMouseLeave={() => {setIsHovered(false); setIsModalOpen(false)}}>
      <h2>{note.title}</h2>
      <p>{note.noteText}</p>
      <div className="labels-container">
        {note.labels.length > 0 && note.labels.map((label, index) => <button className='note-label' onClick={() => removeLabel(note.id, label)} key={index}>{label}</button>)}
      </div>

      <div className={`icons ${isHovered ? "" : "hidden"}`}>
        {note.label 
          // bookmarked icon
          ? <i  
              onClick={() => {bookMarkNote(id); setIsModalOpen(true)}} 
              className="fa-solid fa-bookmark"></i> 
          
          // label icon
          : <svg 
              onClick={() => {setIsModalOpen(true)}} 
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path>
            </svg>
        }

        {/* delete note icon*/}
        <svg onClick={() => deleteNote(note.id)} 
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
            value={labelInput} 
            onChange={(e) => setLabelInput(e.target.value)}/>
          
          <div className="modal-options">
            <button onClick={() => {clearLabels(id); setIsModalOpen(false)}}>Remove Labels</button>
            <div className="modal-icons-container">
              <i className="fa-solid fa-ban" onClick={() => setIsModalOpen(false)}></i>
              <i
                className="fa-solid fa-check"
                onClick={() => {addLabel(id, labelInput); setLabelInput(""); setIsModalOpen(false)}}></i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Note;
