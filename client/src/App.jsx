import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CategoryProvider } from "./context/CategoryContext";
import { ProductProvider } from "./context/ProductContext";
import { SaleProvider } from "./context/SaleContext";
import { PurchaseProvider } from "./context/PurchaseContext";
import { CustomerProvider } from "./context/CustomerContext";
import { SupplierProvider } from "./context/SupplierContext";

import { ProtectedRoute } from "./routes";
import Layout from "./components/Layout";

import HomePage from "./pages/HomePage";
import { LoginPage } from "./pages/Auth/LoginPage";
import { RegisterPage } from "./pages/Auth/RegisterPage";
// Dashboard
import ProfilePage from "./pages/Auth/ProfilePage";
import Products from "./pages/Dashboard/ProductPage";
import CategoryPage from "./pages/Dashboard/CategoryPage";
import SalePage from "./pages/Dashboard/SalePage";
import PurchasePage from "./pages/Dashboard/PurchasePage";
import CustomerPage from "./pages/Dashboard/CustomerPage";
import SupplierPage from "./pages/Dashboard/SupplierPage";

function App() {
  return (
    <AuthProvider>
      <SupplierProvider>
        <CustomerProvider>
          <PurchaseProvider>
            <SaleProvider>
              <CategoryProvider>
                <ProductProvider>
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
                              element={
                                <Navigate to='/dashboard/products' replace />
                              }
                            />
                            <Route path='products' element={<Products />} />
                            <Route
                              path='categories'
                              element={<CategoryPage />}
                            />
                            <Route path='sales' element={<SalePage />} />
                            <Route
                              path='purchases'
                              element={<PurchasePage />}
                            />
                            <Route
                              path='customers'
                              element={<CustomerPage />}
                            />
                            <Route
                              path='suppliers'
                              element={<SupplierPage />}
                            />
                            <Route path='profile' element={<ProfilePage />} />
                          </Route>
                        </Route>
                      </Routes>
                    </main>
                  </BrowserRouter>
                </ProductProvider>
              </CategoryProvider>
            </SaleProvider>
          </PurchaseProvider>
        </CustomerProvider>
      </SupplierProvider>
    </AuthProvider>
  );
}

export default App;

