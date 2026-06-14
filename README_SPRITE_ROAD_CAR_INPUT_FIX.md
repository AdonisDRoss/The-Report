# The Report — Sprite / Road Collision / Car Input Fix 020

Fixes:
- Malcolm movement sheet is loaded as a true 4x8, 96x96 sheet.
- Malcolm east/right movement mirrors the west/left row so he no longer appears to walk backward.
- Malcolm side frames are scaled/origin-adjusted so the sides do not clip.
- Ramos walk sheet uses 8-direction rows instead of the old 4-direction/talk mapping.
- Ramos city walk scale is matched to her talk scale.
- Collision is rebuilt as strict building/water rectangles only; parking lots, roads, sidewalks, and driveways are open.
- X gas gets a short tap-latch and stronger acceleration.
- Driving stick steering curve is more sensitive.

Install:
unzip -o the_report_sprite_road_car_input_fix.zip
git add index.html assets/characters/main_detective assets/characters/npcs/partners/ramos docs/previews/sprites README_SPRITE_ROAD_CAR_INPUT_FIX.md
git commit -m "Fix sprites collision and car input"
git push

Test:
https://adonisdross.github.io/The-Report/?v=sprite-road-car-input-fix-020
