The Report — Layer 02 Building Exterior Phaser-Ready Pack

Input:
- layer_02_building_exterior_sheet.png
- Original size: 1448x1086

Output:
- assets/reference/layer_02_building_exterior_sheet.png
  Transparent-background Phaser-ready source sheet.

- assets/buildings/raven_hook_central/*.png
  Individual transparent building crops.

- src/data/ravenHookCentralBuildings.json
  Crop rectangles and world placement data.

- src/snippets/PHASER_LAYER_02_BUILDINGS.js
  Copy/paste Phaser integration snippet.

Use this exact GitHub path for the main sheet:
assets/reference/layer_02_building_exterior_sheet.png

Current index path should be:
BUILDING_SHEET_ASSET.path = 'assets/reference/layer_02_building_exterior_sheet.png'

Commit command:
git add assets/reference/layer_02_building_exterior_sheet.png assets/buildings/raven_hook_central src/data/ravenHookCentralBuildings.json src/snippets/PHASER_LAYER_02_BUILDINGS.js
git commit -m "Add Phaser-ready building exterior sheet"
git push origin main
