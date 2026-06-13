# HYBRID NO-ERASE V3 Workflow

This is the safest usable workflow pack.

## Why this version

The transparent V2 pack still erased parts of some buildings. This version avoids that by only removing:

- near-white background
- exact checkerboard background pixels

It does **not** remove broad gray, dark gray, or black background areas.

## Included

For every asset:

```text
assets/...                 processed safer PNG
assets_original_uncut/...  original uncut source backup
```

## What to use

Use the `assets/` PNGs first.

If any asset still has background:
1. place it on the map,
2. confirm scale/position,
3. manually mask/cut that single asset,
4. keep the matching file name.

## Do not run global background removal again

Global background removal is what damaged the buildings.

## Collision

Collision should be hand-authored with rectangles/polygons from the manifest notes. Do not use image bounds.

## Layer order

```text
base map
building bodies
vehicles
drive-under overlays
UI
```

Drive-under overlays:
- police motor pool
- Russo garage
- South Hook Gas canopy
