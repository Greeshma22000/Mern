import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  console.log(notes);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      if(!token){
        setError("No authentication token found. Please log in");
        return;
      }
      const {data} = await axios.get("/api/notes",{
        headers: {Authorization: `Bearer ${token}`},
      });
      console.log(data);
      setNotes(data);
    } catch (error) {
      setError("Failed to fetch notes");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [])
  return (
    <div className='container mx-auto px-4 py-8 min-h-screen bg-purple-500'>
      {error && <p className='text-red-400 mb-4'>{error}</p>}
      <div>
        {notes.map((note) => (
          <div key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.description}</p>
            <p>{new Date(note.updatedAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home