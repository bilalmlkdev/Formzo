import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreHorizontal, Pencil, Eye, BarChart3, Copy, Archive, Trash2, Clock } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useFormStore } from "../../store/form-store";
import { Form } from "../../types/form";

interface FormCardProps {
  form: Form;
}

export function FormCard({ form }: FormCardProps) {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const deleteForm = useFormStore((s) => s.deleteForm);
  const duplicateForm = useFormStore((s) => s.duplicateForm);
  const archiveForm = useFormStore((s) => s.archiveForm);

  const statusColors: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    draft: "secondary",
    published: "default",
    archived: "outline",
  };

  const handleDelete = () => {
    deleteForm(form.id);
    setShowDeleteConfirm(false);
  };

  const handleDuplicate = () => {
    duplicateForm(form.id);
    setShowActions(false);
  };

  const handleArchive = () => {
    archiveForm(form.id);
    setShowActions(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card
      className="group relative cursor-pointer transition-all hover:shadow-md"
      onClick={() => navigate(`/app/forms/${form.id}`)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium truncate">{form.name}</h3>
              <Badge variant={statusColors[form.status]} className="shrink-0">
                {form.status}
              </Badge>
            </div>
            {form.description && (
              <p className="text-sm text-muted-foreground truncate mb-2">{form.description}</p>
            )}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>{form.fields.length} fields</span>
              <span>{form.responseCount} responses</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDate(form.updatedAt)}
              </span>
            </div>
          </div>

          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                setShowActions(!showActions);
              }}
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>

            {showActions && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowActions(false)} />
                <div className="absolute right-0 top-full mt-1 w-48 rounded-md border bg-card shadow-md z-50">
                  <div className="p-1">
                    <button
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/app/forms/${form.id}`);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/app/forms/${form.id}/preview`);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      Preview
                    </button>
                    <button
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/app/forms/${form.id}/responses`);
                      }}
                    >
                      <BarChart3 className="h-4 w-4" />
                      Responses
                    </button>
                    <div className="my-1 border-t" />
                    <button
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDuplicate();
                      }}
                    >
                      <Copy className="h-4 w-4" />
                      Duplicate
                    </button>
                    <button
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleArchive();
                      }}
                    >
                      <Archive className="h-4 w-4" />
                      Archive
                    </button>
                    <div className="my-1 border-t" />
                    {!showDeleteConfirm ? (
                      <button
                        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDeleteConfirm(true);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    ) : (
                      <div className="p-2">
                        <p className="text-xs text-muted-foreground mb-2">Are you sure?</p>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-7 flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete();
                            }}
                          >
                            Delete
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowDeleteConfirm(false);
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
