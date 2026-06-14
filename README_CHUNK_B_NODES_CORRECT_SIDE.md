# The Report — Chunk B Nodes Correct Side

Adds/updates Chunk B East Market pathing.

Rules locked:
- Cars drive only on asphalt road lanes.
- Cars use US/right-side lane placement.
- Civilians walk sidewalks only.
- Civilians enter roads only through crosswalk nodes.

Debug:
- Blue = sidewalk path.
- Green = crosswalk path.
- Yellow = eastbound/northbound car lane.
- Orange = westbound/southbound car lane.
- Red dots = stop/intersection points.

Install in Replit:
unzip -o the_report_chunk_b_nodes_correct_side.zip
git add index.html assets/city/chunks/east_market config/pathing docs/map/east_market README_CHUNK_B_NODES_CORRECT_SIDE.md
git commit -m "Fix Chunk B vehicle and pedestrian nodes"
git push

Test:
https://adonisdross.github.io/The-Report/?v=chunk-b-nodes-correct-side-010

In game:
Press N to toggle route debug, or use the debug preview image in docs/map/east_market.
