import {useContext, useState} from "react";
import { UserContext } from "../UserContext.jsx";
import {  Link, Navigate, useParams} from "react-router-dom";
import axios from "axios";
import BooksPage from "./BooksPage.jsx";
import AccountNav from "../AccountNav.jsx";

export default function ProfilePage() {
    const {redirect,setRedirect,} = useState(false);       
    const {ready,user,setUser} = useContext(UserContext);
    let {subpage} = useParams();
    if (subpage === undefined) {
        subpage = 'profile'; 
    }
    
    async function logout() {
        await axios.post('/logout')
        .then(() => location.href = '/login')
        setRedirect('/');
        setUser(false);
    }
    
    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user && !redirect) {
        return <Navigate to= {'/login'} />
    }


    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div>
            <AccountNav />
            <Link to={'/login'} className="flex items-center gap-1">
                {subpage === 'profile' && (
                    <div className="text-center max-w-lg mx-auto text-white text-1xl underline p-8">
                        Logged in as {user.name} ({user.email})<br />
                        <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
                    </div>
                )}
                {subpage === 'books' && (
                    <BooksPage />
                )}
            </Link>
        </div>
    );
}