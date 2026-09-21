import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppStore } from "../store/app-store";
import { useFormStore } from "../store/form-store";
import { createBlankForm } from "../types/form";
import { generateId } from "../lib/utils";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const setUser = useAppStore((s) => s.setUser);
  const createForm = useFormStore((s) => s.createForm);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      id: generateId(),
      name: email.split("@")[0],
      email,
      plan: "free" as const,
      createdAt: new Date().toISOString(),
      preferences: {
        theme: "system" as const,
        language: "en",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        emailNotifications: true,
        compactMode: false,
      },
    };
    setUser(user);
    const blankForm = createBlankForm();
    createForm(blankForm);
    navigate("/app");
  };

  const handleSocialSignup = (provider: string) => {
    const user = {
      id: generateId(),
      name: `${provider} User`,
      email: provider === "Google" ? "user@gmail.com" : "user@icloud.com",
      plan: "free" as const,
      createdAt: new Date().toISOString(),
      preferences: {
        theme: "system" as const,
        language: "en",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        emailNotifications: true,
        compactMode: false,
      },
    };
    setUser(user);
    const blankForm = createBlankForm();
    createForm(blankForm);
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-md px-4 pt-20 pb-24">
        <Link to="/" className="mb-10 flex justify-center" aria-label="Home">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L18.5 13.5L30 16L18.5 18.5L16 30L13.5 18.5L2 16L13.5 13.5L16 2Z" fill="#9CA3AF" />
          </svg>
        </Link>

        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">Create your Formzo account</h1>
        <p className="mb-8 text-center text-sm text-gray-500">
          Get started with the simplest way to create forms.
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleSocialSignup("Google")}
            className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
              <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
              <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
              <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignup("Apple")}
            className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.545 2.907a13.2 13.2 0 00-3.257-1.011.05.05 0 00-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 00-3.658 0 8.26 8.26 0 00-.412-.833.052.052 0 00-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 00-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 003.995 2.02.05.05 0 00.056-.019c.308-.42.582-.863.818-1.329a.05.05 0 00-.01-.059.05.05 0 00-.058-.011 8.96 8.96 0 01-1.296.444.05.05 0 00-.032.067c.153.443.336.877.55 1.288a.05.05 0 00.063.023 11.58 11.58 0 003.13-1.683.05.05 0 00.01-.036c.38-2.32.705-4.71.816-7.141a.05.05 0 00-.027-.047zM6.618 10.46c-1.044 0-1.896-.96-1.896-2.144 0-1.184.84-2.143 1.896-2.143 1.06 0 1.908.97 1.896 2.144 0 1.183-.844 2.143-1.896 2.143zm6.768 0c-1.044 0-1.896-.96-1.896-2.144 0-1.184.84-2.143 1.896-2.143 1.06 0 1.908.97 1.896 2.144 0 1.183-.836 2.143-1.896 2.143z" />
            </svg>
            Continue with Apple
          </button>
        </div>

        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-400" />
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-bold text-gray-900">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-black px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Continue
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          By signing up, you agree to our{" "}
          <Link to="/" className="font-medium text-gray-900 underline underline-offset-4 hover:text-gray-600">
            Terms
          </Link>{" "}
          &{" "}
          <Link to="/" className="font-medium text-gray-900 underline underline-offset-4 hover:text-gray-600">
            Privacy
          </Link>
          .
        </p>

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-gray-900 underline underline-offset-4 hover:text-gray-600">
            Log in
          </Link>
        </p>
      </div>

      <div className="fixed bottom-6 right-6">
        <button
          type="button"
          onClick={() => alert("Help is not available yet.")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-500 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-700"
          aria-label="Help"
        >
          ?
        </button>
      </div>
    </div>
  );
}
