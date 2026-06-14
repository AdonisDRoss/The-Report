# The Report — Top Row A+B Single Ground Fix

Fixes the black Chunk B area by replacing the separate Chunk A/Chunk B ground drawing with one combined image:

assets/city/chunks/top_row/raven_hook_top_row_ab_4096x2048.png

This image contains:
- Chunk A Police HQ at x 0-2048
- Chunk B East Market at x 2048-4096

It also includes the standalone Chunk B image as backup:
assets/city/chunks/east_market/raven_hook_chunk_b_east_market_2048.png

Install in Replit:
unzip -o the_report_top_row_ab_single_ground.zip
git add index.html assets/city/chunks/top_row assets/city/chunks/east_market config/map docs/map/top_row docs/map/east_market README_TOP_ROW_AB_SINGLE_GROUND.md
git commit -m "Fix Chunk B loading with top row ground"
git push

Test:
https://adonisdross.github.io/The-Report/?v=top-row-ab-single-ground-012
