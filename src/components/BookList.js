import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 3;

    useEffect(() => {
        fetch('https://www.googleapis.com/books/v1/volumes?q=vue.js')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                const modifiedBooks = data.items.map(book => ({
                    ...book,
                    shortDescription: truncateDescription(book.volumeInfo.description || 'N/A', 20)
                }));
                setBooks(modifiedBooks);
            })
            .catch(error => {
                setError('Failed to fetch data');
            });
    }, []);

    const truncateDescription = (description, wordCount) => {
        const words = description.split(' ');
        const truncated = words.slice(0, wordCount).join(' ');
        return truncated + (words.length > wordCount ? '...' : '');
    };

    const handleCategoryChange = e => {
        setCategoryFilter(e.target.value);
        setCurrentPage(1);
    };

    const filteredBooks = categoryFilter
        ? books.filter(book => book.volumeInfo.categories && book.volumeInfo.categories.includes(categoryFilter))
        : books;

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = pageNumber => setCurrentPage(pageNumber);


    return (
        <div className="flex justify-center items-center min-h-screen bg-purple-200 text-white">
            <div className="max-w-3xl w-full">
                <h1 className="text-4xl font-bold text-center mb-8 mt-4 text-fuchsia-600"><Link to="/" className="block">Book List for Vue.js</Link></h1>


                <select value={categoryFilter} onChange={handleCategoryChange} className="p-2 bg-fuchsia-500 rounded-md mb-4">
                    <option value="">Filter by Category</option>
                    <option value="Computers">Computers</option>
                    <option value="Juvenile Nonfiction">Juvenile Nonfiction</option>
                </select>


                {error && <p>{error}</p>}
                <div className="max-w-3xl w-full">
                    {currentBooks.map(book => (
                        <Link to={`/book/${book.id}`} key={book.id} className="block">
                            <div className="bg-white shadow-md rounded-md mb-4 p-4 flex h-60 mx-2">
                                <div className="w-1/4 h-3/4">
                                    <img src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'} alt={book.volumeInfo.title} className="h-full w-full rounded-md" />
                                </div>
                                <div className="w-3/4 pl-4">
                                    <p className="text-xl font-bold text-fuchsia-600 my-2">{book.volumeInfo.title}</p>
                                    <p className="text-sm text-black font-semibold my-2">Authors: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'N/A'}</p>
                                    <p className="text-sm text-black font-semibold">Description: {book.shortDescription}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="flex justify-center">
                    <div className="flex p-3 bg-fuchsia-400 w-full justify-around text-xl font-extrabold ">
                        {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, i) => (
                            <button key={i} onClick={() => paginate(i + 1)}>
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookList;
