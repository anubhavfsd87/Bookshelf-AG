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
        axios.get(`/Books/${id}`).then(response => {
            setBook(response.data);
        });
    }, [id]);

    if (!book) return '';

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 py-8">
            <h1 className="text-3xl">{book.title}</h1>
            <AddressLink>{book.address}</AddressLink>
            <BookGallery book={book} />
            <a className="my-2 block font-semibold underline" target="_blank" href={'https://maps.google.com/?q='+book.address} rel="noreferrer">{book.address}</a>
            <div className="mt-8 mb-8 grid gap-2 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                     <h2 className="font-semibold text-2xl">Description</h2>
                     {book.description}
                    </div>
                    Check-in: {book.checkIn}<br />
                    Check-out: {book.checkOut}<br />
                </div>
                <div>
                  <BookingWidget book={book} />
                </div>
            </div> 
            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div>
                 <h2 className="font-semibold text-2xl">Extra info</h2>
                </div>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{book.extraInfo}</div>
             </div>   
        </div>
    );
}