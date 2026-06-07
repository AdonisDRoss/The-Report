# The Report — Raven Hook Central v0.3 Layered Build

First production-map test for the locked v0.3 loop:

Precinct → Market → Crime → Evidence → Trunk → Report

## Contents

- `index.html` — playable Phaser prototype using the new 2048x1536 Raven Hook Central layered map data.
- `assets/maps/rh_central_ground.png` — Layer 01 ground base.
- `assets/reference/layer_02_building_exterior_sheet.png` — building exterior reference sheet.
- `assets/reference/layer_03_interior_blocks_sheet.png` — interior blocks reference sheet.
- `assets/reference/layer_04_rooftop_blocks_sheet.png` — rooftop blocks reference sheet.
- `assets/reference/layer_05_props_sheet.png` — props asset sheet.
- `assets/reference/layer_06_collision_navigation_mask.png` — collision/navigation visual guide.
- `assets/reference/layer_07_interaction_zones_mask.png` — interaction visual guide.
- `assets/reference/layer_08_spawn_placement_mask.png` — spawn placement visual guide.
- `src/data/rhCentralV03Map.js` — separate map-data reference file.

## Controls

Keyboard:

- WASD / Arrows — walk or drive
- E — interact / enter / exit / collect / talk
- Space — arrest
- T — trunk
- R — report
- C — collision debug
- I — interaction debug
- P — spawn debug
- M — reference mask preview

Mobile:

- SNES-style on-screen D-pad
- A — interact
- B — arrest
- X — trunk
- Y — report

## Notes

Layer 06, 07, and 08 are visual guides only. Real collision, interactions, and spawn points are coded as data in `index.html` and `src/data/rhCentralV03Map.js`.
