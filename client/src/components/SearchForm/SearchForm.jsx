import  {useRef, useEffect} from "react";
import {FaSearch} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from '../../Context.jsx'; 
import "./SearchForm.css";

const SearchForm = () => {
  const {setSearchTerm, setResultTitle} = useGlobalContext();
  const searchText = useRef('');
  const navigate = useNavigate();

    useEffect(() => searchText.current.focus(), []);
    const handleSubmit = (e) => {
        e.preventDefault();
        let tempSearchTerm = searchText.current.value.trim();
        if((tempSearchTerm.replace(/[^\w\s]/gi,"")).length === 0){
          setSearchTerm("Web development");
          setResultTitle("Please Enter Something ...");
        } else {
          setSearchTerm(searchText.current.value);
        }
        navigate("/book");
    };

    return (
        <div className='search-form flex'>
            <div className='container flex'>
                <div className='search-form-content flex'>
                    <form className='search-form' onSubmit={handleSubmit}>
                        <div className='search-form-elem flex flex-sb bg-capitalize items-center text-Center gap-6'>
                            <input type = "text" className='form-control text-primary text-center' placeholder='Search Any Book' ref = {searchText} />
                            <button type = "submit" className='flex flex-c' onClick={handleSubmit}>
                                <FaSearch className='text-primary' size = {38} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SearchForm