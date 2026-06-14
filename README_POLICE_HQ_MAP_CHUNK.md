# The Report — Police HQ Map Chunk Pack

This installs the locked **Chunk A: Police HQ / Motor Pool District**.

## Included

```text
assets/city/chunks/police_hq/police_hq_chunk_a_2048.png
assets/city/chunks/police_hq/police_hq_chunk_a_collision_2048.png
docs/map/police_hq/police_hq_chunk_a_preview_1024.jpg
docs/map/police_hq/police_hq_chunk_a_collision_debug_overlay.png
config/map/police_hq_chunk_a_collision_notes.json
config/map/police_hq_chunk_a_manifest.json
docs/map/police_hq/police_hq_chunk_loader_snippet.js
```

## Collision rule

```text
white = open / walkable / drivable
black = blocked / collision
```

## Use

This is the first test chunk for the new world map workflow.

Recommended depth order:

```text
map base: 0
vehicles: 22
player: 31
roof/top overlays: 45
UI: 2000+
```

## Manual import command

Upload this ZIP to the repo root, then run:

```bash
unzip -o the_report_police_hq_map_pack.zip
git add assets/city/chunks/police_hq config/map docs/map/police_hq README_POLICE_HQ_MAP_CHUNK.md
git commit -m "Import Police HQ map chunk"
git push
```
