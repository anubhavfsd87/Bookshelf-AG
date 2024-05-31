import { useEffect, useState, } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../Image.jsx";
import Headers from "../components/Headers/Headers.jsx";
import NYTAPI from "../components/NYTAPI/NYTAPI.jsx";




export default function IndexPage() {
    const [books,setBooks] = useState([]);

    useEffect(() => {
        axios.get('/Bookks').then(response => {
            setBooks(response.data);
        });
    }, []);

    return (
        <div className=" flex-c mt-8 grid gap-x-4 items-center justify-between justify-center gap-y-8 grid-cols-2"> 
            <Headers />
            <br />
            <NYTAPI />
            <br />
            <div className="flex-c text-center text-3xl p-1 bg-primary items-center justify-between text-white rounded-3xl mb-9 font-bold">READ & ORDER BOOKS ONLINE
                <div className="flex-c text-2xl grid bg-lightblack p-3 gap-x-9 gap-y-9 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                    {books.length > 0 && books.map(book => (
                        <Link to={'/Bookks/'+book._id}>
                            <div className="flex-c bg-gray-500 mb-2 rounded-2xl">
                                {book.photos?.[0] && (
                                    <Image className="flex-c rounded-2xl object-cover aspect-square" src={book.photos?.[0]} alt=""/>
                                )}
                            </div>
                            <h2 className="flex-c font-bold">{book.address}</h2>
                            <h3 className="flex-c text-2xl truncate text-white-500">{book.title}</h3>
                            <div className="flex-c mt-1">
                                <span className="font-bold">₹{book.price}</span> per day
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}