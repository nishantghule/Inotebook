const express = require("express");
const router=express.Router();
const fetchuser = require("../middelware/fetchuser");
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');

//Route 1: Get all the notes using: GET "api/notes/fetchallnotes". Login required
router.get('/fetchallnotes',fetchuser, async (req, res) => { 
    const notes = await Notes.find({user: req.user.id})
    res.json(notes)
})

//Route 2: Add new notes using: post "api/notes/addnote". Login required
router.post('/addnote',fetchuser,[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters').isLength({min: 5})
] , async (req, res) => { 
    try{
        const{title,description,tag} = req.body; 
    //if there are errors return Bad Request and the error
    const errors = validationResult(req);
    if(!errors.isEmpty()){
     return res.status(400).json({errors: errors.array()});
    }
    const notes=new Notes({
        title, description, tag, user: req.user.id 
    })
    const savedNotes= await notes.save();
    res.json(savedNotes);
    }catch(error){
     res.status(500).send("Internal Server Error");
  }
})
//Route 3: update  notes using: PUT "api/notes/updatenote/:id". Login required
router.put('/updatenote/:id',fetchuser , async (req, res) => { 
    const {title, description, tag}=req.body;
    //create new note object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};
 //find the note to be upadated and update it
 let note = await Notes.findById(req.params.id);
 if(!note){
    return res.status(404).send("sorry,note not found!..")
 }
 if(note.user.toString() !== req.user.id){
    return res.status(401).send("authentication failed..!")
 }
 note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote }, {new: true});
 res.json({note});
})
/*
$set: Modifies the value of a field in a document or inserts a new field if it does not exist.
$unset: Removes a field from a document.
$inc: Increments the value of a field by a specified amount.
$mul: Multiplies the value of a field by a specified factor.
$rename: Renames a field in a document.
$min: Updates the value of a field to a specified value if the specified value is less than the current value.
$max: Updates the value of a field to a specified value if the specified value is greater than the current value.
$currentDate: Sets the value of a field to the current date or time.
$addToSet: Adds elements to an array field only if they do not already exist in the array.
$push: Adds an element to an array field.
$pop: Removes the first or last element from an array field.
$pull: Removes elements from an array field that match a specified condition.
$each: Modifies array fields using a combination of multiple update operators.
*/
//Route 3: update  notes using: GET "api/notes/deletnote':id". Login required
router.delete('/deletenote/:id',fetchuser , async (req, res) => { 
    
 //find the note to be upadated and update it
 let note = await Notes.findById(req.params.id);
 if(!note){
    return res.status(404).send("sorry,note not found!..")
 }
 //delete if authientication successfull
 if(note.user.toString() !== req.user.id){
    return res.status(401).send("authentication failed..!")
 }
 note = await Notes.findByIdAndDelete(req.params.id)
 res.json({"success":"Note has been deleted",note: note});
})

//Route 4: Delete all notes for the logged-in user using: DELETE "api/notes/deleteallnotes". Login required
router.delete('/deleteallnotes', fetchuser, async (req, res) => {
    try { 
        // Find and delete all notes associated with the logged-in user
        const result = await Notes.deleteMany({ user: req.user.id });
        res.json({ message: `${result.deletedCount} notes deleted for the user`,deletedNotes: result });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});




module.exports = router