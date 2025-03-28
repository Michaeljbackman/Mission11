import { useState } from 'react';
import CartSummary from '../components/CartSummary';
import CategoryFilter from '../components/CategoryFilter';
import BookList from '../components/BookList';
import WelcomeBand from '../components/WelcomeBand';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      <CartSummary />
      <WelcomeBand text="Mike's Bookstore" />

      <div className="row">
        <div className="col-md-3" style={{ backgroundColor: '#f8f9fa' }}>
            <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            />
        </div>
        <div className="col-md-9">
            <BookList selectedCategories={selectedCategories} />
        </div>
        </div>
    </div>
  );
}

export default BooksPage;
