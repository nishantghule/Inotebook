import React, { useContext } from 'react';
import NoteItem from './NoteItem';
import NoteContext from '../context/notes/NoteContext';

export default function Notes() {
    const context = useContext(NoteContext);
    const { notes, setNotes } = context;
  return (
    <div className="row my-3">
        <h2>Your Notes</h2>
       {notes.map((note,index) => {
        return <NoteItem note={note} index={index} key={index}/>
      })}
      </div>
  )
}
