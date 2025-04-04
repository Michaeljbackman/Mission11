import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useCart } from '../context/CartContext';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `category=${encodeURIComponent(cat)}`)
        .join('&');

        const response = await fetch(
          `https://bookstore-backman-backend-eta8anatd5cxbuh9.eastus-01.azurewebsites.net/Books/AllBooks?pageHowMany=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
        );
        
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
    };

    fetchBooks();
  }, [pageSize, pageNum, selectedCategories]);

  useEffect(() => {
    setTotalPages(Math.ceil(totalItems / pageSize));
  }, [totalItems, pageSize]);

  return (
    <>
      <h3 className="mb-3">Available Books</h3>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.bookID}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>${book.price.toFixed(2)}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() =>
                      addToCart({
                        bookId: book.bookID,
                        title: book.title,
                        price: book.price,
                        quantity: 1,
                      })
                    }
                  >
                    Add to Cart
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          <button
            disabled={pageNum === 1}
            onClick={() => setPageNum(pageNum - 1)}
            className="btn btn-outline-primary me-2"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setPageNum(index + 1)}
              disabled={pageNum === index + 1}
              className="btn btn-outline-secondary me-1"
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={pageNum === totalPages}
            onClick={() => setPageNum(pageNum + 1)}
            className="btn btn-outline-primary ms-2"
          >
            Next
          </button>
        </div>
        <div>
          <label className="me-2">Results Per Page:</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPageNum(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default BookList;
