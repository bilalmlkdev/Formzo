import { useState } from "react";
import { Copy, Check, Code } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formId: string;
  formName: string;
}

export function ShareDialog({ open, onOpenChange, formId, formName }: ShareDialogProps) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);

  const publicUrl = `${window.location.origin}/form/${formId}`;
  const embedCode = `<iframe src="${publicUrl}" width="100%" height="800" frameborder="0"></iframe>`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Share "{formName}"</DialogTitle>
          <DialogDescription>
            Share your form via link or embed it in your website.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="link">
          <TabsList className="w-full">
            <TabsTrigger value="link" className="flex-1">Link</TabsTrigger>
            <TabsTrigger value="embed" className="flex-1">Embed</TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Public Link</label>
              <div className="flex gap-2">
                <Input value={publicUrl} readOnly className="flex-1" />
                <Button variant="outline" size="icon" onClick={handleCopyLink}>
                  {copiedLink ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="embed" className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Embed Code</label>
              <Textarea value={embedCode} readOnly rows={3} />
              <Button variant="outline" size="sm" onClick={handleCopyEmbed}>
                {copiedEmbed ? (
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                ) : (
                  <Code className="h-4 w-4 mr-2" />
                )}
                {copiedEmbed ? "Copied!" : "Copy Embed Code"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
