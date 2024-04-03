import React, { useContext, useRef, useState } from 'react';
import NoteItem from './NoteItem';
import NoteContext from '../context/notes/NoteContext';
import AddNote from './AddNote';
import { useEffect } from 'react';

export default function Notes() {
  const context = useContext(NoteContext);
  const { notes, getAllNotes, editNote } = context;
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
  const ref = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    getAllNotes();
  }, []);

  const updateNote =(currentNote) =>{
    ref.current.click();
    setNote({id: currentNote._id,etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag});
  }
  //logic to update note
  const handelClick=(e)=>{
    editNote(note.id, note.etitle,note.edescription,note.etag);
    closeRef.current.click();
  }
const onChange=(e)=>{
  setNote({...note, [e.target.name]: e.target.value})
}
  return (
    <>
      <AddNote />
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        click to update notes
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update Your Notes</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="email" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} style={{height:"100px"}}/>
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="etag">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
                </div>
                <button  type="submit" className="btn btn-primary" onClick={handelClick}>Add Note</button>
            </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={closeRef} className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handelClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note, index) => {
          return <NoteItem note={note} index={index} key={index} updateNote={updateNote} />
        })}
      </div>
    </>
  )
}
