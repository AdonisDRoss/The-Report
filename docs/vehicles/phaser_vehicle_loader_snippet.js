// The Report — Raven Hook single-sprite vehicle loader
// North-facing master sprites. Rotate in Phaser.

this.load.image('veh_los_reyes_lowrider', 'assets/vehicles/gangs/los_reyes/los_reyes_lowrider_north.png');
this.load.image('veh_los_reyes_garage_van', 'assets/vehicles/gangs/los_reyes/los_reyes_garage_van_north.png');
this.load.image('veh_iron_dogs_muscle', 'assets/vehicles/gangs/iron_dogs/iron_dogs_muscle_car_north.png');
this.load.image('veh_iron_dogs_tow', 'assets/vehicles/gangs/iron_dogs/iron_dogs_tow_truck_north.png');
this.load.image('veh_holloway_luxury_sedan', 'assets/vehicles/gangs/holloway_kings/holloway_kings_luxury_sedan_north.png');
this.load.image('veh_maze_royale_coupe', 'assets/vehicles/gangs/holloway_kings/maze_royale_luxury_coupe_north.png');
this.load.image('veh_neon_knives_coupe', 'assets/vehicles/gangs/neon_knives/neon_knives_coupe_north.png');
this.load.image('veh_receipt_crew_sedan', 'assets/vehicles/gangs/receipt_crew/receipt_crew_sedan_north.png');
this.load.image('veh_moretti_car', 'assets/vehicles/gangs/moretti_crew/moretti_crew_car_north.png');
this.load.image('veh_moretti_strip_van', 'assets/vehicles/gangs/moretti_crew/moretti_crew_strip_van_north.png');
this.load.image('veh_vescari_sedan', 'assets/vehicles/fronts/vescari_family/vescari_family_sedan_north.png');
this.load.image('veh_vescari_hearse', 'assets/vehicles/fronts/vescari_family/vescari_funeral_hearse_north.png');
this.load.image('veh_bell_cartage_truck', 'assets/vehicles/fronts/bell_cartage/bell_cartage_cold_storage_truck_north.png');
this.load.image('veh_civilian_sedan', 'assets/vehicles/civilian/generic_civilian_sedan_north.png');
this.load.image('veh_taxi_cab', 'assets/vehicles/civilian/raven_hook_taxi_cab_north.png');
this.load.image('veh_pickup_truck', 'assets/vehicles/civilian/beat_up_pickup_truck_north.png');
this.load.image('veh_ambulance', 'assets/vehicles/civilian/raven_hook_ambulance_north.png');
this.load.image('veh_utility_truck', 'assets/vehicles/civilian/raven_hook_utility_service_truck_north.png');
this.load.image('veh_unmarked_detective', 'assets/vehicles/police/unmarked_detective_sedan_north.png');

