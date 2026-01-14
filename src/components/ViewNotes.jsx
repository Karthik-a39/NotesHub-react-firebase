import React, { useState, useEffect } from "react";
import "../ViewNotes.css";
import { auth,db } from "../config/firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ViewNotes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      if (!auth.currentUser) return;
      const ref = collection(db, "notes", auth.currentUser.uid, "userNotes");
      const snap = await getDocs(ref);
      setNotes(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    fetchNotes();
  }, []);

  const removeDoc = async (id) => {
    await deleteDoc(doc(db, "notes", auth.currentUser.uid, "userNotes", id));
    setNotes(prev => prev.filter(n => n.id !== id));
    toast.success("Note deleted");
  };

  const startEdit = (note) => {
    setEditId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const saveEdit = async () => {
    await updateDoc(
      doc(db, "notes", auth.currentUser.uid, "userNotes", editId),
      { title: editTitle, content: editContent }
    );

    setNotes(prev =>
      prev.map(n =>
        n.id === editId ? { ...n, title: editTitle, content: editContent } : n
      )
    );

    setEditId(null);
    toast.success("Note updated");
  };

  const filteredNotes = notes.filter(n =>
    n.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="viewnotes">
      <h2> <b>Your Notes</b></h2>

      <div className="notes-display">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="notes-list">
        {filteredNotes.map(note => (
          <div key={note.id} className="note-card">
            {editId === note.id ? (
              <>
                <input value={editTitle} onChange={e => setEditTitle(e.target.value)} />
                <textarea value={editContent} onChange={e => setEditContent(e.target.value)} />
                <div className="btn-group">
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={() => setEditId(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <h3>{note.title}</h3>
                <p>{note.content}</p>
                <div className="btn-group">
                  <button onClick={() => startEdit(note)}>Edit</button>
                  <button onClick={() => removeDoc(note.id)}>Delete</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <button onClick={() => navigate("/home")}>Back</button>
    </div>
  );
};

export default ViewNotes;
