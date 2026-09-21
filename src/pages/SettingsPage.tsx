import { useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, Sun, Monitor, Trash2 } from "lucide-react";
import { useAppStore } from "../store/app-store";

export function SettingsPage() {
  const user = useAppStore((s) => s.user);
  const logout = useAppStore((s) => s.logout);
  const preferences = useAppStore((s) => s.preferences);
  const setPreferences = useAppStore((s) => s.setPreferences);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="font-semibold text-gray-900">Settings</h1>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-8 space-y-8">
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-900">Profile</h2>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Name</label>
              <input
                type="text"
                defaultValue={user?.name ?? ""}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#9B72FF] focus:outline-none focus:ring-2 focus:ring-[#9B72FF]/20"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-500">Email</label>
              <input
                type="email"
                defaultValue={user?.email ?? ""}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#9B72FF] focus:outline-none focus:ring-2 focus:ring-[#9B72FF]/20"
              />
            </div>
            <button className="rounded-lg bg-[#9B72FF] px-4 py-2 text-sm font-medium text-white hover:bg-[#8A5FE6]">
              Save changes
            </button>
          </div>
        </section>

        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-gray-900">Appearance</h2>
          <p className="mt-1 text-xs text-gray-500">Select your preferred theme.</p>
          <div className="mt-4 flex gap-3">
            {([
              { value: "light" as const, icon: Sun, label: "Light" },
              { value: "dark" as const, icon: Moon, label: "Dark" },
              { value: "system" as const, icon: Monitor, label: "System" },
            ]).map((t) => (
              <button
                key={t.value}
                onClick={() => setPreferences({ theme: t.value })}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                  preferences.theme === t.value
                    ? "border-[#9B72FF] bg-purple-50 text-[#9B72FF]"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-red-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-red-600">Danger zone</h2>
          <p className="mt-1 text-xs text-gray-500">
            Permanently delete your account and all data.
          </p>
          <div className="mt-4 flex gap-3">
            <button
              onClick={handleLogout}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Log out
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
              <Trash2 className="h-3.5 w-3.5" />
              Delete account
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
