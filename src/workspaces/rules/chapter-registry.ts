import { lazy, type ComponentType } from "react";

export interface ChapterEntry {
  id: string;
  label: string;
  group: string;
}

export interface ChapterGroup {
  id: string;
  label: string;
  chapters: ChapterEntry[];
}

const ch = (id: string, label: string, group: string): ChapterEntry => ({ id, label, group });

export const CHAPTER_GROUPS: ChapterGroup[] = [
  {
    id: "foundations",
    label: "Foundations",
    chapters: [
      ch("design-philosophy", "Design Philosophy", "foundations"),
      ch("brand-identity", "Brand Identity", "foundations"),
      ch("voice-tone", "Voice & Tone", "foundations"),
    ],
  },
  {
    id: "accessibility",
    label: "Accessibility",
    chapters: [
      ch("wcag-conformance", "WCAG 2.2 AA Conformance", "accessibility"),
      ch("color-contrast", "Color & Contrast", "accessibility"),
      ch("keyboard-focus", "Keyboard & Focus", "accessibility"),
      ch("screen-readers", "Screen Readers", "accessibility"),
    ],
  },
  {
    id: "usability",
    label: "Usability",
    chapters: [
      ch("heuristic-principles", "Heuristic Principles", "usability"),
      ch("error-prevention", "Error Prevention & Recovery", "usability"),
      ch("progressive-disclosure", "Progressive Disclosure", "usability"),
      ch("cognitive-load", "Cognitive Load", "usability"),
    ],
  },
  {
    id: "layout",
    label: "Layout",
    chapters: [
      ch("grid-spacing", "Grid & Spacing System", "layout"),
      ch("visual-hierarchy", "Visual Hierarchy", "layout"),
      ch("responsive-patterns", "Responsive Patterns", "layout"),
      ch("content-density", "Content Density", "layout"),
    ],
  },
  {
    id: "perception",
    label: "Perception",
    chapters: [
      ch("gestalt-principles", "Gestalt Principles", "perception"),
      ch("color-psychology", "Color Psychology", "perception"),
      ch("typography-rules", "Typography Rules", "perception"),
      ch("motion-animation", "Motion & Animation", "perception"),
    ],
  },
  {
    id: "psychology",
    label: "Psychology",
    chapters: [
      ch("fitts-law", "Fitts's Law", "psychology"),
      ch("hicks-law", "Hick's Law", "psychology"),
      ch("millers-law", "Miller's Law", "psychology"),
      ch("jakobs-law", "Jakob's Law", "psychology"),
      ch("doherty-threshold", "Doherty Threshold", "psychology"),
    ],
  },
  {
    id: "interaction",
    label: "Interaction",
    chapters: [
      ch("click-targets", "Click Targets & Touch", "interaction"),
      ch("hover-focus-states", "Hover & Focus States", "interaction"),
      ch("transitions-timing", "Transitions & Timing", "interaction"),
      ch("feedback-patterns", "Feedback Patterns", "interaction"),
    ],
  },
  {
    id: "composition",
    label: "Composition",
    chapters: [
      ch("component-composition", "Component Composition Rules", "composition"),
      ch("token-discipline", "Token Discipline", "composition"),
      ch("agentic-design", "Agentic Design Rules", "composition"),
      ch("agent-contract", "Agent Contract (CLAUDE.md)", "composition"),
    ],
  },
];

const chapterCache = new Map<string, ComponentType>();

export function loadChapter(id: string): ComponentType {
  const cached = chapterCache.get(id);
  if (cached) return cached;

  const Comp = lazy(() => import(`./chapters/${id}.tsx`));
  chapterCache.set(id, Comp);
  return Comp;
}

export function allChapters(): ChapterEntry[] {
  return CHAPTER_GROUPS.flatMap((g) => g.chapters);
}
