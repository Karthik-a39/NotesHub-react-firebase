import {auth,db} from "../config/firebase";
import { collection,addDoc } from "firebase/firestore";
import { useState } from "react";
import "../AddNotes.css";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

const AddNotes=()=>

{

    const [title,setTitle]=useState("");
    const [content,setContent]=useState("");
    const navigate=useNavigate();
    const saveNote = async () => {
    if (!title || !content) {
      toast.error("Title or Content cannot be empty");
      return;
    }

    if (!auth.currentUser) {
      toast.error("User not logged in");
      return;
    }

    try {
      await addDoc(
        collection(db, "notes", auth.currentUser.uid, "userNotes"),
        {
          title,
          content,
          createdAt: new Date()
        }
      );

      toast.success("Note added successfully");
      setTitle("");
      setContent("");
      navigate("/home");

    } catch (err) {
      toast.error("Error adding note: " + err.message);
    }
  };
    return(
        <div className="addnotes">
            <h2>Add a New Note</h2>
            <div>
                <input type="text" placeholder="Title of the note"  onChange={(e)=>setTitle(e.target.value)}/>
                <br />
                <textarea placeholder="Your note here..." rows="8" cols="50" onChange={(e)=>setContent(e.target.value)}></textarea>
                <br />
                <button onClick={saveNote}>Save Note</button>
            </div>
        </div>
    );
}
export default AddNotes;