import { useEffect, useState } from 'react';

interface CategoryFilterProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}

const CategoryFilter = ({
  selectedCategories,
  setSelectedCategories,
}: CategoryFilterProps) => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://bookstore-backman-backend-eta8anatd5cxbuh9.eastus-01.azurewebsites.net/Books/GetCategories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const updated = selectedCategories.includes(value)
      ? selectedCategories.filter((cat) => cat !== value)
      : [...selectedCategories, value];
    setSelectedCategories(updated);
  };

  return (
    <div className="card p-3 shadow-sm">
      <h5 className="mb-3">Categories</h5>
      {categories.map((cat) => (
        <div key={cat} className="form-check">
          <input
            type="checkbox"
            value={cat}
            checked={selectedCategories.includes(cat)}
            onChange={handleCheckboxChange}
            id={cat}
            className="form-check-input"
          />
          <label htmlFor={cat} className="form-check-label">
            {cat}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
