import { BrowserRouter, Route, Routes } from 'react-router'
import CartProvider from './context/CartProvider.jsx'
import Layout from './components/Layout.jsx'
import CartPage from './pages/CartPage.jsx'
import HomePage from './pages/HomePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import VendorPage from './pages/VendorPage.jsx'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/vendor/:id" element={<VendorPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
