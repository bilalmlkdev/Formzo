export interface FormResponse {
  id: string;
  formId: string;
  formSlug: string;
  answers: Record<string, unknown>;
  submittedAt: string;
  metadata: {
    ip?: string;
    userAgent?: string;
    referrer?: string;
    country?: string;
    city?: string;
  };
}
