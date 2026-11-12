import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import KycPage from './pages/KycPage.jsx';
import KybPage from './pages/KybPage.jsx';
import AlertsCasesPage from './pages/AlertsCasesPage.jsx';
import AnomalyDetectionPage from './pages/AnomalyDetectionPage.jsx';
import RulesTypologiesPage from './pages/RulesTypologiesPage.jsx';
import RealTimeScreeningPage from './pages/RealTimeScreeningPage.jsx';
import AuditableRiskPage from './pages/AuditableRiskPage.jsx';
import RiskModelsPage from './pages/RiskModelsPage.jsx';
import PricingPage from './pages/PricingPage.jsx';
import LivenessPage from './pages/LivenessPage.jsx';
import IdVerificationPage from './pages/IdVerificationPage.jsx';
import FraudPreventionPage from './pages/FraudPreventionPage.jsx';
import AmlScreeningPage from './pages/AmlScreeningPage.jsx';
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
        <Route path="/alerts-and-cases" element={<AlertsCasesPage />} />
        <Route path="/anomaly-detection" element={<AnomalyDetectionPage />} />
        <Route path="/rules-and-typologies" element={<RulesTypologiesPage />} />
        <Route path="/real-time-screening" element={<RealTimeScreeningPage />} />
        <Route path="/auditable-risk-scoring" element={<AuditableRiskPage />} />
        <Route path="/risk-models" element={<RiskModelsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/liveness" element={<LivenessPage />} />
        <Route path="/id-verification" element={<IdVerificationPage />} />
        <Route path="/fraud-prevention" element={<FraudPreventionPage />} />
        <Route path="/aml-screening" element={<AmlScreeningPage />} />
        <Route path="/reusable-kyc" element={<ReusableKycPage />} />
        <Route path="/customer-risk-assessment" element={<CustomerRiskPage />} />
        <Route path="/transaction-monitoring" element={<TransactionMonitoringPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
