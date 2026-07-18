import { DocSection, DocKeyValue, RuleCard } from "@/docs/doc-section";

export default function SurfaceDetails() {
  return (
    <div>
      <h2
        className="text-2xl font-heading font-medium mb-2"
        style={{ color: "var(--bl-fg-primary)" }}
      >
        Surface Details
      </h2>
      <p className="text-[14px] leading-relaxed mb-8" style={{ color: "var(--bl-fg-secondary)" }}>
        The small surface decisions that make interfaces feel considered rather
        than assembled: how nested corners relate, how depth is expressed, how
        images are framed, and how shapes are centered. Get these wrong and a UI
        feels subtly off even when nothing is technically broken.
        <span style={{ color: "var(--bl-fg-muted)" }}>
          {" "}Adapted from Jakub Krehel's better-ui (jakub.kr).
        </span>
      </p>

      <DocSection eyebrow="THE FORMULA" heading="Concentric border radius">
        <p>
          When one rounded element sits inside another with padding between them,
          their radii must be concentric or the gap between the two curves reads
          as uneven. The rule is arithmetic:
        </p>
        <DocKeyValue
          rows={[
            { k: "outer radius = inner radius + padding", v: "The bezel is the clean case: a 16px frame with 4px padding wants a 12px inner corner. Invert it to design: pick the inner radius, add the padding between the curves, that's the outer." },
            { k: "One scale, stepped by role", v: "Every corner is one of: frame 16 (--bl-radius-2xl) · card 14 (xl) · well/input 10 (lg) · button/select/row 8 (md) · chip/badge/code 5 (sm) · pill full. Two different tiers never share a value; a row as round as its card is the tell that there's no system. No one-off radii." },
            { k: "Stop nesting past ~24px padding", v: "When padding is large, the two corners are far enough apart that the eye no longer relates them — treat the layers as independent and pick each element's radius from its own tier in the scale." },
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <RuleCard
            type="do"
            title="Give nested surfaces concentric radii"
            description="Outer card radius = inner control radius + the padding between them. The curves stay parallel and the nesting looks intentional."
          />
          <RuleCard
            type="dont"
            title="Use the same radius on a card and the control inside it"
            description="Identical radii on nested elements is the single most common thing that makes an interface feel off — the inner corner looks pinched against the outer one."
          />
        </div>
      </DocSection>

      <DocSection eyebrow="DEPTH" heading="Shadows over borders">
        <p>
          Raised surfaces — buttons, cards, popovers, anything that sits above the
          page — express depth with a layered shadow, not a hard 1px border. A
          shadow adapts to whatever is behind it (an image, a colored panel, the
          well); a solid border picks up none of that and reads as a drawn line.
        </p>
        <DocKeyValue
          rows={[
            { k: "--bl-shadow-raised", v: "The default elevation: a crisp 1px ring + a subtle lift + ambient depth. In dark mode the ring is white (a black ring is invisible on dark surfaces); in light mode all three layers are black at low opacity." },
            { k: "--bl-shadow-raised-hover", v: "Same structure, deepened. Transition box-shadow (--dur-instant, --ease-out) so the lift on hover is smooth, not a jump." },
            { k: "Borders are for structure", v: "Keep solid --bl-border-divider / --bl-border-muted for dividers, table rules, and layout separation — lines that organize, not surfaces that lift." },
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <RuleCard
            type="do"
            title="Raise cards and buttons with --bl-shadow-raised"
            description="The layered shadow reads as depth on any background and deepens to --bl-shadow-raised-hover on hover."
          />
          <RuleCard
            type="dont"
            title="Outline every raised surface with a 1px solid border"
            description="A hard border doesn't adapt to what's behind it and flattens the depth hierarchy. Reserve borders for dividers and structure."
          />
        </div>
      </DocSection>

      <DocSection eyebrow="FRAMING" heading="Image outlines">
        <p>
          Images and thumbnails get a subtle inset outline so they sit in the
          system with a consistent edge — otherwise a light image bleeds into a
          light panel and a photo's own border is arbitrary.
        </p>
        <DocKeyValue
          rows={[
            { k: "--bl-outline-image", v: "outline: 1px solid var(--bl-outline-image); outline-offset: -1px. The color is PURE black at 10% in light, PURE white at 10% in dark." },
            { k: "Never a tinted neutral", v: "Not zinc, not slate, not a near-black. A tinted outline picks up the surface color underneath it and reads as dirt on the image edge. Pure black/white only." },
            { k: "Inset, not outset", v: "outline-offset: -1px keeps the frame on the image's own pixels so it doesn't change the element's box size or collide with neighbors." },
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <RuleCard
            type="do"
            title="Frame images with the pure-black/white 10% inset outline"
            description="Use --bl-outline-image with outline-offset: -1px. Consistent, adapts to mode, and never dirties the edge."
          />
          <RuleCard
            type="dont"
            title="Border images with a tinted neutral like zinc-800"
            description="A tinted outline reads as grime on the image edge because it blends with the surface behind it. Only pure black or pure white at low opacity stays clean."
          />
        </div>
      </DocSection>

      <DocSection eyebrow="ALIGNMENT" heading="Optical over geometric">
        <p>
          Mathematically centered is not always visually centered. Shapes with
          uneven mass — icons, play triangles, arrows — need a manual nudge toward
          their visual weight, or they look shifted even though the numbers say
          they're centered.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Icon + text buttons:</strong> shave a couple of px off the
            icon-side padding so the pair reads as centered rather than
            left-heavy.
          </li>
          <li>
            <strong>Play triangles and arrows:</strong> nudge toward the pointed
            side — a geometrically centered triangle looks pushed left.
          </li>
          <li>
            <strong>Fix it in the SVG when you can.</strong> Correcting the icon's
            own artboard is better than per-instance container padding — the fix
            travels with the icon everywhere it's used.
          </li>
        </ul>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <RuleCard
            type="do"
            title="Nudge asymmetric shapes toward their visual mass"
            description="Optically center icons and triangles; prefer fixing the SVG artboard so the correction is universal."
          />
          <RuleCard
            type="dont"
            title="Trust equal padding to center every shape"
            description="Geometric centering only works for symmetric shapes. Icons and triangles look off-center even when the box math is perfect."
          />
        </div>
      </DocSection>
    </div>
  );
}
