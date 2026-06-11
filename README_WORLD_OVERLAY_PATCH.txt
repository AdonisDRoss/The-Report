The Report — World Overlay + Asset Visibility Fix

What this patch fixes:
- Adds a 4096x4096 game-ready Raven Hook overlay map for the current 2x2 chunk page.
- Hides the visible fallback building boxes/labels after the overlay loads.
- Keeps invisible building collisions active.
- Bundles civilians, police, and traffic vehicle assets again.
- Fixes NPC/civilian/cars showing as boxes by replacing fallback boxes when streamed assets finish loading.
- Keeps sidewalk pedestrians and road traffic with stop/yield/follow-distance behavior.

Install:
unzip -o the_report_world_overlay_assets_fix_patch.zip
git add index.html assets data README_WORLD_OVERLAY_PATCH.txt
git commit -m "Add Raven Hook world overlay and fix NPC vehicle assets"
git push origin main

Test:
https://adonisdross.github.io/The-Report/?v=world-overlay-assets-fix-1

Debug:
N = route debug
C = collision debug
