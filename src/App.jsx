import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import KycPage from './pages/KycPage.jsx';
import KybPage from './pages/KybPage.jsx';
import ReusableKycPage from './pages/ReusableKycPage.jsx';
import CustomerRiskPage from './pages/CustomerRiskPage.jsx';
import TransactionMonitoringPage from './pages/TransactionMonitoringPage.jsx';

/** New pages open at the top, unless the link points to a section (#…). */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kyc" element={<KycPage />} />
        <Route path="/kyb" element={<KybPage />} />
        <Route path="/reusable-kyc" element={<ReusableKycPage />} />
        <Route path="/customer-risk-assessment" element={<CustomerRiskPage />} />
        <Route path="/transaction-monitoring" element={<TransactionMonitoringPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
