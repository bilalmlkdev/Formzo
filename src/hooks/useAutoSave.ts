import { useEffect, useRef } from "react";
import { useBuilderStore } from "../store/builder-store";
import { useFormStore } from "../store/form-store";
import { toast } from "sonner";

export function useAutoSave() {
  const isDirty = useBuilderStore((s) => s.isDirty);
  const form = useBuilderStore((s) => s.form);
  const setDirty = useBuilderStore((s) => s.setDirty);
  const setSaveStatus = useBuilderStore((s) => s.setSaveStatus);
  const updateForm = useFormStore((s) => s.updateForm);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isDirty && form) {
      setSaveStatus("saving");
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        updateForm(form.id, { fields: form.fields, settings: form.settings });
        setDirty(false);
        setSaveStatus("saved");
        toast.success("Form saved");
      }, 2000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isDirty, form, setDirty, updateForm, setSaveStatus]);
}
