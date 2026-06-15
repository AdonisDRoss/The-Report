# The Report — Malcolm Morning Start Patch 022

Adds the morning loop:

1. Title starts Malcolm in his apartment.
2. Malcolm wakes on his bed in sleeping outfit.
3. Closet in upper-left: press A to pick up pistol and detective outfit.
4. Press SEL to equip detective outfit/pistol.
5. Stairs/downstairs door exits into Kim's Corner Market.
6. Kim's front glass door exits to the street.
7. Objective points Malcolm toward the police station to meet Ramos.

Included assets:
- assets/interiors/malcolm_apartment/malcolm_apartment_morning_1499x1049.png
- assets/interiors/kims_corner_market/kims_corner_market_clean_1254x1254.png
- assets/characters/main_detective/malcolm_sleep_walk_4x8_96x96.png
- assets/characters/main_detective/malcolm_sleeping_bed_4x1_192x128.png

Notes:
- Sleeping/movement sheets were cut from measured generated sprites/components, not guessed frame crops.
- Kim's stairs are clear; no ice machine in front of stairs.
- Kim's front glass door is the street entrance.
- Kim's back/right stair zone goes upstairs to Malcolm's apartment.

Install:
unzip -o the_report_malcolm_morning_start.zip
git add index.html assets/interiors assets/characters/main_detective docs/previews/interiors README_MALCOLM_MORNING_START.md
git commit -m "Add Malcolm apartment morning start"
git push

Test:
https://adonisdross.github.io/The-Report/?v=malcolm-morning-start-022
