# The Report — Intersection Car Assist Fix

Fixes:
- Shrinks player car physics body from the older wide body to 26x48.
- Opens road/intersection rectangles across A/B/C/D.
- Keeps water blocked.
- Keeps tight building collision.
- Adds low-speed turning assist in intersections.
- Softens car wall bounce/scrape on road edges.
- Adds short X gas tap-latch so acceleration does not require repeated tapping.

Install:
unzip -o the_report_intersection_car_assist.zip
git add index.html README_INTERSECTION_CAR_ASSIST.md
git commit -m "Improve car intersections and acceleration"
git push

Test:
https://adonisdross.github.io/The-Report/?v=intersection-car-assist-021
