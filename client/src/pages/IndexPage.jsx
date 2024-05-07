import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import Image from "../Image.jsx";

export default function IndexPage() {
    const [books,setBooks] = useState([]);
    useEffect(() => {
        axios.get('/Books').then(response => {
            setBooks(response.data);
        });
    }, []);
    return (
       <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {books.length > 0 && books.map(book => (
            // eslint-disable-next-line react/jsx-key
            <Link to={'/book/'+book.id}>
                <div className="bg-gray-500 mb-2 rounded-2xl flex">
                   {book.photos?.[0] && (
                     <Image className="rounded-2xl object-cover aspect-square" src={book.photos?.[0]} alt=""/>
                    )}
                </div>
                <h2 className="font-bold">{book.address}</h2>
                <h3 className="text-sm truncate text-gary-500">{book.title}</h3>
                <div className="mt-1">
                    <span className="font-bold">${book.price}</span> per day
                </div>
            </Link>
          ))}
        </div>
    );
}