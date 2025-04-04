import { useEffect, useState } from 'react';
import { Book } from '../types/Book';

const API_URL = 'https://your-backend-url.azurewebsites.net/Books';

const emptyBook: Book = {
  bookID: 0,
  title: '',
  author: '',
  publisher: '',
  isbn: '',
  classification: '',
  category: '',
  price: 0,
  pageCount: 0,
};

const AdminBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Book>(emptyBook);

  const fetchBooks = async () => {
    const res = await fetch(`${API_URL}/AllBooks?pageHowMany=100&pageNum=1`);
    const data = await res.json();
    setBooks(data.books || data.Books); // handle casing
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewBook({
      ...newBook,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddBook = async () => {
    const res = await fetch(`${API_URL}/AddBook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBook),
    });
    if (res.ok) {
      setNewBook(emptyBook);
      fetchBooks();
    }
  };

  const handleDelete = async (id: number) => {
    const res = await fetch(`${API_URL}/DeleteBook/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      fetchBooks();
    }
  };

  return (
    <div className="container mt-4">
      <h2>📚 Admin: Manage Books</h2>

      <table className="table table-striped table-bordered mt-4">
        <thead className="table-light">
          <tr>
            <th>Title</th><th>Author</th><th>Category</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.bookID}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.category}</td>
              <td>${b.price.toFixed(2)}</td>
              <td>
                {/* Add Update functionality later */}
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(b.bookID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h4>Add New Book</h4>
      <div className="row">
        <div className="col-md-3 mb-2">
          <input name="title" className="form-control" placeholder="Title" value={newBook.title} onChange={handleInputChange} />
        </div>
        <div className="col-md-3 mb-2">
          <input name="author" className="form-control" placeholder="Author" value={newBook.author} onChange={handleInputChange} />
        </div>
        <div className="col-md-3 mb-2">
          <input name="category" className="form-control" placeholder="Category" value={newBook.category} onChange={handleInputChange} />
        </div>
        <div className="col-md-3 mb-2">
          <input name="price" className="form-control" placeholder="Price" type="number" value={newBook.price} onChange={handleInputChange} />
        </div>
      </div>
      <div className="d-flex gap-3">
        <input name="publisher" className="form-control" placeholder="Publisher" value={newBook.publisher} onChange={handleInputChange} />
        <input name="isbn" className="form-control" placeholder="ISBN" value={newBook.isbn} onChange={handleInputChange} />
        <input name="classification" className="form-control" placeholder="Classification" value={newBook.classification} onChange={handleInputChange} />
        <input name="pageCount" className="form-control" placeholder="Page Count" type="number" value={newBook.pageCount} onChange={handleInputChange} />
        <button className="btn btn-primary" onClick={handleAddBook}>Add</button>
      </div>
    </div>
  );
};

export default AdminBooksPage;