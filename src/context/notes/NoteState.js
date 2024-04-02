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
    const notesInitial=[
        {
          "_id": "65fbe616089312316e7f43ef",
          "user": "65f6dfebf0fb9f9d35393ab2",
          "title": "Both run start",
          "description": "concurrently starting multiple by definig scripts",
          "tag": "INoteBook - Project",
          "date": "2024-03-21T07:47:34.715Z",
          "__v": 0
        },
        {
          "_id": "660b9deb7e3483e8041fcf17",
          "user": "65f6dfebf0fb9f9d35393ab2",
          "title": "Good Morning",
          "description": "Wake early in the morning",
          "tag": "Habit",
          "date": "2024-04-02T05:55:55.668Z",
          "__v": 0
        }
      ];
    const [notes, setNotes]=useState(notesInitial);
    return(
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
