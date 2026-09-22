import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFormsStore } from "../store/forms-store";

export function NewFormPage() {
  const createForm = useFormsStore((s) => s.createForm);
  const navigate = useNavigate();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const form = createForm("Untitled");
    navigate(`/editor/${form.id}`, { replace: true });
  }, [createForm, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="text-sm text-zinc-400">Creating form…</div>
    </div>
  );
}
