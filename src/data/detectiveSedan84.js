// The Report — Detective Sedan 1984 vehicle config
// Used by Raven Hook Central v0.3 vehicle state test.

export const DETECTIVE_SEDAN_84 = {
  id: "detective_sedan_84",
  name: "1984 Unmarked Detective Sedan",
  sprites: {
    clean: "detective_sedan_clean_64",
    damage: "detective_sedan_damage_64",
    shadow: "detective_sedan_shadow_64",
    trunkOpen: "detective_sedan_trunk_open_64",
    driverDoorOpen: "detective_sedan_driver_door_open_64",
    lights: "detective_sedan_lights_overlay_64",
    hoodOpen: "detective_sedan_hood_open_64",
    smokeFire: "detective_sedan_smoke_fire_64",
    burnt: "detective_sedan_burnt_64"
  },
  frame: { width: 128, height: 128, count: 64, columns: 8, rows: 8, degreesPerFrame: 5.625 },
  handling: {
    mass: 1.25,
    topSpeed: 430,
    acceleration: 520,
    brakeForce: 680,
    friction: 0.985,
    traction: 0.074,
    steeringRate: 2.95,
    wheelBase: 78,
    frontWheelOffset: 34,
    rearWheelOffset: -34,
    collisionWidth: 34,
    collisionLength: 62,
    damageResistance: 1.0
  },
  fuel: { capacity: 100, burnRate: 0.018, idleBurnRate: 0.002 },
  trunk: { slots: 6, allowedItems: ["evidence", "case_file", "tool", "weapon", "fuel_can"] },
  statePriority: ["burnt", "hoodOpen", "trunkOpen", "driverDoorOpen", "clean"],
  overlays: ["shadow", "lights", "damage", "smokeFire"]
};
