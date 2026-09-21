import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { useAppStore } from "./store/app-store";
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { AppShell } from "./components/layout/AppShell";
import { DashboardPage } from "./pages/DashboardPage";
import { FormsPage } from "./pages/FormsPage";
import { FormBuilderPage } from "./pages/FormBuilderPage";
import { FormPreviewPage } from "./pages/FormPreviewPage";
import { ResponsesPage } from "./pages/ResponsesPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { PublicFormPage } from "./pages/PublicFormPage";
import { SuccessPage } from "./pages/SuccessPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  const initialize = useAppStore((s) => s.initialize);
  useEffect(() => { initialize(); }, [initialize]);

  return (
    <>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/app" element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="forms" element={<FormsPage />} />
          <Route path="forms/:formId" element={<FormBuilderPage />} />
          <Route path="forms/:formId/preview" element={<FormPreviewPage />} />
          <Route path="forms/:formId/responses" element={<ResponsesPage />} />
          <Route path="templates" element={<FormsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="/f/:slug" element={<PublicFormPage />} />
        <Route path="/f/:slug/success" element={<SuccessPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
