import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../lib/themes.js";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold">Themes</h1>
          <p className="text-sm text-base-content/70">
            Choose a theme for your app
          </p>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {THEMES.map((themeName) => (
            <button
              key={themeName}
              className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                theme === themeName ? "bg-base-300" : "hover:bg-base-300"
              }`}
              onClick={() => setTheme(themeName)}
            >
              <div
                className="relative h-8 w-full rounded-md overflow-hidden"
                data-theme={themeName}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-{11px} font-medium truncate w-full text-center capitalize">
                {themeName}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
