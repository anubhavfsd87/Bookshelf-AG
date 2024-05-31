import PhotosUploader from "../PhotosUploader.jsx";
import Perks from "../Perks.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav.jsx";
import {Navigate, useParams} from 'react-router-dom';
import PhoneNumberValidation from "../components/PhoneValidation/PhoneNumberValidation.jsx";

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
    const [price,setPrice] = useState(10);
    const [redirect, setRedirect] = useState(false);
    useEffect(() => {
       if (!id) {
         return;    
       }
       axios.get('/Bookks/'+id).then(response => {
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
            <h2 className="text-3xl mt-3">{text}</h2>
        );
    }
    function inputDescription(text) {
        return(
            <p className="text-gray-500 text-md">{text}</p>
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
            await axios.put('/Bookks', {
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
        <div className=" flex-c mr-5 p-2 mt-4 bg-lightblack rounded-3xl">
            <AccountNav/>
            <div className=" flex-c bg-lightblack text-1xl p-2 items-center rounded-3xl text-center"> 
                <div className=" text-primary bg-black p-5 py-3">
                    <form onSubmit={saveBook}>
                    {preInput('Title', 'title for your book, should be short and catchy as in advertisement')}
                        <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="title, for example: The White Tiger"/>
                    {preInput('ISBN', 'Unique numeric book identifier')}
                        <input type="text" value={isbn} onChange={ev => setISBN(ev.target.value)} placeholder="Required ISBN"/>
                    {preInput('Number of pages', 'Total page number')}
                        <input type="text" value={numberOfPages} onChange={ev => setTotalPageNumber(ev.target.value)} placeholder="number of total pages"/>
                    {preInput('Photos', 'more = better')}
                        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                    {preInput('Description','Description of the book')}
                        <textarea value={description} onChange={ev => setDescription(ev.target.value)} />
                    {preInput('Perks','Select all the perks of your book')}
                        <div className="flex-c grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                          <Perks selected={perks} onchange={setPerks} />
                        </div>
                    {preInput('Extra Info','Book Rules, etc')}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />
                    {preInput('Read online Books','Remember the age-limit for reading online before Secure Check-In')}
                        <div className="flex-c gap-8 grid-cols-2 md:grid-cols-4 ml-5 -p-2 py-3 px-8 mb-9 text-center">
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
                                <h3 className="mt-2 -mb-1 -p-1">Price per day</h3>
                                <input type="text" 
                                value={price} 
                                onChange={ev => setPrice(ev.target.value)} />
                            </div>
                            
                        </div> 
                        <br />

                        <div className="flex-c bg-black text-primary font-bold text-center text-4xl text-bold ml-8 mr-3">
                            <label> Required contact number </label>
                            <PhoneNumberValidation />
                        </div>  
            
                        <br/> 
                        <div className="flex-c text-4xl bg-black justify-center text-white text-center ml-6 mb-3 p-1 br-5">
                            <button className="primary my-4">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )   
}