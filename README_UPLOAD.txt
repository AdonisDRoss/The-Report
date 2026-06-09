THE REPORT — STATION NEW ASSETS + NEW INDEX

This package includes a new index.html because the new Malcolm sheet is 96x128 and 4-direction/12-column.
The old game code expected 96x96 and 8-direction/6-column, so the station scene needed a code adapter.

What changed:
- Station Malcolm now uses:
  assets/characters/main_detective/malcolm_station_new_4dir_12x4_96x128.png
- Station Malcolm frame size:
  96x128
- Station Malcolm scale:
  1.45
- Station Malcolm collision body:
  42x64
- Station base map normalized to:
  1600x1000
- Bad full-map prop overlay replaced by a blank transparent overlay.
- New prop art saved separately as:
  assets/interiors/police_station/police_station_props_sheet.png
- Station controls and UI camera stay locked.

Upload from Replit project root:

unzip -o the_report_station_new_assets_pack.zip
git add index.html assets/interiors/police_station assets/characters/main_detective ASSET_MANIFEST.json
git commit -m "Add new station assets and Malcolm station sheet"
git push origin main

Test:
https://adonisdross.github.io/The-Report/index.html?v=station-new-assets-001
