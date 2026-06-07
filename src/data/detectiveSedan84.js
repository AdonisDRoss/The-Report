export const DETECTIVE_SEDAN_84 = {
  id: "detective_sedan_84",
  name: "1984 Unmarked Detective Sedan",
  sprites: {
    clean: "assets/vehicles/detective_sedan/detective_sedan_clean_64.png",
    damage: "assets/vehicles/detective_sedan/detective_sedan_damage_64.png",
    shadow: "assets/vehicles/detective_sedan/detective_sedan_shadow_64.png"
  },
  frame: { width: 128, height: 128, count: 64, columns: 8, rows: 8, degreesPerFrame: 5.625 },
  handling: {
    mass: 1.25, topSpeed: 430, acceleration: 520, brakeForce: 680, friction: 0.985, traction: 0.074, steeringRate: 2.95,
    wheelBase: 78, frontWheelOffset: 34, rearWheelOffset: -34, collisionWidth: 34, collisionLength: 62
  },
  fuel: { capacity: 100, burnRate: 0.018, idleBurnRate: 0.002 },
  trunk: { slots: 6 },
  audio: { radioType: "police_dispatch" }
};
