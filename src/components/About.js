import React, {useContext, useEffect} from 'react';
import NoteContext from '../context/notes/NoteContext';
export default function About() {
    const a = useContext(NoteContext);
    // useEffect(()=>{
    //   a.update()
    // },[])
  return (
    <div>
      About {/* About {a.state.name} and he is in {a.state.class} */}
    </div>
  )
}


//This is about function