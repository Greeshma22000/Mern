import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from "react-router-dom";

const Navbar = ({user, setUser}) => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) return;
        const delay = setTimeout(() => {
            navigate(search.trim() ? `/?search=${encodeURIComponent(search)}` : "/");
        }, 500);
        return () => clearTimeout(delay);
    }, [search, navigate, user]);

    useEffect(() => {
        setSearch("");
    }, [user]);
    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };


  return (
    <nav className='bg-purple-900 p-4 text-white shadow-lg'>
        <div className='container mx-auto flex items-center justify-between'>
            <Link to="/">Notes App</Link>
            {user && (
                <>
                    <div>
                        <input 
                            type="text" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Search notes....'
                            className='w-full px-4 py-2 bg-purple-700 text-white border border-purple-600 rounded-2xl outline-none focus:ring-2 focus:ring-purple-500'
                        />
                    </div>
                    <div className='flex items-center space-x-4'>
                        <span className='text-purple-300 font-medium'>{user.username}</span>
                        <button
                            onClick={handleLogout}
                            className='bg-rose-600 text-white px-3 py-1 rounded-md hover:bg-rose-700'
                        >Logout</button>
                    </div>
                </>
            )}
        </div>
    </nav>
  )
}

export default Navbar