import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap } from "lucide-react";
import { useAppStore } from "../store/app-store";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useAppStore((s) => s.setUser);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: crypto.randomUUID(),
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
    navigate("/app");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#9B72FF]">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">Formzo</span>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-center text-xl font-semibold">Log in to Formzo</h1>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#9B72FF] focus:outline-none focus:ring-2 focus:ring-[#9B72FF]/20"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#9B72FF] focus:outline-none focus:ring-2 focus:ring-[#9B72FF]/20"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-[#9B72FF] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#8A5FE6] focus:outline-none focus:ring-2 focus:ring-[#9B72FF]/20"
            >
              Log in
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-[#9B72FF] hover:text-[#8A5FE6]">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
