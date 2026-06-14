// The Report — Police HQ Chunk A loader snippet
// Map art: 2048x2048
// Collision rule: white=open, black=blocked

const POLICE_HQ_CHUNK_A = {
  id: 'police_hq_chunk_a',
  mapKey: 'police_hq_chunk_a_map',
  collisionKey: 'police_hq_chunk_a_collision',
  mapPath: 'assets/city/chunks/police_hq/police_hq_chunk_a_2048.png',
  collisionPath: 'assets/city/chunks/police_hq/police_hq_chunk_a_collision_2048.png',
  width: 2048,
  height: 2048
};

function preloadPoliceHqChunkA(scene) {
  scene.load.image(POLICE_HQ_CHUNK_A.mapKey, POLICE_HQ_CHUNK_A.mapPath);
  scene.load.image(POLICE_HQ_CHUNK_A.collisionKey, POLICE_HQ_CHUNK_A.collisionPath);
}

function createPoliceHqChunkA(scene, x = 0, y = 0) {
  const map = scene.add.image(x, y, POLICE_HQ_CHUNK_A.mapKey)
    .setOrigin(0, 0)
    .setDepth(0);

  // Collision mask is provided as an image asset.
  // In Phaser, either sample the mask into rectangles/polygons
  // or use the JSON notes as the first rectangle pass.
  return map;
}
