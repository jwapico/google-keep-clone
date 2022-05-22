import React, {useState} from 'react';

function Note(props) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [labelInput, setLabelInput] = useState("")

  return ( 
    <div className='note' onMouseOver={() => setIsHovered(true)} onMouseLeave={() => {setIsHovered(false); setIsModalOpen(false)}}>
      <h2>{props.note.title}</h2>
      <p>{props.note.noteText}</p>

      <div className={`icons ${isHovered ? "" : "hidden"}`}>
        {props.note.isBookMarked 
          ? <i  onClick={() => props.bookMarkNote(props.id)} className="fa-solid fa-bookmark"></i> 
          : <svg onClick={() => {props.bookMarkNote(props.id); setIsModalOpen(true)}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path></svg>
        }
        <svg onClick={() => props.deleteNote(props.id)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path><path d="M9 8h2v9H9zm4 0h2v9h-2z"></path></svg>
      </div>

      {isModalOpen && isHovered && props.note.isBookMarked && (
        <div className='label-modal'>
          <p>Label Note</p>
          <input type="text" placeholder='Enter label name' value={labelInput} onChange={(e) => setLabelInput(e.target.value)}/>
          <i className="fa-solid fa-check"></i>
        </div>
      )}
    </div>
  );
}

export default Note;
