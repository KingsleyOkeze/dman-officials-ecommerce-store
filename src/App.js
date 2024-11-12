import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './dashboard/dashboard';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import AccountDetails from './pages/AccountDetails';
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

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<HomePage />}/>
            <Route path="home-page" element={<HomePage />} />
            <Route path="category-page" element={<CategoryPage />} />
            <Route path="cart-page" element={<CartPage />} /> 
            <Route path="account-page" element={<AccountDetails />} /> 
            <Route path="order-summary-page" element={<OrderSummaryPage />} />
            <Route path="card-payment-page" element={<CardPaymentPage />} />
            <Route path="ussd-payment-page" element={<USSDPaymentPage />} />
            <Route path="ussd-instruction-page" element={<USSDInstructionPage />} />
            <Route path="bank-transfer-page" element={<BankTransferPage />} />
            <Route path="faq-page" element={<FaqPage />} />
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
