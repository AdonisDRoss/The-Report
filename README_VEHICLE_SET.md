# The Report — Raven Hook Vehicle Set

This pack installs the current single-sprite vehicle set.

## Vehicle count

19 north-facing master sprites.

## System rule

```text
one transparent PNG per vehicle
front faces north/up
rotate the sprite in Phaser
no vehicle sprite sheets
```

## Main repo paths

```text
assets/vehicles/gangs/
assets/vehicles/fronts/
assets/vehicles/police/
assets/vehicles/civilian/
assets/vehicles/vehicle_manifest.json
docs/vehicles/phaser_vehicle_loader_snippet.js
```

## Recommended import command

Upload this ZIP to the repo root, then run:

```bash
unzip -o the_report_vehicle_set_WORKFLOW_PACK.zip
git add assets/vehicles docs/vehicles docs/previews/vehicles docs/vehicle_refs
git commit -m "Import Raven Hook vehicle set"
git push
```

## Phaser depth note

Vehicles should render above the map but below UI.

```text
map/base: 0
vehicles: 22-30
player: 31
top overlays: 45
ui: 2000+
```
