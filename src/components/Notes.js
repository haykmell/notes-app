import React, { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import ReactMarkdown from "react-markdown";

function getLocalNotes() {
  if (localStorage.getItem("notes") === null) {
    localStorage.setItem("notes", JSON.stringify([]));
    return [];
  } else {
    return JSON.parse(localStorage.getItem("notes"));
  }
}

const Notes = () => {
  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState(getLocalNotes());
  const [isEditing, setIsEditing] = useState(false);
  const [editingID, setEditingID] = useState("");
  const [noteEditText, setNoteEditText] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSubmit = () => {
    if (noteInput === "") {
      alert("Enter note!");
    } else {
      const note = {
        id: Date.now(),
        text: noteInput,
        date:
          new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate(),
        isEditing: false,
      };

      setNotes([...notes, note]);
      setNoteInput("");
    }
  };

  const removeNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (id) => {
    setIsEditing(true);
    setNotes(
      notes.map((note) => {
        if (note.id === id) {
          setEditingID(note.id);
          setNoteEditText(note.text);
          return {
            ...note,
            isEditing: true,
          };
        }
        return note;
      })
    );
  };

  const handleEdit = () => {
    setNotes(
      notes.map((note) => {
        if (note.id === editingID) {
          return {
            ...note,
            isEditing: false,
            text: noteEditText,
          };
        }
        return note;
      })
    );
    setIsEditing(false);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <div className="card-header-title">Add Note</div>
          {isEditing ? (
            <MdEdit className="add-icon" onClick={handleEdit} />
          ) : (
            <IoMdAdd className="add-icon" onClick={handleSubmit} />
          )}
        </div>
        <textarea
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          className="input-text"
          placeholder="Enter Your Note..."
        ></textarea>
        <div className="card-content">
          {notes.map((note) => {
            return note.isEditing ? (
              <textarea
                key={note.id}
                className="note-edit"
                value={noteEditText}
                onChange={(e) => setNoteEditText(e.target.value)}
              ></textarea>
            ) : (
              <div className="note" key={note.id}>
                <div className="note-text">
                  <ReactMarkdown>{note.text}</ReactMarkdown>
                  <span className="note-date">{note.date}</span>
                </div>
                <div className="note-settings">
                  <button className="trash" onClick={() => removeNote(note.id)}>
                    <FaRegTrashAlt />
                  </button>
                  <button className="edit" onClick={() => editNote(note.id)}>
                    <MdEdit />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notes;
