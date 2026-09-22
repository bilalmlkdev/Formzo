import {
  AlignLeft,
  Calendar,
  CheckSquare,
  ChevronDown,
  CircleCheck,
  Clock,
  Hash,
  Heading1,
  Link2,
  ListChecks,
  Mail,
  Minus,
  Phone,
  Radio,
  Star,
  TextCursorInput,
  Type,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { BlockType } from "../types/form";

export interface BlockTypeDef {
  type: BlockType;
  label: string;
  group: "Questions" | "Layout blocks";
  description: string;
  icon: LucideIcon;
}

export const blockTypes: BlockTypeDef[] = [
  {
    type: "short_answer",
    label: "Short answer",
    group: "Questions",
    description:
      "Use this to insert a question combined with a short text answer. Add an answer label or placeholder text for guidance.",
    icon: Type,
  },
  {
    type: "long_answer",
    label: "Long answer",
    group: "Questions",
    description: "A multi-line text answer for longer responses and feedback.",
    icon: AlignLeft,
  },
  {
    type: "multiple_choice",
    label: "Multiple choice",
    group: "Questions",
    description: "Let people pick one option from a list of choices.",
    icon: Radio,
  },
  {
    type: "checkboxes",
    label: "Checkboxes",
    group: "Questions",
    description: "Allow multiple selections from a list of options.",
    icon: CheckSquare,
  },
  {
    type: "dropdown",
    label: "Dropdown",
    group: "Questions",
    description: "A compact select menu when you have many options.",
    icon: ChevronDown,
  },
  {
    type: "multi_select",
    label: "Multi-select",
    group: "Questions",
    description: "Let people choose several answers with chips or checks.",
    icon: ListChecks,
  },
  {
    type: "number",
    label: "Number",
    group: "Questions",
    description: "Numeric input with optional min/max guidance.",
    icon: Hash,
  },
  {
    type: "email",
    label: "Email",
    group: "Questions",
    description: "Validated email address field.",
    icon: Mail,
  },
  {
    type: "phone",
    label: "Phone number",
    group: "Questions",
    description: "Phone input for contact collection.",
    icon: Phone,
  },
  {
    type: "link",
    label: "Link",
    group: "Questions",
    description: "Collect a URL from respondents.",
    icon: Link2,
  },
  {
    type: "date",
    label: "Date",
    group: "Questions",
    description: "Date picker for deadlines and schedules.",
    icon: Calendar,
  },
  {
    type: "time",
    label: "Time",
    group: "Questions",
    description: "Time picker for appointments and slots.",
    icon: Clock,
  },
  {
    type: "rating",
    label: "Rating",
    group: "Questions",
    description: "Star or score rating for quick feedback.",
    icon: Star,
  },
  {
    type: "yes_no",
    label: "Yes / No",
    group: "Questions",
    description: "Simple binary choice question.",
    icon: CircleCheck,
  },
  {
    type: "statement",
    label: "Statement",
    group: "Layout blocks",
    description: "A paragraph of text with no input field.",
    icon: TextCursorInput,
  },
  {
    type: "heading",
    label: "Heading",
    group: "Layout blocks",
    description: "Section title to group related questions.",
    icon: Heading1,
  },
  {
    type: "divider",
    label: "Divider",
    group: "Layout blocks",
    description: "A horizontal line to separate sections.",
    icon: Minus,
  },
];
