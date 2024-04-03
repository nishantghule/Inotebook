import NoteContext from './NoteContext';
import { useState } from 'react';
const NoteState = (props) => {
    /*const s1 = {
        "name": "Nishant",
        "class":"BE"
    } 
    const [state, setState] = useState(s1);
    //function to used to update state using useEffect hook
    const update = ()=>{
        setTimeout(() => {
            setState({
                "name":"harry",
                "class":"10b"
            })     
        },1000)
    }*/
    const host = "http://localhost:5000";
    const [notes, setNotes]=useState([]);
//get all note
const getAllNotes=async ()=>{
    //api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method: 'GET',
        headers:{
            'content-type':'application/json',
            'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmNmRmZWJmMGZiOWY5ZDM1MzkzYWIyIn0sImlhdCI6MTcxMDkzNTkyNX0.EIcTZYbyRjyBKuJbmunGz6gne5Q-1HMgx8ZqytaTGfM'
        },
    });
    const json = await response.json();

    setNotes(json);
}
    //Add note github

    const addNote = async (title, description, tag)=>{
        //api call
        const response = await fetch(`${host}/api/notes/addnote`,{
            method: 'POST',
            headers:{
                'content-type':'application/json',
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmNmRmZWJmMGZiOWY5ZDM1MzkzYWIyIn0sImlhdCI6MTcxMDkzNTkyNX0.EIcTZYbyRjyBKuJbmunGz6gne5Q-1HMgx8ZqytaTGfM'
            },
            body: JSON.stringify({title, description,tag})
        });
        const note=await response.json();
        setNotes(notes.concat(note));
    }
    //Delete note
    const deleteNote=async (id)=>{
        const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
            method: 'DELETE',
            headers:{
                'content-type':'application/json',
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmNmRmZWJmMGZiOWY5ZDM1MzkzYWIyIn0sImlhdCI6MTcxMDkzNTkyNX0.EIcTZYbyRjyBKuJbmunGz6gne5Q-1HMgx8ZqytaTGfM'
            },
        });
        const json = await response.json();
        console.log(json)
        const newNotes = notes.filter((note)=>{return note._id !== id});
        setNotes(newNotes);
    }
    //Edit note
    const editNote= async (id, title, description, tag)=>{
        //api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
            method: 'PUT',
            headers:{
                'content-type':'application/json',
                'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVmNmRmZWJmMGZiOWY5ZDM1MzkzYWIyIn0sImlhdCI6MTcxMDkzNTkyNX0.EIcTZYbyRjyBKuJbmunGz6gne5Q-1HMgx8ZqytaTGfM'
            },
            body: JSON.stringify({title, description, tag})
        });
        const json =await response.json();
        console.log(json)
        let newNotes = JSON.parse(JSON.stringify(notes))
        //logic to update note
        for(let index=0;index < notes.length; index++){
            const element=newNotes[index];
            if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    return(
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
