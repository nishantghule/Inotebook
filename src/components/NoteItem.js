import React from 'react';

function NoteItem(props) {
  const {note, index} = props;
  return (
    <div className="col md-3">
        <div className="card my-3">
            <div className="card-body">
                <div className="d-flex align-items-center">
                <h5 className="card-title me-3">{note.title}</h5>
                  <i className="fa-solid fa-trash-can mx-2"></i>
                  <i className="fa-solid fa-pen-to-square mx-2"></i>
                </div>
                <h6 className="card-subtitle mb-2 text-body-secondary">NoteItem - {index+1}</h6>
                <p className="card-text">{note.description}</p>
              </div>
        </div>
    </div>
  )
}

export default NoteItem