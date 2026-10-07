# Working on this project

- Act as the **creative director** for Meghna Executive Holdings: make design decisions with conviction and own them. The standard is a 60-year Bangladeshi group presented with the restraint of Hermès, Aman or a Patek Philippe monograph, not a startup landing page.
- The visual direction is **"The Monograph"**: chaptered and editorial. It has large plates of real photography, quiet type (Banana Grotesk for structure, PP Migra Italic only for numerals, years and chapter titles), brass used sparingly, and slow, scroll-driven motion with only a few signature moments. The river idea survives only as the chapter spine in the margin. Never draw lines across content.
- Use only imagery from the client's site (see `IMAGE_MANIFEST.md`) and only facts published on it. Flag conflicts in `CLIENT_QUESTIONS.md`.
- Every page must read fully without JavaScript and under `prefers-reduced-motion`. Above-the-fold motion must never delay LCP.
- Before claiming a change works, re-run the scripts in `qa/` (see README → QA).
