# HWS Final Development Decisions

## 2026-10-05 — Reuse from current site

The current GitHub site is reference material, not the visual or architectural foundation for the new HWS site.

### Good raw material to preserve or selectively reuse
- Metadata / social assets
- Operating-flow visuals
- Useful copy fragments, including: "Built around your process. Not around one tool."
- Other plain-English operational explanations that fit the canonical HWS voice
- Capabilities concepts that map cleanly into the new site's business-operation and build-type structure

### Do not preserve
- The current site's visual system. Use the visual system of the new HWS site instead.
- The current site's static architecture. Do not treat its existing HTML/CSS/JS structure as the implementation architecture to preserve.

### Working rule
Reuse ideas and assets selectively. Do not inherit the current site's visual language, page hierarchy, or implementation architecture simply because they already exist.

## Preview deployment trigger
Vercel preview project connected on 2026-10-05. Development work continues on `final-development`; production remains untouched.
