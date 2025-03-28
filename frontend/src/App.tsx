import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BooksPage from './pages/BooksPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/books" element={<BooksPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<BooksPage />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;
