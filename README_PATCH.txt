The Report — Police / NPC / Traffic Patch

Install:
unzip -o the_report_police_npc_traffic_patch.zip
git add index.html assets data
git commit -m "Add police station NPCs sidewalk pedestrians and traffic AI"
git push origin main

What this patch does:
- Adds visible police inside the station.
- Adds police patrol vehicles driving around Raven Hook.
- Adds 12 civilian NPCs walking sidewalk/parking/alley nodes.
- Adds 8 NPC vehicles using road-node traffic AI.
- Adds stop/yield behavior at intersections.
- Adds follow distance and predictive spacing so cars avoid traffic before impact.
- Adds fallback visible sprites if any asset is missing.
- Bundles civilians, cops, and vehicle assets into proper assets/ and data/ paths.

Debug:
N toggles route debug on the city scene.
C toggles collision debug from the existing build.
