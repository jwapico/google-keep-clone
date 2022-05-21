import React, {useState} from 'react';
import { Routes, Route } from "react-router-dom"

import "./css/normalize.css"
import './css/app.css';

import Header from "./components/Header"
import NavSection from './components/NavSection';
import Labels from "./components/Labels"
import Archive from "./components/Archive"
import Trash from "./components/Trash"
import Notes from "./components/Notes"



function App() {
  const [isNavOpen, setIsNavOpen] = useState(true)
  const [sectionLinks, setSectionLinks] = useState([
    {to: "/", text: "Notes", id: 1, isSelected: true, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path></svg>},
    {to: "/labels", text: "Labels", id: 2, isSelected: false, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path></svg>},
    {to: "/archive", text: "Archive", id: 3, isSelected: false, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z"></path></svg>},
    {to: "/trash", text: "Trash", id: 4, isSelected: false, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path><path d="M9 8h2v9H9zm4 0h2v9h-2z"></path></svg>},
  ])
  const [notes, setNotes] = useState([])

  function toggleIsNavOpen() {
    setIsNavOpen(prevIsOpen => !prevIsOpen)
  }

  function openNav() {
    setIsNavOpen(true)
  }

  function changeIsSelected(id) {
    openNav()
    setSectionLinks(prevLinks => {
      return prevLinks.map(link => {
        return link.id === id ? {...link, isSelected: true} : {...link, isSelected: false} 
      })
    })
  }

  return (
    <>
      <Header toggleIsNavOpen={toggleIsNavOpen}/>

      <main>
        <NavSection
          isNavOpen={isNavOpen}
          linkValues={sectionLinks}
          changeIsSelected={changeIsSelected}
          onMouseOver={openNav}
        />
        <div className="routes">
          <div className={`route ${sectionLinks.filter(link => link.isSelected)[0].text}`}>
            <Routes>
              <Route exact path="/" element={<Notes notes={notes}/>}></Route>
              <Route path="/labels" element={<Labels />}></Route>
              <Route path="/archive" element={<Archive />}></Route>
              <Route path="/trash" element={<Trash />}></Route>
            </Routes>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;