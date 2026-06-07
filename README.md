# The Report — Raven Hook Central v0.3 Vehicle States Update

This build updates the uploaded `index(171).html` with the full detective sedan visual state system.

## Required files included

```text
index.html
assets/maps/rh_central_ground.png
assets/reference/layer_02_building_exterior_sheet.png
assets/reference/layer_03_interior_blocks_sheet.png
assets/reference/layer_04_rooftop_blocks_sheet.png
assets/reference/layer_05_props_sheet.png
assets/reference/layer_06_collision_navigation_mask.png
assets/reference/layer_07_interaction_zones_mask.png
assets/reference/layer_08_spawn_placement_mask.png
assets/vehicles/detective_sedan/detective_sedan_clean_64.png
assets/vehicles/detective_sedan/detective_sedan_damage_64.png
assets/vehicles/detective_sedan/detective_sedan_shadow_64.png
assets/vehicles/detective_sedan/detective_sedan_trunk_open_64.png
assets/vehicles/detective_sedan/detective_sedan_driver_door_open_64.png
assets/vehicles/detective_sedan/detective_sedan_lights_overlay_64.png
assets/vehicles/detective_sedan/detective_sedan_hood_open_64.png
assets/vehicles/detective_sedan/detective_sedan_smoke_fire_64.png
assets/vehicles/detective_sedan/detective_sedan_burnt_64.png
src/data/detectiveSedan84.js
src/data/rhCentralV03Map.js
```

## Car state test keys

```text
1 = clean/reset vehicle
2 = toggle driver door open
3 = toggle trunk open
4 = toggle hood open
5 = toggle lights
6 = add damage
7 = toggle smoke/fire
8 = toggle burnt chassis / destroyed state
0 = full reset
```

## Existing controls

```text
WASD / Arrows = walk / drive
E = interact / enter / exit
SPACE = arrest
T = trunk
R = report
C = collision debug
I = interaction debug
P = spawn debug
M = map/reference preview
```

## Notes

The generated state sheets were normalized to 1024x1024 and converted to RGBA PNGs. Some AI-generated sheets are full alternate car states rather than pure deltas; the renderer treats trunk, hood, door, and burnt states as alternate base textures while lights, damage, and smoke/fire render as overlays.
