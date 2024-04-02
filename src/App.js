import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import About from './components/About.js';
import Home from './components/Home.js';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert.js';

function App() {
  return (
    <> 
    <NoteState>
    <BrowserRouter>
      <Navbar/>
      <Alert message={"This is iNoteBook Application"}/>
      <Routes>
        <Route path='/' element={<Home></Home>}/>
        <Route path='/about' element={<About></About>}/>
      </Routes>
    </BrowserRouter>
    </NoteState> 
    </>
  );
}

export default App