/**
 * Slot sizing -the plug-and-play grid system for dashboards, the Playground
 * canvas, and the Components gallery. Everything lays out on a 12-column grid;
 * a component declares (or is assigned) a slot size that maps to a column span.
 *
 * One vocabulary, used everywhere: full · two-thirds · half · third.
 */
export type SlotSize = "full" | "two-thirds" | "half" | "third";

export const SLOT_SIZES: SlotSize[] = ["third", "half", "two-thirds", "full"];

/** Column span per slot size on the shared 12-col grid (responsive). */
export const SLOT_SPAN: Record<SlotSize, string> = {
  full: "col-span-12",
  "two-thirds": "col-span-12 lg:col-span-8",
  half: "col-span-12 md:col-span-6",
  third: "col-span-12 sm:col-span-6 lg:col-span-4",
};

/** Short label for size pickers. */
export const SLOT_LABEL: Record<SlotSize, string> = {
  full: "Full",
  "two-thirds": "2/3",
  half: "1/2",
  third: "1/3",
};

/** The canonical 12-column grid container. */
export const SLOT_GRID = "grid grid-cols-12 gap-4";
