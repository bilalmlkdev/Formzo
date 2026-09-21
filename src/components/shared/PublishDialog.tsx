import { useState } from "react";
import { ExternalLink, Copy, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useFormStore } from "../../store/form-store";

interface PublishDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formId: string;
}

export function PublishDialog({ open, onOpenChange, formId }: PublishDialogProps) {
  const [copied, setCopied] = useState(false);
  const publishForm = useFormStore((s) => s.publishForm);
  const form = useFormStore((s) => s.getForm(formId));

  const publicUrl = `${window.location.origin}/form/${formId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePublish = () => {
    publishForm(formId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Publish Form</DialogTitle>
          <DialogDescription>
            Share your form with the world. Anyone with the link can submit responses.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Public URL</label>
            <div className="flex gap-2">
              <Input value={publicUrl} readOnly className="flex-1" />
              <Button variant="outline" size="icon" onClick={handleCopy}>
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => window.open(publicUrl, "_blank")}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Open Form
            </Button>
            {form?.status !== "published" && (
              <Button className="flex-1" onClick={handlePublish}>
                Publish Now
              </Button>
            )}
          </div>

          {form?.status === "published" && (
            <p className="text-sm text-green-600 text-center">
              This form is published and accepting responses.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
