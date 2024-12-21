import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import CategoryPage from './pages/category-pages/CategoryPage';
import CartPage from './pages/CartPage';
import UserDetails from './pages/UserDetails';
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
import OrderSummaryPage from './pages/order-pages/OrderSummaryPage';
import CardPaymentPage from './pages/payment-pages/CardPaymentPage';
import USSDPaymentPage from './pages/payment-pages/USSDPaymentPage';
import USSDInstructionPage from './pages/payment-pages/USSDInstructionPage';
import BankTransferPage from './pages/payment-pages/BankTransferPayment';
import AboutUsPage from './pages/footer-pages/AboutUsPage';
import SavedProductPage from './pages/user-account/SavedProductPage';
import ProfilePage from './pages/user-account/AccountPage';
import OrdersPage from './pages/user-account/OrdersPage';
import AccountPage from './pages/user-account/AccountPage';
import ProductHistoryPage from './pages/user-account/ProductHistoryPage';
import UserOverviewPage from './pages/user-account/UserOverviewPage';
import OrderDetailsPage from './pages/user-account/OrderDetailsPage';
import ProductPage from './pages/product-pages/ProductPage';
import HomePage from './pages/home/HomePage';
import SalePage from './pages/category-pages/SalePage';
import AuthSwitchPage from './pages/auth/AuthSwitchPage';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import EmailSentPage from './pages/auth/EmailSentPage';
import ResetPassword from './pages/auth/ResetPassword';
import axios from 'axios';
import ForgotPassword from './pages/auth/ForgotPassword';
import SignUpVerification from './pages/auth/SignUpVerification';


function App() { 
 
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<HomePage />}/>
            <Route path="home-page" element={<HomePage />} />
            <Route path="product-page" element={<ProductPage />} /> 
            <Route path="category-page" element={<CategoryPage />} />
            <Route path="cart-page" element={<CartPage />} /> 
            <Route path="sale-page" element={<SalePage />} /> 
            <Route path="user-details-page" element={<UserDetails />} /> 
            <Route path="order-summary-page" element={<OrderSummaryPage />} />
            <Route path="card-payment-page" element={<CardPaymentPage />} />
            <Route path="ussd-payment-page" element={<USSDPaymentPage />} />
            <Route path="ussd-instruction-page" element={<USSDInstructionPage />} />
            <Route path="bank-transfer-page" element={<BankTransferPage />} />
            
            <Route path="signup" element={<SignUpPage />} />
            <Route path="sign-up-email-verification/:token" element={<SignUpVerification/>} />
            <Route path="login" element={<LoginPage />} />
            <Route path="email-sent/:userId" element={<EmailSentPage />} />
            <Route path="forget-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
      
            {/* Auth routes */}
            {/* <Route path="auth/*" element={<AuthSwitchPage />}>
                <Route index element={<LoginPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignUpPage />} />
            </Route> */}

            <Route path="account" element={<AccountPage />}>
              <Route index element={<UserOverviewPage />} />
              <Route path="saved-product" element={<SavedProductPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="product-history" element={<ProductHistoryPage />} />
              <Route path="user-overview" element={<UserOverviewPage />} />
              <Route path="order-details" element={<OrderDetailsPage />} />
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



        
      </Routes>

    </Router>
  );
}

export default App;
