import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import BookImg from "../BookImg";

export default function BooksPage() {
    const [books,setBooks] = useState([]);
    useEffect(() => {
        axios.get('/user-Books').then(({data}) => {
           setBooks(data);
        });
    }, []);
    return (
        <div>
            <AccountNav />
                <div className="text-center">
                    <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/books/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new book
                    </Link>
                </div>
                <div className="mt-4">
                    {[books.length > 0 && books.map(Book => (
                        // eslint-disable-next-line react/jsx-key
                        <Link to={'/account/Books/'+Book._id}className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
                            <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                               <BookImg book={Book} />
                            </div>
                            <div className="grow-0 shrink">
                               <h2 className="text-xl">{Book.title}</h2>
                               <p className="text-sm mt-2">{Book.description}</p>
                            </div>
                        </Link>
                    ))]}    
                </div>   
        </div>
    );
}