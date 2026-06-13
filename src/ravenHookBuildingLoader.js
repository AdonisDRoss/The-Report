// The Report / Raven Hook building loader — HYBRID_NO_ERASE_V3
// This pack avoids aggressive background cuts.
// Some assets may still need manual transparency masking.

export const RAVEN_HOOK_BUILDINGS = [
  {
    "key": "raven_hook_police_station",
    "path": "assets/buildings/hero/raven_hook_police_station_main_slotfit.png",
    "category": "hero",
    "z": "building",
    "collision": "main_rect_plus_front_projection",
    "needsManualCut": false
  },
  {
    "key": "courthouse_city_hall",
    "path": "assets/buildings/hero/courthouse_city_hall_large_main_slotfit.png",
    "category": "hero",
    "z": "building",
    "collision": "main_rect_plus_entrance_projection",
    "needsManualCut": false
  },
  {
    "key": "bennys_market",
    "path": "assets/buildings/hero/bennys_market_main_slotfit.png",
    "category": "hero",
    "z": "building",
    "collision": "main_rect_plus_right_stockroom",
    "needsManualCut": false
  },
  {
    "key": "red_gull_diner",
    "path": "assets/buildings/hero/red_gull_diner_main_slotfit.png",
    "category": "hero",
    "z": "building",
    "collision": "rounded_rect_body_only",
    "needsManualCut": false
  },
  {
    "key": "russo_auto_body_main",
    "path": "assets/buildings/hero/russo_auto_body_main_roof_slotfit.png",
    "category": "hero",
    "z": "building",
    "collision": "main_rect_plus_lower_left_office",
    "needsManualCut": false
  },
  {
    "key": "bell_cartage_cold_storage",
    "path": "assets/buildings/hero/bell_cartage_cold_storage_main_slotfit.png",
    "category": "hero",
    "z": "building",
    "collision": "main_warehouse_body",
    "needsManualCut": false
  },
  {
    "key": "civic_service_tow",
    "path": "assets/buildings/hero/civic_service_tow_main_slotfit.png",
    "category": "hero",
    "z": "building",
    "collision": "main_rect_body",
    "needsManualCut": false
  },
  {
    "key": "quick_wash_laundromat",
    "path": "assets/buildings/hero/quick_wash_laundromat_main_slotfit.png",
    "category": "hero",
    "z": "building",
    "collision": "main_rect_body",
    "needsManualCut": false
  },
  {
    "key": "march_legal_services",
    "path": "assets/buildings/hero/march_legal_services_main_slotfit.png",
    "category": "hero",
    "z": "building",
    "collision": "main_rect_body",
    "needsManualCut": false
  },
  {
    "key": "red_velvet_lounge",
    "path": "assets/buildings/hero/red_velvet_lounge_main_slotfit.png",
    "category": "hero",
    "z": "building",
    "collision": "main_rect_body",
    "needsManualCut": false
  },
  {
    "key": "moretti_social_club",
    "path": "assets/buildings/hero/moretti_social_club_main_slotfit.png",
    "category": "hero",
    "z": "building",
    "collision": "main_rect_body",
    "needsManualCut": false
  },
  {
    "key": "vescari_social_club",
    "path": "assets/buildings/hero/vescari_social_club_main_slotfit.png",
    "category": "hero",
    "z": "building",
    "collision": "main_rect_body",
    "needsManualCut": false
  },
  {
    "key": "raven_pawn",
    "path": "assets/buildings/hero/raven_pawn_main_slotfit.png",
    "category": "hero",
    "z": "building",
    "collision": "main_body_ignore_side_props",
    "needsManualCut": false
  },
  {
    "key": "neon_nights",
    "path": "assets/buildings/hero/neon_nights_main_slotfit.png",
    "category": "hero",
    "z": "building",
    "collision": "main_body_ignore_neon_overhangs",
    "needsManualCut": true
  },
  {
    "key": "blue_lantern_supper_club",
    "path": "assets/buildings/hero/blue_lantern_supper_club_main_slotfit.png",
    "category": "hero",
    "z": "building",
    "collision": "main_body_ignore_freestanding_board",
    "needsManualCut": false
  },
  {
    "key": "adult_playhouse",
    "path": "assets/buildings/hero/adult_playhouse_main_slotfit.png",
    "category": "hero",
    "z": "building",
    "collision": "main_body_ignore_sign_overhangs",
    "needsManualCut": false
  },
  {
    "key": "kims_corner_market_malcolm_apartment",
    "path": "assets/buildings/hero/kims_corner_market_malcolm_apartment_main_slotfit.png",
    "category": "hero",
    "z": "building",
    "collision": "main_rect_ignore_fire_escape_roof_props",
    "needsManualCut": false
  },
  {
    "key": "south_hook_gas_service_main",
    "path": "assets/buildings/hero/south_hook_gas_service_main_slotfit.png",
    "category": "hero",
    "z": "building",
    "collision": "office_rect_plus_pump_islands",
    "needsManualCut": false
  },
  {
    "key": "south_hook_gas_service_full_reference",
    "path": "assets/buildings/references/south_hook_gas_service_full_layout_reference.png",
    "category": "reference",
    "z": "reference",
    "collision": "reference_only",
    "needsManualCut": false
  },
  {
    "key": "police_motor_pool_overlay_open",
    "path": "assets/buildings/overlays/raven_hook_police_motor_pool_overlay_open.png",
    "category": "overlay",
    "z": "above_vehicle",
    "collision": "posts_only",
    "needsManualCut": false
  },
  {
    "key": "russo_auto_body_garage_overlay_open",
    "path": "assets/buildings/overlays/russo_auto_body_garage_overlay_open.png",
    "category": "overlay",
    "z": "above_vehicle",
    "collision": "side_posts_only",
    "needsManualCut": false
  },
  {
    "key": "south_hook_gas_canopy_overlay",
    "path": "assets/buildings/overlays/south_hook_gas_canopy_overlay.png",
    "category": "overlay",
    "z": "above_vehicle",
    "collision": "support_posts_only",
    "needsManualCut": false
  },
  {
    "key": "filler_small_brick_office",
    "path": "assets/buildings/fillers/filler_small_brick_office_main_slotfit.png",
    "category": "filler",
    "z": "building",
    "collision": "main_rect_body",
    "needsManualCut": false
  },
  {
    "key": "filler_medium_old_apartment_block",
    "path": "assets/buildings/fillers/filler_medium_old_apartment_block_main_slotfit.png",
    "category": "filler",
    "z": "building",
    "collision": "main_rect_ignore_fire_escapes",
    "needsManualCut": false
  },
  {
    "key": "filler_narrow_row_storefront",
    "path": "assets/buildings/fillers/filler_narrow_row_storefront_main_slotfit.png",
    "category": "filler",
    "z": "building",
    "collision": "main_rect_body",
    "needsManualCut": false
  },
  {
    "key": "filler_generic_warehouse",
    "path": "assets/buildings/fillers/filler_generic_warehouse_main_slotfit.png",
    "category": "filler",
    "z": "building",
    "collision": "main_rect_body",
    "needsManualCut": false
  },
  {
    "key": "filler_corner_office_building",
    "path": "assets/buildings/fillers/filler_corner_office_building_main_slotfit.png",
    "category": "filler",
    "z": "building",
    "collision": "main_polygon_body",
    "needsManualCut": false
  },
  {
    "key": "filler_industrial_garage_shell",
    "path": "assets/buildings/fillers/filler_industrial_garage_shell_main_slotfit.png",
    "category": "filler",
    "z": "building",
    "collision": "main_rect_body",
    "needsManualCut": false
  },
  {
    "key": "filler_plain_downtown_commercial_block",
    "path": "assets/buildings/fillers/filler_plain_downtown_commercial_block_main_slotfit.png",
    "category": "filler",
    "z": "building",
    "collision": "main_rect_body",
    "needsManualCut": false
  },
  {
    "key": "filler_small_clinic",
    "path": "assets/buildings/fillers/filler_small_clinic_main_slotfit.png",
    "category": "filler",
    "z": "building",
    "collision": "main_rect_body",
    "needsManualCut": false
  },
  {
    "key": "filler_storage_building",
    "path": "assets/buildings/fillers/filler_storage_building_main_slotfit.png",
    "category": "filler",
    "z": "building",
    "collision": "main_rect_body",
    "needsManualCut": false
  }
];

export function preloadRavenHookBuildings(scene) {
  for (const a of RAVEN_HOOK_BUILDINGS) scene.load.image(a.key, a.path);
}

export function addRavenHookBuilding(scene, key, x, y, opts = {}) {
  const sprite = scene.add.image(x, y, key);
  sprite.setOrigin(opts.originX ?? 0.5, opts.originY ?? 0.5);
  sprite.setDepth(opts.depth ?? 20);
  if (opts.scale) sprite.setScale(opts.scale);
  sprite.setData("buildingKey", key);
  return sprite;
}
