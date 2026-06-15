# The Report — Apartment Gear + Transition Hotfix 026

Fixes:
- Dresser beside bed is now a very forgiving gear pickup zone.
- Press A at dresser to pick up pistol and clothes.
- Press SEL to open real equip menu.
- Press A or X in equip menu to equip.
- Press A again at dresser after pickup also equips.
- Removes bed/old closet collision that blocked movement.
- Prevents transition loop by spawning Malcolm at bottom of Kim’s stairs, outside the upstairs trigger.
- Returning upstairs spawns Malcolm beside the stairs, outside the downstairs trigger.
- Kim’s front door still exits to world map.
- Indoor Malcolm scale is increased again.

Install:
unzip -o the_report_apartment_gear_transition_hotfix.zip
git add index.html README_APARTMENT_GEAR_TRANSITION_HOTFIX.md
git commit -m "Fix apartment gear pickup and stairs"
git push

Test:
https://adonisdross.github.io/The-Report/?v=apartment-gear-transition-hotfix-026
