import { FormField } from "../../types/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { cn } from "../../lib/utils";

interface FormRendererProps {
  fields: FormField[];
  mode?: "builder" | "preview" | "public";
  values?: Record<string, any>;
  onChange?: (fieldId: string, value: any) => void;
  errors?: Record<string, string>;
}

export function FormRenderer({
  fields,
  mode = "builder",
  values = {},
  onChange,
  errors = {},
}: FormRendererProps) {
  const handleChange = (fieldId: string, value: any) => {
    onChange?.(fieldId, value);
  };

  const renderField = (field: FormField) => {
    const value = values[field.id] ?? "";
    const error = errors[field.id];
    const isInteractive = mode === "public" || mode === "preview";

    switch (field.type) {
      case "shortText":
      case "email":
      case "number":
      case "phone":
      case "url":
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            <Input
              type={field.type === "phone" ? "tel" : field.type === "shortText" ? "text" : field.type}
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              disabled={!isInteractive}
              className={cn(error && "border-destructive")}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case "longText":
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            <Textarea
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              disabled={!isInteractive}
              className={cn(error && "border-destructive")}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case "select":
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            <select
              value={value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              disabled={!isInteractive}
              className={cn(
                "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                error && "border-destructive"
              )}
            >
              <option value="">{field.placeholder || "Select an option"}</option>
              {field.config?.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case "radio":
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            <div className="space-y-2">
              {field.config?.options?.map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={field.id}
                    value={opt.value}
                    checked={value === opt.value}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    disabled={!isInteractive}
                    className="h-4 w-4 border-primary text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case "checkbox":
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            <div className="space-y-2">
              {field.config?.options?.map((opt) => {
                const isChecked = Array.isArray(value) && value.includes(opt.value);
                return (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      value={opt.value}
                      checked={isChecked}
                      onChange={(e) => {
                        const current = Array.isArray(value) ? value : [];
                        const newValue = e.target.checked
                          ? [...current, opt.value]
                          : current.filter((v: string) => v !== opt.value);
                        handleChange(field.id, newValue);
                      }}
                      disabled={!isInteractive}
                      className="h-4 w-4 rounded border-primary text-primary focus:ring-primary"
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                );
              })}
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case "yesNo":
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            <div className="flex gap-2">
              <button type="button" disabled className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-400">Yes</button>
              <button type="button" disabled className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-400">No</button>
            </div>
          </div>
        );

      case "date":
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            <Input
              type="date"
              value={value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              disabled={!isInteractive}
              className={cn(error && "border-destructive")}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case "time":
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            <Input
              type="time"
              value={value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              disabled={!isInteractive}
              className={cn(error && "border-destructive")}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case "dateTime":
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            <Input
              type="datetime-local"
              value={value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              disabled={!isInteractive}
              className={cn(error && "border-destructive")}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case "rating":
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            <div className="flex gap-1">
              {Array.from({ length: field.config?.scale ?? 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => isInteractive && handleChange(field.id, i + 1)}
                  disabled={!isInteractive}
                  className={cn(
                    "h-8 w-8 rounded-md border transition-colors",
                    value >= i + 1
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background hover:bg-accent"
                  )}
                >
                  {field.config?.ratingType === "numbers" ? i + 1 : "★"}
                </button>
              ))}
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case "slider":
        return (
          <div key={field.id} className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            <Input
              type="range"
              min={field.config?.min ?? 0}
              max={field.config?.max ?? 100}
              step={field.config?.step ?? 1}
              value={value}
              onChange={(e) => handleChange(field.id, e.target.value)}
              disabled={!isInteractive}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        );

      case "heading":
        return (
          <div key={field.id} className="space-y-1">
            <h2 className="text-xl font-semibold">{field.label}</h2>
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
          </div>
        );

      case "paragraph":
        return (
          <div key={field.id} className="space-y-1">
            <p className="text-sm text-muted-foreground">{field.label}</p>
          </div>
        );

      case "divider":
        return <hr key={field.id} className="my-4 border-t" />;

      case "spacer":
        return <div key={field.id} className="h-4" />;

      case "image":
        return (
          <div key={field.id} className="space-y-2">
            <Label>{field.label}</Label>
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            <div className="border rounded-md p-2">
              <img
                src={value || "https://placehold.co/600x400"}
                alt={field.label}
                className="w-full h-auto rounded"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {fields.map(renderField)}
    </div>
  );
}
