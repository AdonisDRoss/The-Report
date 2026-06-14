// The Report — Police sprite loader V2 SAFE
// Sheets: 384x768, 4 columns x 8 rows, 96x96 frames

const POLICE_SPRITES_V2 = {
  patrol_black_male: 'assets/characters/police/patrol_black_male.png',
  patrol_white_male: 'assets/characters/police/patrol_white_male.png',
  patrol_latino_male_pompadour: 'assets/characters/police/patrol_latino_male_pompadour.png',
  patrol_white_female: 'assets/characters/police/patrol_white_female.png',
  patrol_black_female: 'assets/characters/police/patrol_black_female.png',
  patrol_latina_female: 'assets/characters/police/patrol_latina_female.png',
  swat_male_operator: 'assets/characters/police/swat_male_operator.png',
  swat_female_operator: 'assets/characters/police/swat_female_operator.png'
};

function preloadPoliceSpritesV2(scene) {
  for (const [key, path] of Object.entries(POLICE_SPRITES_V2)) {
    scene.load.spritesheet(key, path, { frameWidth: 96, frameHeight: 96 });
  }
}
