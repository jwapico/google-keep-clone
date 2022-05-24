import React, {useEffect, useState} from 'react';
import { Routes, Route } from "react-router-dom"

// css
import "./css/normalize.css"
import './css/app.css';

// components
import Header from "./components/Header"
import NavSection from './components/NavSection';
import Labels from "./components/Labels"
import Archive from "./components/Archive"
import Trash from "./components/Trash"
import Notes from "./components/Notes"
import ThemeContext from "./ThemeContext"

// custom hooks
import useToggler from './hooks/useToggler';

function App() {
  const { isToggled: isNavOpen, toggle: toggleIsNavOpen, turnOn: openNav } = useToggler(false)
  const { isToggled: isDarkMode, toggle: toggleIsDarkMode} = useToggler(false)

  const [sectionLinks, setSectionLinks] = useState([
    {to: "/", text: "Notes", id: 1, isSelected: true, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path></svg>},
    {to: "/labels", text: "Labels", id: 2, isSelected: false, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path></svg>},
    {to: "/archive", text: "Archive", id: 3, isSelected: false, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z"></path></svg>},
    {to: "/trash", text: "Trash", id: 4, isSelected: false, icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path><path d="M9 8h2v9H9zm4 0h2v9h-2z"></path></svg>},
])
  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")


  // links
  function changeIsSelected(id) {
    openNav()
    setSectionLinks(prevLinks => {
      return prevLinks.map(link => {
        return link.id === id ? {...link, isSelected: true} : {...link, isSelected: false} 
      })
    })
  }


  // note functions
  function addNote(note) {
    setNotes(prevNotes => [note, ...prevNotes])
  }

  function deleteNote(id) {
    setNotes(prevNotes => prevNotes.map(note => {
      return note.id === id ? {...note, isDeleted: !note.isDeleted} : note
    }))
  }

  function permaDeleteNote(id) {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
  }

  function recoverNote(id) {
    setNotes(prevNotes => prevNotes.map(note => note.id === id ? {...note, isDeleted: !note.isDeleted} : note))
  }

  function archiveNote(id) {
    setNotes(prevNotes => prevNotes.map(note => {
      return note.id === id ? {...note, isArchived: !note.isArchived} : note
    }))
  }


  // label functions
  function addLabel(id, labelText) {
    setNotes(prevNotes => prevNotes.map(
      (note, index) => index === id && labelText ? {...note, labels: [...note.labels, labelText]} : note
    ))
  }

  function removeLabel(id, labelText) {
    setNotes(prevNotes => prevNotes.map(note => {
      if (note.id === id) {
        return {...note, labels: note.labels.filter(label => label !== labelText)}
      }
      return note
    }))
  }

  function clearLabels(id) {
    setNotes(prevNotes => prevNotes.map(note => {
      return note.id === id ? {...note, labels: []} : note
    }))
  }


  // search functions
  // loops through all the text associated with each note and if any of the text includes 
  // the search phrase the note will be added to the filtered note array in state
  function makeSearch(text) {
    setIsSearching(true)
    setSearchTerm(text)
    const loweredText = text.toLowerCase()

    const filteredItems = notes.filter(note => note.title.toLowerCase().includes(loweredText) || note.noteText.toLowerCase().includes(loweredText) || note.labels.filter(label => label.toLowerCase().includes(loweredText)).length)

    setFilteredNotes(filteredItems)
  }

  function endSearch() {
    setIsSearching(false)
  }

  // in case the user decides to take an action on the note while searching - without this
  // the visual change would be delayed until the user ended their search
  useEffect(() => {
    const filteredItems = notes.filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.noteText.toLowerCase().includes(searchTerm.toLowerCase()) || note.labels.filter(label => label.toLowerCase().includes(searchTerm.toLowerCase())).length)
    setFilteredNotes(filteredItems)
  }, [notes])


  // Since theres no way (that I know of, please let me know if there is) to access the 
  // full height of the document in css, I had to manually toggle a class on the html node
  // so I could ensure the page would be purely one color based on the theme. Without this
  // There would be a break in the colors in dark mode since the "app" class' max-height is 
  // that of its content. 
  useEffect(() => {
    if (isDarkMode) {
      document.getElementById("html").classList.remove("light-mode")
    } else {
      document.getElementById("html").classList.add("light-mode")
    }
  }, [isDarkMode])
 
  // Theres gotta be a better way to do this, let me know please :)
  document.addEventListener("keydown", (e) => {if (e.key === "Escape") {setIsSearching(false)}})

  return (
    <ThemeContext.Provider value={{isDarkMode, toggleIsDarkMode}}>
      <div className={`app ${!isDarkMode ? "light-mode" : " "}`}>
        <Header 
          toggleIsNavOpen={toggleIsNavOpen} 
          makeSearch={makeSearch} 
          isSearching={isSearching} 
          searchTerm={searchTerm} 
          endSearch={endSearch} 
          toggleIsDarkMode={toggleIsDarkMode}
        />
        <main>
          <NavSection
            isNavOpen={isNavOpen}
            linkValues={sectionLinks}
            changeIsSelected={changeIsSelected}
            onMouseOver={openNav}
          />
          <div className="routes">
            <div className={`route ${sectionLinks.filter(link => link.isSelected)[0].text}`}>
              {/* Is there a way to write this so I dont have to pass all the props to each 
              component each time? Maybe a useNotes custom hook? I'm note sure how that would look*/}
              <Routes>
                <Route exact path="/" element={
                  <Notes
                    notes={isSearching ? filteredNotes : notes}
                    addNote={addNote}
                    deleteNote={deleteNote}
                    addLabel={addLabel}
                    clearLabels={clearLabels}
                    removeLabel={removeLabel}
                    archiveNote={archiveNote}
                    isSearching={isSearching}
                    />}>
                </Route>
                <Route path="/labels" element={
                  <Labels
                    notes={isSearching ? filteredNotes : notes}
                    addNote={addNote}
                    deleteNote={deleteNote}
                    addLabel={addLabel}
                    clearLabels={clearLabels}
                    removeLabel={removeLabel}
                    archiveNote={archiveNote}
                    isSearching={isSearching}
                    />}>
                </Route>
                <Route path="/archive" element={
                  <Archive
                    notes={isSearching ? filteredNotes : notes}
                    addNote={addNote}
                    deleteNote={deleteNote}
                    addLabel={addLabel}
                    clearLabels={clearLabels}
                    removeLabel={removeLabel}
                    archiveNote={archiveNote}
                    isSearching={isSearching}
                  />}>
                </Route>
                <Route path="/trash" element={
                  <Trash
                    notes={isSearching ? filteredNotes : notes}
                    addNote={addNote}
                    deleteNote={deleteNote}
                    addLabel={addLabel}
                    clearLabels={clearLabels}
                    removeLabel={removeLabel}
                    archiveNote={archiveNote}
                    permaDeleteNote={permaDeleteNote}
                    recoverNote={recoverNote}
                    isSearching={isSearching}
                  />}>
                </Route>
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;