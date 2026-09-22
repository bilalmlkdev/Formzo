import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../store/app-store";
import { generateId } from "../lib/utils";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const setUser = useAppStore((s) => s.setUser);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: generateId(),
      name: email.split("@")[0],
      email,
      plan: "free",
      createdAt: new Date().toISOString(),
      preferences: {
        theme: "system",
        language: "en",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        emailNotifications: true,
        compactMode: false,
      },
    });
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8">
          <Link to="/">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2L18.5 13.5L30 16L18.5 18.5L16 30L13.5 18.5L2 16L13.5 13.5L16 2Z" fill="#9CA3AF"/>
            </svg>
          </Link>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Create your Formzo account</h1>
        <p className="mt-2 text-sm text-gray-500">Get started with the simplest way to create forms.</p>

        {/* Social buttons */}
        <div className="mt-6 space-y-3">
          <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
            Continue with Google
          </button>
          <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor"><path d="M14.94 9.46c-.03-2.15 1.75-3.18 1.83-3.23-1-1.46-2.55-1.66-3.1-1.68-1.32-.13-2.58.78-3.25.78-.67 0-1.7-.76-2.8-.74-1.44.02-2.77.84-3.51 2.13-1.5 2.6-.38 6.46 1.07 8.57.71 1.03 1.56 2.19 2.68 2.15 1.08-.04 1.49-.7 2.8-.7 1.31 0 1.67.7 2.8.68 1.16-.02 1.89-1.05 2.6-2.09.81-1.19 1.14-2.34 1.16-2.4-.03-.01-2.23-.86-2.26-3.41l-.12-.62zM12.73 3.16c.59-.72 1-1.73.89-2.73-.86.04-1.9.57-2.52 1.3-.54.64-1.02 1.66-.89 2.65.96.07 1.94-.49 2.52-1.22z"/></svg>
            Continue with Apple
          </button>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200" />
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-gray-900">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
          >
            Continue
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          By signing up, you agree to our{" "}
          <a href="#" className="underline text-gray-900">Terms</a> &{" "}
          <a href="#" className="underline text-gray-900">Privacy</a>.
        </p>
        <p className="mt-2 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-gray-900 underline">Log in</Link>.
        </p>

        {/* Help button */}
        <div className="fixed bottom-4 right-4">
          <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 hover:text-gray-600 shadow-sm transition-colors text-sm">
            ?
          </button>
        </div>
      </div>
    </div>
  );
}
