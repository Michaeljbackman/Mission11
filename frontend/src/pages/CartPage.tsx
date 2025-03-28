import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li key={item.bookId} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.title}</strong> (x{item.quantity})
                </div>
                <div>
                  ${item.price.toFixed(2)} each |
                  <span style={{ marginLeft: '6px' }}>
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button className="btn btn-sm btn-danger ms-3" onClick={() => removeFromCart(item.bookId)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h4>Total: ${total.toFixed(2)}</h4>
          <button className="btn btn-primary me-2">Checkout</button>
          <button className="btn btn-secondary" onClick={() => navigate('/books')}>
            Continue Browsing
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
