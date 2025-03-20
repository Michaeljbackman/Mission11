import { useEffect, useState } from 'react';
import { Book } from '../types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalBooks, setTotalBooks] = useState(0);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `http://localhost:4000/Books/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}&sort=title&order=${sortOrder}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalBooks(data.totalNumBooks);
    };

    fetchBooks();
  }, [pageNum, pageSize, sortOrder]);

  const totalPages = Math.ceil(totalBooks / pageSize);

  return (
    <>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h2>Bookstore Inventory</h2>
        <div>
          <label className="me-2">Results Per Page: </label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNum(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th
              style={{ cursor: 'pointer' }}
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              Title {sortOrder === 'asc' ? '↑' : '↓'}
            </th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
            <th>Category</th>
            <th>Pages</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.bookID}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.publisher}</td>
              <td>{b.isbn}</td>
              <td>{b.category}</td>
              <td>{b.pageCount}</td>
              <td>${b.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn btn-primary"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        <div>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              className={`btn mx-1 ${num === pageNum ? 'btn-secondary' : 'btn-outline-secondary'}`}
              onClick={() => setPageNum(num)}
            >
              {num}
            </button>
          ))}
        </div>

        <button
          className="btn btn-primary"
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default BookList;