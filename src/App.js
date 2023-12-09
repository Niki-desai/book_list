import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetails from './components/BookDetails';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul className="p-7 text-start text-2xl bg-gradient-to-br from-blue-500 to-pink-500 text-white ">
            <li>
              <Link to="/">Welcome to Your Library</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
