import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import BookGallery from "../BookGallery";
import AddressLink from "../AddressLink";

export default function BookPage() {
    const {id} = useParams(); 
    const [book, setBook] = useState(null);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/Bookks/${id}`).then(response => {
            setBook(response.data); 
        });
    }, [id]);

    if (!book) return '';

    return (
        <div className="p-2text-6xl mt-4 bg-gray-100 -mx-8 px-8 py-8 text-white bg-capitalize">
            <h1 className="text-6xl bg-black text-center">{book.title}</h1>
            <AddressLink>{book.address} ASIA </AddressLink>
            <BookGallery book={book} />
     
            <div className="text-2xl p-2 mt-8 mb-8 grid gap-2 grid gap-8 bg-black text-primary gap-2 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div className="text-black">
                    <div className="my-4 text-white">
                     <h2 className="font-semibold text-2xl text-primary">Description</h2>
                     {book.description}
                    </div>
                    CheckIn: {book.checkIn}<br />
                    CheckOut: {book.checkOut}<br />
                </div>
                <div className="bg-primary">
                  <BookingWidget book={book} />
                </div>
            </div> 
            <div className="bg-black text-primary -mx-8 px-8 py-8 border-t">
                <div>
                 <h2 className="font-semibold text-2xl">Extra info</h2>
                </div>
                <div className="mb-4 mt-2 text-white text-md text-gray-700 leading-5">{book.extraInfo}</div>
             </div>   
        </div>
    );
}