const RAVEN_HOOK_SINGLE_SPRITE_VEHICLES = {
  los_reyes_lowrider: {
    key: 'veh_los_reyes_lowrider',
    name: "Los Reyes Lowrider",
    faction: "Los Reyes",
    category: "gang",
    path: 'assets/vehicles/gangs/los_reyes/los_reyes_lowrider_north.png',
    forward: 'north',
    rotateInPhaser: true
  },
  los_reyes_garage_van: {
    key: 'veh_los_reyes_garage_van',
    name: "Los Reyes Garage Van",
    faction: "Los Reyes",
    category: "gang",
    path: 'assets/vehicles/gangs/los_reyes/los_reyes_garage_van_north.png',
    forward: 'north',
    rotateInPhaser: true
  },
  iron_dogs_muscle_car: {
    key: 'veh_iron_dogs_muscle',
    name: "Iron Dogs Muscle Car",
    faction: "Iron Dogs",
    category: "gang",
    path: 'assets/vehicles/gangs/iron_dogs/iron_dogs_muscle_car_north.png',
    forward: 'north',
    rotateInPhaser: true
  },
  iron_dogs_tow_truck: {
    key: 'veh_iron_dogs_tow',
    name: "Iron Dogs Tow Truck",
    faction: "Iron Dogs",
    category: "gang",
    path: 'assets/vehicles/gangs/iron_dogs/iron_dogs_tow_truck_north.png',
    forward: 'north',
    rotateInPhaser: true
  },
  holloway_kings_sedan: {
    key: 'veh_holloway_luxury_sedan',
    name: "Holloway Kings Luxury Sedan",
    faction: "Holloway Kings",
    category: "gang",
    path: 'assets/vehicles/gangs/holloway_kings/holloway_kings_luxury_sedan_north.png',
    forward: 'north',
    rotateInPhaser: true
  },
  maze_royale_coupe: {
    key: 'veh_maze_royale_coupe',
    name: "Maze Royale Luxury Coupe",
    faction: "Holloway Kings",
    category: "gang",
    path: 'assets/vehicles/gangs/holloway_kings/maze_royale_luxury_coupe_north.png',
    forward: 'north',
    rotateInPhaser: true
  },
  neon_knives_coupe: {
    key: 'veh_neon_knives_coupe',
    name: "Neon Knives Coupe",
    faction: "Neon Knives",
    category: "gang",
    path: 'assets/vehicles/gangs/neon_knives/neon_knives_coupe_north.png',
    forward: 'north',
    rotateInPhaser: true
  },
  receipt_crew_sedan: {
    key: 'veh_receipt_crew_sedan',
    name: "Receipt Crew Sedan",
    faction: "Receipt Crew",
    category: "gang",
    path: 'assets/vehicles/gangs/receipt_crew/receipt_crew_sedan_north.png',
    forward: 'north',
    rotateInPhaser: true
  },
  moretti_crew_car: {
    key: 'veh_moretti_car',
    name: "Moretti Crew Car",
    faction: "Moretti Crew",
    category: "gang",
    path: 'assets/vehicles/gangs/moretti_crew/moretti_crew_car_north.png',
    forward: 'north',
    rotateInPhaser: true
  },
  moretti_crew_strip_van: {
    key: 'veh_moretti_strip_van',
    name: "Moretti Crew Strip Van",
    faction: "Moretti Crew",
    category: "gang",
    path: 'assets/vehicles/gangs/moretti_crew/moretti_crew_strip_van_north.png',
    forward: 'north',
    rotateInPhaser: true
  },
  vescari_sedan: {
    key: 'veh_vescari_sedan',
    name: "Vescari Family Sedan",
    faction: "Vescari Family",
    category: "front",
    path: 'assets/vehicles/fronts/vescari_family/vescari_family_sedan_north.png',
    forward: 'north',
    rotateInPhaser: true
  },
  vescari_funeral_hearse: {
    key: 'veh_vescari_hearse',
    name: "Vescari Funeral Hearse",
    faction: "Vescari Family",
    category: "front",
    path: 'assets/vehicles/fronts/vescari_family/vescari_funeral_hearse_north.png',
    forward: 'north',
    rotateInPhaser: true
  },
  bell_cartage_truck: {
    key: 'veh_bell_cartage_truck',
    name: "Bell Cartage Cold Storage Truck",
    faction: "Bell Cartage",
    category: "front",
    path: 'assets/vehicles/fronts/bell_cartage/bell_cartage_cold_storage_truck_north.png',
    forward: 'north',
    rotateInPhaser: true
  },
  generic_civilian_sedan: {
    key: 'veh_civilian_sedan',
    name: "Generic Civilian Sedan",
    faction: "Civilian",
    category: "civilian",
    path: 'assets/vehicles/civilian/generic_civilian_sedan_north.png',
    forward: 'north',
    rotateInPhaser: true
  },
  raven_hook_taxi: {
    key: 'veh_taxi_cab',
    name: "Raven Hook Taxi Cab",
    faction: "Civilian",
    category: "civilian",
    path: 'assets/vehicles/civilian/raven_hook_taxi_cab_north.png',
    forward: 'north',
    rotateInPhaser: true
  },
  beat_up_pickup: {
    key: 'veh_pickup_truck',
    name: "Beat-up Pickup Truck",
    faction: "Civilian",
    category: "civilian",
    path: 'assets/vehicles/civilian/beat_up_pickup_truck_north.png',
    forward: 'north',
    rotateInPhaser: true
  },
  raven_hook_ambulance: {
    key: 'veh_ambulance',
    name: "Raven Hook Ambulance",
    faction: "Civilian",
    category: "civilian",
    path: 'assets/vehicles/civilian/raven_hook_ambulance_north.png',
    forward: 'north',
    rotateInPhaser: true
  },
  raven_hook_utility_truck: {
    key: 'veh_utility_truck',
    name: "Raven Hook Utility Service Truck",
    faction: "Civilian",
    category: "civilian",
    path: 'assets/vehicles/civilian/raven_hook_utility_service_truck_north.png',
    forward: 'north',
    rotateInPhaser: true
  },
  unmarked_detective_sedan: {
    key: 'veh_unmarked_detective',
    name: "Unmarked Detective Sedan",
    faction: "Police",
    category: "police",
    path: 'assets/vehicles/police/unmarked_detective_sedan_north.png',
    forward: 'north',
    rotateInPhaser: true
  },
};

// Usage:
const cfg = RAVEN_HOOK_SINGLE_SPRITE_VEHICLES.los_reyes_lowrider;
const car = this.add.sprite(x, y, cfg.key).setOrigin(0.5, 0.5);
car.setRotation(headingRadians); // north/up sprite rotates to heading
