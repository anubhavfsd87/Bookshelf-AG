import {useState, useEffect} from 'react'
import axios from 'axios'


const NYTAPI = () => {
    const [books,setBooks] = useState([])

    useEffect(() => {
        const fetchBooks = async () => {
            const apiKey = import.meta.env.VITE_APP_BOOKS_API_KEY
           const res = await axios.get(
            //   `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apiKey}}`
             `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=qB07UhpMB0uZFElnA7CaUqxnkd4r7Hqf`
            )
            setBooks(res.data.results.books) 
            console.log(res.data.results.books) 
        }

        fetchBooks()
    }, [])

    return (
        <>
            <h1>Books</h1>
            <section>
                {books.map((book) => {
                    const {age_group, author, book_image, buy_links, description, price, primary_isbn10, publisher, rank, title} = book
                    return (
                        <article key={rank}>
                            <div>
                                <img src={book_image} alt={title} />
                            </div>

                            <div>
                                <h3>{title}</h3>
                                <p>{description}</p>
                                <p>{author}</p>
                            </div>

                            <ul>
                                <li>{publisher}</li>
                                <li>{primary_isbn10}</li>
                                <li>{age_group}</li>
                            </ul>

                            <ul>
                                {buy_links.map((link) => {
                                    const {name, url} = link
                                    return (
                                      <div key={name}>
                                          <li>{name}</li>
                                          <p>Buy Now:</p>
                                          <a href={url}>{name}</a>
                                      </div>
                                    )
                                })}
                            </ul>
                        </article>
                    )
                })}
            </section>
        </>
    )
}

export default NYTAPI

