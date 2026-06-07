// The Report — Raven Hook Central v0.3 map data reference
// Real runtime data is currently in index.html for simple deployment.

const RH_CENTRAL_V03 = {
    id: "rh_central_v03",
    name: "Raven Hook Central v0.3",
    width: WORLD_W,
    height: WORLD_H,
    layers: {
      ground: "assets/maps/rh_central_ground.png",
      buildingsRef: "assets/reference/layer_02_building_exterior_sheet.png",
      interiorsRef: "assets/reference/layer_03_interior_blocks_sheet.png",
      rooftopsRef: "assets/reference/layer_04_rooftop_blocks_sheet.png",
      propsRef: "assets/reference/layer_05_props_sheet.png",
      collisionMaskRef: "assets/reference/layer_06_collision_navigation_mask.png",
      interactionMaskRef: "assets/reference/layer_07_interaction_zones_mask.png",
      spawnMaskRef: "assets/reference/layer_08_spawn_placement_mask.png"
    },
    campuses: {
      "RH-CEN-01": { name: "Precinct Block", type: "station", x: 0, y: 0, w: 1024, h: 1536 },
      "RH-CEN-02": { name: "Market Block", type: "patrol", x: 1024, y: 0, w: 1024, h: 1536 }
    }
  };

  // Production collision rectangles. These are the real gameplay blockers.
  const COLLISION_RECTS = [
    { id: "precinct", x: 285, y: 155, w: 565, h: 430, type: "building" },
    { id: "garage", x: 725, y: 145, w: 210, h: 315, type: "building" },
    { id: "report_room", x: 205, y: 905, w: 320, h: 300, type: "building" },
    { id: "evidence_dropoff", x: 610, y: 910, w: 315, h: 295, type: "building" },
    { id: "bennys_market", x: 1180, y: 150, w: 640, h: 430, type: "building" },
    { id: "bennys_loading_dock", x: 1810, y: 215, w: 145, h: 390, type: "large_prop" },
    { id: "red_gull_diner", x: 1140, y: 835, w: 420, h: 300, type: "building" },
    { id: "laundromat", x: 1630, y: 835, w: 285, h: 310, type: "building" },
    { id: "payphone_blocker", x: 1580, y: 1185, w: 70, h: 78, type: "large_prop" },
    { id: "north_left_curb", x: 0, y: 0, w: 2048, h: 40, type: "curb" },
    { id: "south_left_curb", x: 0, y: 1496, w: 2048, h: 40, type: "curb" }
  ];

  const INTERACTION_ZONES = [
    { id: "precinct_front", x: 500, y: 585, w: 100, h: 70, type: "door", target: "precinct_interior", label: "Precinct Entrance" },
    { id: "garage_door", x: 772, y: 462, w: 110, h: 60, type: "door", target: "garage_interior", label: "Garage" },
    { id: "precinct_roof_access", x: 820, y: 245, w: 70, h: 130, type: "roof", target: "precinct_roof", label: "Precinct Roof" },
    { id: "detective_trunk", x: 485, y: 770, w: 130, h: 115, type: "trunk", label: "Trunk" },
    { id: "report_room_door", x: 340, y: 1210, w: 110, h: 60, type: "door", target: "report_room", label: "Report Room" },
    { id: "report_desk", x: 280, y: 1020, w: 190, h: 105, type: "report", label: "Report Desk" },
    { id: "evidence_door", x: 720, y: 1210, w: 110, h: 60, type: "door", target: "evidence_dropoff", label: "Evidence Door" },
    { id: "evidence_counter", x: 685, y: 1020, w: 190, h: 105, type: "evidence_dropoff", label: "Evidence Counter" },
    { id: "bennys_front", x: 1415, y: 575, w: 130, h: 70, type: "door", target: "bennys_interior", label: "Benny's Front" },
    { id: "bennys_back", x: 1805, y: 365, w: 70, h: 120, type: "door", target: "bennys_backdoor", label: "Benny's Back Door" },
    { id: "bennys_roof_ladder", x: 1758, y: 195, w: 85, h: 120, type: "roof", target: "bennys_roof", label: "Benny's Roof" },
    { id: "bennys_shoplifting_trigger", x: 1300, y: 255, w: 320, h: 210, type: "crime_trigger", crime: "bennys_shoplifting", label: "Shoplifting Trigger" },
    { id: "bennys_evidence", x: 1510, y: 380, w: 80, h: 80, type: "evidence", evidenceId: "stolen_cigarettes", label: "Stolen Cigarettes" },
    { id: "bennys_witness", x: 1370, y: 505, w: 115, h: 80, type: "witness", npcId: "marlene_pike", label: "Clerk Witness" },
    { id: "red_gull_front", x: 1305, y: 1145, w: 120, h: 65, type: "door", target: "red_gull_interior", label: "Red Gull" },
    { id: "red_gull_witness", x: 1280, y: 1020, w: 135, h: 95, type: "witness", npcId: "diner_witness", label: "Diner Witness" },
    { id: "laundromat_front", x: 1740, y: 1148, w: 110, h: 65, type: "door", target: "laundromat_interior", label: "Laundromat" },
    { id: "payphone", x: 1575, y: 1185, w: 95, h: 95, type: "payphone", label: "Payphone" },
    { id: "loading_dock", x: 1815, y: 360, w: 120, h: 220, type: "loading_dock", label: "Loading Dock" }
  ];

  const SPAWN_POINTS = [
    { id: "player_start", x: 550, y: 675, type: "player" },
    { id: "detective_sedan", x: 535, y: 815, type: "vehicle", vehicle: "unmarked_sedan" },
    { id: "backup_sedan", x: 815, y: 525, type: "vehicle", vehicle: "backup_sedan" },
    { id: "precinct_worker", x: 465, y: 670, type: "pedestrian" },
    { id: "bennys_suspect", x: 1390, y: 345, type: "suspect", npc: "eddie_cross" },
    { id: "bennys_suspect_flee", x: 1810, y: 530, type: "suspect_flee" },
    { id: "bennys_clerk", x: 1395, y: 520, type: "witness", npc: "marlene_pike" },
    { id: "stolen_cigarettes", x: 1535, y: 410, type: "evidence", evidence: "stolen_cigarettes" },
    { id: "diner_witness", x: 1330, y: 1035, type: "witness", npc: "diner_witness" },
    { id: "laundromat_civilian", x: 1770, y: 1180, type: "pedestrian" },
    { id: "traffic_west_entry", x: -40, y: 760, type: "traffic_spawn" },
    { id: "traffic_east_exit", x: 2090, y: 760, type: "traffic_despawn" },
    { id: "traffic_east_entry", x: 2090, y: 1320, type: "traffic_spawn" },
    { id: "traffic_west_exit", x: -40, y: 1320, type: "traffic_despawn" }
  ];

