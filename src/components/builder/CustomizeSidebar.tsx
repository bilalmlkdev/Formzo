import { useState } from "react";
import {
  X,
  HelpCircle,
  Upload,
  ChevronDown,
  Palette,
  LayoutTemplate,
  ImageIcon,
  Monitor,
  Type,
} from "lucide-react";

interface CustomizeSidebarProps {
  onClose: () => void;
}

interface ColorPickerProps {
  label: string;
  defaultValue?: string;
  helpText?: string;
}

function ColorPicker({ label, defaultValue = "#000000", helpText }: ColorPickerProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <span className="text-[13px] text-gray-700">{label}</span>
        {helpText && (
          <button className="text-gray-400 hover:text-gray-600 transition-colors">
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-20 border border-gray-200 rounded-sm px-2 py-1 text-xs text-gray-600 outline-none focus:border-[#9B72FF] transition-colors font-mono"
        />
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-7 h-7 rounded-md border border-gray-200 cursor-pointer appearance-none bg-transparent [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded-sm [&::-webkit-color-swatch]:border-none"
          />
        </div>
      </div>
    </div>
  );
}

interface SectionHeadingProps {
  children: React.ReactNode;
  badge?: React.ReactNode;
}

function SectionHeading({ children, badge }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-2">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        {children}
      </h3>
      {badge}
    </div>
  );
}

function ProBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-2 py-0.5 text-[10px] font-bold text-white leading-none">
      Pro
    </span>
  );
}

interface UploadAreaProps {
  label: string;
}

function UploadArea({ label }: UploadAreaProps) {
  return (
    <div className="space-y-2">
      <button className="w-full border-2 border-dashed border-gray-200 rounded-lg py-6 flex flex-col items-center gap-2 text-gray-400 hover:border-[#9B72FF] hover:text-[#9B72FF] hover:bg-purple-50/50 transition-all">
        <Upload className="w-5 h-5" />
        <span className="text-xs font-medium">Upload {label}</span>
      </button>
    </div>
  );
}

export function CustomizeSidebar({ onClose }: CustomizeSidebarProps) {
  const [theme, setTheme] = useState("light");
  const [font, setFont] = useState("Inter");

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/20 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 bottom-0 w-[380px] bg-white border-l border-gray-200 z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-gray-100 shrink-0">
          <h2 className="text-sm font-semibold text-gray-900">Customize</h2>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 transition-colors">
              <HelpCircle className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-gray-100 text-gray-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-5 py-4 space-y-6">
            {/* Theme */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500">Theme</label>
              <div className="relative">
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full appearance-none border border-gray-200 rounded-sm px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#9B72FF] transition-colors bg-white cursor-pointer pr-8"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Font */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-500">Font</label>
              <div className="relative">
                <select
                  value={font}
                  onChange={(e) => setFont(e.target.value)}
                  className="w-full appearance-none border border-gray-200 rounded-sm px-3 py-2 text-sm text-gray-700 outline-none focus:border-[#9B72FF] transition-colors bg-white cursor-pointer pr-8"
                >
                  <option value="Inter">Inter</option>
                  <option value="Arial">Arial</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Courier New">Courier New</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-3">
              <SectionHeading>
                <Palette className="w-3.5 h-3.5 text-gray-400" />
                Colors
              </SectionHeading>
              <div className="space-y-3 pl-0.5">
                <ColorPicker label="Background" defaultValue="#ffffff" />
                <ColorPicker label="Text" defaultValue="#000000" />
                <ColorPicker label="Button background" defaultValue="#9B72FF" />
                <ColorPicker label="Button text" defaultValue="#ffffff" />
                <ColorPicker label="Accent" defaultValue="#9B72FF" helpText="?" />
              </div>
            </div>

            {/* Advanced (Pro) */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <SectionHeading>Advanced</SectionHeading>
                <ProBadge />
              </div>
            </div>

            {/* Layout */}
            <div className="space-y-3">
              <SectionHeading>
                <LayoutTemplate className="w-3.5 h-3.5 text-gray-400" />
                Layout
              </SectionHeading>
              <div className="space-y-3 pl-0.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-gray-700">Page width</span>
                  <input
                    type="text"
                    defaultValue="700px"
                    className="w-24 border border-gray-200 rounded-sm px-2 py-1 text-xs text-gray-600 outline-none focus:border-[#9B72FF] transition-colors text-right"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-gray-700">Base font size</span>
                  <input
                    type="text"
                    defaultValue="16px"
                    className="w-24 border border-gray-200 rounded-sm px-2 py-1 text-xs text-gray-600 outline-none focus:border-[#9B72FF] transition-colors text-right"
                  />
                </div>
              </div>
            </div>

            {/* Logo */}
            <div className="space-y-3">
              <SectionHeading>
                <ImageIcon className="w-3.5 h-3.5 text-gray-400" />
                Logo
              </SectionHeading>
              <div className="pl-0.5">
                <UploadArea label="logo" />
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <div className="space-y-1">
                    <span className="text-[11px] text-gray-500">Width</span>
                    <input
                      type="text"
                      defaultValue="80px"
                      className="w-full border border-gray-200 rounded-sm px-2 py-1 text-xs text-gray-600 outline-none focus:border-[#9B72FF] transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] text-gray-500">Height</span>
                    <input
                      type="text"
                      defaultValue="auto"
                      className="w-full border border-gray-200 rounded-sm px-2 py-1 text-xs text-gray-600 outline-none focus:border-[#9B72FF] transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] text-gray-500">Corner radius</span>
                    <input
                      type="text"
                      defaultValue="0px"
                      className="w-full border border-gray-200 rounded-sm px-2 py-1 text-xs text-gray-600 outline-none focus:border-[#9B72FF] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Cover */}
            <div className="space-y-3">
              <SectionHeading>
                <Monitor className="w-3.5 h-3.5 text-gray-400" />
                Cover
              </SectionHeading>
              <div className="pl-0.5">
                <UploadArea label="cover image" />
                <div className="mt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] text-gray-700">Height</span>
                    <input
                      type="text"
                      defaultValue="25%"
                      className="w-24 border border-gray-200 rounded-sm px-2 py-1 text-xs text-gray-600 outline-none focus:border-[#9B72FF] transition-colors text-right"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-3">
              <SectionHeading>
                <Type className="w-3.5 h-3.5 text-gray-400" />
                Inputs
              </SectionHeading>
              <div className="space-y-3 pl-0.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Type className="w-3.5 h-3.5 text-gray-400" />
                    <span className="text-[13px] text-gray-700">Width</span>
                  </div>
                  <input
                    type="text"
                    defaultValue="320px"
                    className="w-24 border border-gray-200 rounded-sm px-2 py-1 text-xs text-gray-600 outline-none focus:border-[#9B72FF] transition-colors text-right"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-3.5 flex items-center justify-center">
                      <div className="w-3 h-2.5 border border-gray-400 rounded-[2px]" />
                    </div>
                    <span className="text-[13px] text-gray-700">Height</span>
                  </div>
                  <input
                    type="text"
                    defaultValue="36px"
                    className="w-24 border border-gray-200 rounded-sm px-2 py-1 text-xs text-gray-600 outline-none focus:border-[#9B72FF] transition-colors text-right"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
