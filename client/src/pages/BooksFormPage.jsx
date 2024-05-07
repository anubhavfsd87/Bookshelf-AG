import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "../Perks.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav.jsx";
import {Navigate, useParams} from 'react-router-dom';

export default function BooksFormPage() {
    const {id} = useParams(); 
    console.log({id});
    const [title,setTitle] = useState('');
    const [isbn,setISBN] = useState(''); 
    const [numberOfPages,setTotalPageNumber] = useState('');  
    const [addedPhotos,setAddedPhotos] = useState('[]');
    const [description,setDescription] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [secureCheckIn,setSecureCheckIn] = useState('');
    const [secureCheckout,setSecureCheckout] = useState('');
    const [price,setPrice] = useState(100);
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
       if (!id) {
         return;    
       }
       axios.get('/Books/'+id).then(response => {
          const {data} = response;
          setTitle(data.title);
          setISBN(data.isbn);
          setTotalPageNumber(data.numberOfPages);
          setAddedPhotos(data.photos);
          setDescription(data.description);
          setPerks(data.perks);
          setExtraInfo(data.extraInfo);
          setSecureCheckIn(data.checkIn);
          setSecureCheckout(data.checkout);
          setPrice(data.price);
       });
    }, [id]);
    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }
    function inputDescription(text) {
        return(
            <p className="text-gray-500 text-sm">{text}</p>
        );
    } 
    function preInput(header,description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function saveBook(ev) {
        ev.preventDefault();
        const bookData =  {
            title, isbn, numberOfPages, addedPhotos,
            description, perks, extraInfo, 
            secureCheckIn, secureCheckout, price,
        };
        if (id) {
            // update
            await axios.put('/Books', {
                id, ...bookData
            });
            setRedirect(true);    
        } else {
           // new book
            await axios.post('/Books', bookData);
        }    
        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to={'/account/Books'} />
    }
    return (
        <div>
            <AccountNav />
            <form onSubmit={saveBook}>
               {preInput('Title', 'title for your book, should be short and catchy as in advertisement')}
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: The White Tiger"/>
               {preInput('ISBN', 'Unique numeric book identifier')}
                <input type="text" value={isbn} onChange={ev => setISBN(ev.target.value)} placeholder="Required ISBN"/>
               {preInput('Number of pages', 'Total page number')}
                <input type="text" value={numberOfPages} onChange={ev => setTotalPageNumber(ev.target.value)} placeholder="number of total pages"/>
               {preInput('Photos', 'more = better')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
               {preInput('Description','description of the book')}
                <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
               {preInput('Perks','Select all the perks of your book')}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                  <Perks selected={perks} onchange={setPerks} />
                </div>
               {preInput('Extra Info','Book Rules, etc')}
                <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
               {preInput('Read online Books','Remember the age-limit for reading online before Secure Check-In')}
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div>    
                        <h3 className="mt-2 -mb-1">Secure Check-In</h3>
                        <input type="text" 
                        value={secureCheckIn} 
                        onChange={ev => setSecureCheckIn(ev.target.value)} 
                        placeholder="Minimum for 15 days"/>
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Secure-Checkout</h3>
                        <input type="text" 
                        value={secureCheckout} 
                        onChange={ev => setSecureCheckout(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Price per day</h3>
                        <input type="text" 
                        value={price} 
                        onChange={ev => setPrice(ev.target.value)} />
                    </div>
                </div>    
                <div>
                    <button className="primary my-4">Save</button>
                </div>
            </form>
        </div>
    )
}