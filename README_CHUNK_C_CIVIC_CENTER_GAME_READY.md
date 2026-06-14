# The Report — Chunk C Civic Center Game Ready

Chunk C position:
- x: 0-2048
- y: 2048-4096

Connection lock:
- North edge connects to Chunk A / Police HQ.
- East edge connects to future Chunk D / Red Gull Strip + docks.
- Chunk C does not directly connect to Chunk B except through the world road grid.

Included:
- cleaned 2048x2048 Chunk C base map
- full 4096x4096 ABC world base image
- strict building-only collision
- vehicle road nodes
- civilian sidewalk/crosswalk nodes
- civic door placeholders
- docs previews

Install:
unzip -o the_report_chunk_c_civic_center_game_ready.zip
git add index.html assets/city/chunks/civic_center assets/city/pages config/map config/pathing docs/map/civic_center README_CHUNK_C_CIVIC_CENTER_GAME_READY.md
git commit -m "Add Chunk C civic center"
git push

Test:
https://adonisdross.github.io/The-Report/?v=chunk-c-civic-center-015
