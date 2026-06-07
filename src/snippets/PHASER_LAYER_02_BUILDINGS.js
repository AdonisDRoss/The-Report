// Phaser-ready Layer 02 building sheet setup.
// Add this asset constant:
const BUILDING_SHEET_ASSET = {
  key: 'building_exterior_sheet',
  path: 'assets/reference/layer_02_building_exterior_sheet.png'
};

// Add this to your lazyLoadGameAssets() files array:
{ type: 'image', key: BUILDING_SHEET_ASSET.key, path: BUILDING_SHEET_ASSET.path },

// Add this inside this.load.on('filecomplete', (key) => { ... }):
if (key === BUILDING_SHEET_ASSET.key) this.applyBuildingSheet();

// Add this method inside GameScene:
applyBuildingSheet() {
  if (this.realBuildingSheet || !this.textures.exists(BUILDING_SHEET_ASSET.key)) return;

  const pieces = [
    { name: 'precinct', crop: [20, 25, 470, 430], place: [250, 105, 610, 485] },
    { name: 'garage', crop: [505, 55, 150, 315], place: [715, 130, 225, 350] },
    { name: 'bennys_market', crop: [720, 40, 640, 465], place: [1155, 110, 700, 500] },
    { name: 'report_room', crop: [40, 635, 220, 265], place: [190, 900, 345, 320] },
    { name: 'evidence_dropoff', crop: [335, 635, 250, 275], place: [585, 900, 355, 320] },
    { name: 'red_gull_diner', crop: [655, 640, 350, 280], place: [1110, 835, 460, 325] },
    { name: 'laundromat', crop: [1080, 640, 275, 300], place: [1600, 835, 335, 330] },
    { name: 'payphone', crop: [1010, 770, 70, 145], place: [1568, 1125, 80, 140] }
  ];

  this.realBuildingSheet = [];
  for (const p of pieces) {
    const [cx, cy, cw, ch] = p.crop;
    const [x, y, sw, sh] = p.place;
    const img = this.add.image(x, y, BUILDING_SHEET_ASSET.key)
      .setOrigin(0, 0)
      .setCrop(cx, cy, cw, ch)
      .setDisplaySize(sw, sh)
      .setDepth(2);
    img.setName(p.name);
    this.realBuildingSheet.push(img);
  }

  if (this.buildingGraphics) this.buildingGraphics.setVisible(false);
  if (this.buildingLabels) this.buildingLabels.forEach(t => t.setVisible(false));

  this.message = 'Building sheet loaded from assets/reference.';
  this.messageTimer = 2200;
}