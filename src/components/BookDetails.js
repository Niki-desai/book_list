// BookDetails.js

import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then(data => {
                setBook(data);
            })
            .catch(error => {
                setError('Failed to fetch data');
            });
    }, [id]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-purple-100 text-white">
            <div className="max-w-3xl w-full ">
                {book ? (
                    <div>
                        <Link to="/" className="block mb-4 text-fuchsia-600 text-lg font-semibold mt-3">
                            &lt; Back to Book List
                        </Link>
                        <div className="bg-fuchsia-200 shadow-xl rounded-md mb-4 p-4 items-center  border-8 border-fuchsia-300   ">
                            <div className="w-8/12 items-center mb-10 bg-fuchsia-200 border-fuchsia-300 border-4 mx-auto ">
                                <img
                                    src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                                    alt={book.volumeInfo.title}
                                    className="w-full rounded-md border border-black "
                                />
                            </div>
                            <p className="text-2xl font-bold text-fuchsia-600 mb-5 bg-purple-300 p-3">{book.volumeInfo.title}</p>
                            <p className="text-lg text-black font-semibold mb-5">
                                Authors: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'N/A'}
                            </p>
                            <div
                                className="text-base text-black mb-4"
                                dangerouslySetInnerHTML={{ __html: book.volumeInfo.description || 'No description available.' }}
                            />
                            {/* Add any other details here */}
                        </div>
                    </div>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default BookDetails;
