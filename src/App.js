import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import CategoryPage from './pages/category-pages/CategoryPage';
import UserDetails from './pages/user-account/UserDetails';
import FaqPage from './pages/footer-pages/FaqPage';
import ShippingPolicyPage from './pages/footer-pages/ShippingPolicyPage';
import ReturnsPolicyPage from './pages/footer-pages/ReturnsPolicyPage';
import ContactPage from './pages/footer-pages/ContactPage';
import PaymentPolicyPage from './pages/footer-pages/PaymentPolicyPage';
import DisclaimerPage from './pages/footer-pages/DisclaimerPage';
import CookiePolicyPage from './pages/footer-pages/CookiePolicyPage';
import WarrantyAndReturnsPolicyPage from './pages/footer-pages/WarrantAndReturnPolicyPage';
import TermsOfUsePage from './pages/footer-pages/TermsOfUsePage';
import PrivacyPolicyPage from './pages/footer-pages/PrivacyPolicyPage';
import OrderConfirmationPage from './pages/order-pages/OrderConfirmationPage';
import CardPaymentPage from './pages/payment-pages/CardPaymentPage';
import USSDPaymentPage from './pages/payment-pages/USSDPaymentPage';
import USSDInstructionPage from './pages/payment-pages/USSDInstructionPage';
import BankTransferPage from './pages/payment-pages/BankTransferPayment';
import AboutUsPage from './pages/footer-pages/AboutUsPage';
import SavedProductPage from './pages/user-account/SavedProductPage';
// import OrdersPage from './pages/user-account/AllOrdersPage';
import AccountPage from './pages/user-account/AccountPage';
import ProductHistoryPage from './pages/user-account/OrderTrackingPage';
import UserOverviewPage from './pages/user-account/UserOverviewPage';
import PurchaseDetailsPage from './pages/user-account/PurchaseDetailsPage';
import ProductPage from './pages/product-pages/ProductPage';
import HomePage from './pages/home/HomePage';
import SalePage from './pages/category-pages/SalePage';
import EmailSentPage from './pages/auth/EmailSentPage';
import ResetPassword from './pages/auth/ResetPassword';
import axios from 'axios';
import ForgotPassword from './pages/auth/ForgotPassword';
import SignUpVerification from './pages/auth/SignUpVerification';
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './utils/ProtectedRoute';
import OrderTrackingPage from './pages/user-account/OrderTrackingPage';
import OrderReviewPage from './pages/order-pages/OrderReviewPage';
import AllOrdersPage from './pages/user-account/AllOrdersPage';
import { AuthProvider } from './contexts/AuthContext';
import { AlertProvider } from './contexts/AlertContext';


function App() { 
 
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

  return (
    <Router>
      <AuthProvider>
      <AlertProvider>
      <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<HomePage />}/>
            <Route path="home-page" element={<HomePage />} />
            <Route path="product-page/:productId" element={<ProductPage />} /> 
            <Route path="/category-page/:category/:subCategory?" element={<CategoryPage />} />
            <Route path="sale-page" element={<SalePage />} /> 
            <Route path="user-details-page" element={<UserDetails />} /> 
            <Route path="order-confirmation-page" element={<OrderConfirmationPage />} />
            <Route path="order-review/:orderId" element={<OrderReviewPage />} />
            <Route path="card-payment-page" element={<CardPaymentPage />} />
            <Route path="ussd-payment-page" element={<USSDPaymentPage />} />
            <Route path="ussd-instruction-page" element={<USSDInstructionPage />} />
            <Route path="bank-transfer-page" element={<BankTransferPage />} />
            
            <Route path="sign-up-email-verification/:token" element={<SignUpVerification/>} />
            <Route path="email-sent/:userId" element={<EmailSentPage />} />
            <Route path="forget-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
      
             {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute allowedRoles={['Customer']} />}>
                <Route path="account" element={<AccountPage />}>
                    <Route index element={<UserOverviewPage />} />
                    <Route path="saved-product" element={<SavedProductPage />} />
                    <Route path="all-orders" element={<AllOrdersPage />} />
                    <Route path="order-tracking/:orderId" element={<OrderTrackingPage />} />
                    <Route path="user-overview" element={<UserOverviewPage />} />
                    <Route path="user-details" element={<UserDetails />} />
                    <Route path="purchase-details/:orderId" element={<PurchaseDetailsPage />} />
                </Route>
            </Route>

            <Route path="faq-page" element={<FaqPage />} />
            <Route path="about-us-page" element={<AboutUsPage />} />
            <Route path="shipping-policy" element={<ShippingPolicyPage />} />
            <Route path="returns-policy" element={<ReturnsPolicyPage />} />
            <Route path="contact-policy" element={<ContactPage />} />
            <Route path="payment-policy" element={<PaymentPolicyPage />} />
            <Route path="disclaimer-page" element={<DisclaimerPage />} />
            <Route path="cookie-policy" element={<CookiePolicyPage />} />
            <Route path="warrant-and-return-policy" element={<WarrantyAndReturnsPolicyPage />} />
            <Route path="terms-of-use-page" element={<TermsOfUsePage />} />
            <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          </Route>

          {/* Fallback Route for Unknown Paths */}
          <Route path="*" element={<NotFoundPage />} /> {/* This will catch all unknown routes and show the NotFoundPage */}
      </Routes>
      </AlertProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
