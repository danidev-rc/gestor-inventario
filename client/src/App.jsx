import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./routes";

import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/Auth/LoginPage";
import { RegisterPage } from "./pages/Auth/RegisterPage";
import Products from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='dashboard' element={<Layout />}>
                <Route
                  index
                  element={<Navigate to='/dashboard/products' replace />}
                />
                <Route path='products' element={<Products />} />
                <Route path='categories' element={<CategoryPage />} />
                <Route path='sales' element={<div>Sales Page</div>} />
                <Route path='purchases' element={<div>Purchases Page</div>} />
                <Route path='customers' element={<div>Customers Page</div>} />
                <Route path='suppliers' element={<div>Suppliers Page</div>} />
              </Route>
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

