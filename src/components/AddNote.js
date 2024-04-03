import React ,{useContext, useState}from 'react'
import NoteContext from '../context/notes/NoteContext';

function AddNote() {
    const context = useContext(NoteContext);
    const {addNote } = context;
    const [note, setNote] = useState({title:"",description:"",tag:"Default"})
    const handelClick=(e)=>{
        e.preventDefault();
        var nameInput = document.getElementById('title');
        var emailInput = document.getElementById('description');

        // Check if both name and email fields are filled
        if (nameInput.value && emailInput.value) {
            addNote(note.title,note.description,note.tag);
            // Here you can submit the form via AJAX or any other means
        } else {
            // If any field is empty, show an error message
            alert('Please fill in all fields.');
        }
    }
    const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div>
        <div className="container my-3">
        <h2>Add a Note</h2>
        <form className="my-3">
            <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="email" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" onChange={onChange} style={{height:"100px"}}/>
            </div>
            <div className="mb-3">
            <label className="form-label" htmlFor="tag">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" onChange={onChange}/>
            </div>
            <button type="submit" className="btn btn-primary" onClick={handelClick}>Add Note</button>
        </form>
        </div>
        
    </div>
  )
}

export default AddNote