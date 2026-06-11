RAVEN HOOK WORLD BASE PAGE 01 GAMEPLAY-READY PATCH

This patch wires the rebuilt 4096x4096 Raven Hook world base layer into the current index.

Adds:
- New 4096x4096 world size.
- New clean base map:
  assets/city/pages/raven_hook_world_base_page_01_clean_4096x4096.png
- New collision rectangles generated from exterior building pads.
- New door interaction zones generated from door slots.
- New starter spawn points for Malcolm, Ramos, detective sedan, Benny's case, witnesses, and evidence.
- Police Station exterior door returns to PoliceStationScene.
- Other doors use the generic InteriorScene placeholder.
- Old Raven Hook Central building overlay art is disabled so it does not fight the rebuilt world map.
- Camera zoom updated for compressed city scale.

Controls preserved:
- A/E = interact
- X near car = enter/exit car
- X away from car = shoot
- B near car = enter/exit car
- B away from car = arrest
- Y = Ramos talk
- STA/ESC = pause

Upload:
unzip -o raven_hook_world_base_page01_gameplay_ready_patch.zip
git add index.html assets/city/pages data/city/pages assets/characters/npcs/partners/ramos assets/characters/main_detective/malcolm_shoot_6x4_128.png assets/audio/music/last_band_in_iowa_theme.mp3
git commit -m "Wire Raven Hook world base page gameplay"
git push origin main
