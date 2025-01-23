import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WatchList from './pages/WatchList';
import WatchDetail from './pages/WatchDetail';
import { CartProvider } from './context/CartContext';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
// ... other imports ...

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <nav>
            {/* Your navigation components */}
          </nav>
          
          <Routes>
            <Route path="/watches" element={<WatchList />} />
            <Route path="/watch/:id" element={<WatchDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* ... other routes ... */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App; 