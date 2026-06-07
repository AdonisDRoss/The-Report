(() => {
    const WIDTH = 960;
    const HEIGHT = 540;
    const WORLD_W = 2000;
    const WORLD_H = 1200;

    const COLORS = {
      grass: 0x141b17,
      road: 0x20262d,
      roadEdge: 0x101419,
      line: 0xd6b552,
      sidewalk: 0x52534d,
      paper: 0xd7c39c,
      white: 0xffffff,
      black: 0x000000,
      blue: 0x2f75ff,
      cyan: 0x31d4ff,
      pink: 0xff4fa3,
      amber: 0xffbd55,
      red: 0xff4a4a,
      green: 0x80ff8f,
      precinct: 0x243955,
      garage: 0x364252,
      market: 0x5b4525,
      diner: 0x5a303b,
      laundry: 0x2d4d5f,
      lot: 0x30343a
    };

    const save = {
      day: 1,
      rank: "Detective Trainee",
      xp: 0,
      fuel: 76,
      damage: 0,
      trunk: [],
      reports: []
    };

    function makeText(scene, x, y, value, size = 16, color = "#ffffff") {
      return scene.add.text(x, y, value, {
        fontFamily: "Courier New",
        fontSize: `${size}px`,
        color,
        stroke: "#000000",
        strokeThickness: 3,
        wordWrap: { width: 900 }
      });
    }

    function dist(a, b) {
      return Phaser.Math.Distance.Between(a.x, a.y, b.x, b.y);
    }

    function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

    class TitleScene extends Phaser.Scene {
      constructor() { super("TitleScene"); }

      create() {
        this.cameras.main.setBackgroundColor("#05070b");
        const g = this.add.graphics();
        g.fillStyle(0x05070b, 1).fillRect(0, 0, WIDTH, HEIGHT);

        // 80s skyline / road mood.
        for (let i = 0; i < 20; i++) {
          const x = Phaser.Math.Between(-20, WIDTH - 20);
          const w = Phaser.Math.Between(35, 85);
          const h = Phaser.Math.Between(80, 255);
          const y = HEIGHT - 150 - h + Phaser.Math.Between(-10, 28);
          g.fillStyle(0x0f1621, 1).fillRect(x, y, w, h);
          if (i % 3 === 0) g.fillStyle(COLORS.pink, 0.75).fillRect(x + 8, y + 20, w - 16, 4);
          if (i % 4 === 0) g.fillStyle(COLORS.cyan, 0.75).fillRect(x + 8, y + 48, w - 16, 4);
        }
        g.fillStyle(0x111827, 1).fillRect(0, HEIGHT - 145, WIDTH, 145);
        g.lineStyle(4, COLORS.line, 0.6).lineBetween(0, HEIGHT - 72, WIDTH, HEIGHT - 72);
        for (let x = 0; x < WIDTH; x += 90) g.lineBetween(x, HEIGHT - 72, x + 35, HEIGHT - 72);

        makeText(this, WIDTH / 2, 88, "THE REPORT", 60, "#f4d28a").setOrigin(0.5);
        makeText(this, WIDTH / 2, 150, "RAVEN HOOK CENTRAL v0.3", 24, "#86e7ff").setOrigin(0.5);
        makeText(this, WIDTH / 2, 190, "FIRST BUILD: RH-CEN-01 PRECINCT BLOCK + RH-CEN-02 MARKET BLOCK", 16, "#ffffff").setOrigin(0.5);
        makeText(this, WIDTH / 2, 245, "Complete the first case loop: Precinct → Market → Crime → Evidence → Trunk → Report", 17, "#dddddd").setOrigin(0.5);
        makeText(this, WIDTH / 2, 318, "PRESS ENTER / TAP TO START SHIFT", 22, "#ff78bd").setOrigin(0.5);
        makeText(this, WIDTH / 2, 388, "Controls: WASD/Arrows or SNES mobile pad | A interact | B arrest | X trunk | Y report", 15, "#eeeeee").setOrigin(0.5);

        this.input.keyboard.once("keydown-ENTER", () => this.scene.start("GameScene"));
        this.input.once("pointerdown", () => this.scene.start("GameScene"));
      }
    }

    class GameScene extends Phaser.Scene {
      constructor() { super("GameScene"); }

      create() {
        this.cameras.main.setBackgroundColor("#0f141b");
        this.physics.world.setBounds(0, 0, WORLD_W, WORLD_H);
        this.keys = this.input.keyboard.addKeys({
          up: "W", down: "S", left: "A", right: "D",
          arrowUp: "UP", arrowDown: "DOWN", arrowLeft: "LEFT", arrowRight: "RIGHT",
          interact: "E", arrest: "SPACE", trunk: "T", report: "R"
        });
        this.input.keyboard.on("keydown-E", () => this.handleInteract());
        this.input.keyboard.on("keydown-SPACE", () => this.tryArrest());
        this.input.keyboard.on("keydown-T", () => this.handleTrunk());
        this.input.keyboard.on("keydown-R", () => this.tryReport());

        this.shiftMinutes = 8 * 60;
        this.inCar = false;
        this.message = "Start shift at Raven Hook Precinct. Walk to the unmarked sedan.";
        this.messageTimer = 5000;
        this.objective = "Start at RH-CEN-01. Enter the unmarked sedan and patrol Central Ave.";
        this.dispatch = "Radio quiet. Raven Hook Central patrol begins.";
        this.caseState = "patrol";
        this.caseTimer = 0;
        this.playerInventory = [];
        this.evidenceItems = [];
        this.hasWitnessStatement = false;
        this.suspectData = { name: "Eddie Cross", arrested: false, escaped: false };

        this.buildMap();
        this.createActors();
        this.createHUD();
        this.createTouchControls();

        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, WORLD_W, WORLD_H);
      }

      buildMap() {
        this.obstacles = this.physics.add.staticGroup();
        const g = this.add.graphics();
        g.fillStyle(COLORS.grass, 1).fillRect(0, 0, WORLD_W, WORLD_H);

        // Campus background halves.
        g.fillStyle(0x101820, 0.5).fillRect(0, 0, 1000, WORLD_H);
        g.fillStyle(0x181518, 0.5).fillRect(1000, 0, 1000, WORLD_H);
        g.lineStyle(3, 0xffbd55, 0.55).lineBetween(1000, 0, 1000, WORLD_H);
        makeText(this, 500, 30, "RH-CEN-01 — PRECINCT BLOCK", 20, "#86e7ff").setOrigin(0.5);
        makeText(this, 1500, 30, "RH-CEN-02 — MARKET BLOCK", 20, "#f4d28a").setOrigin(0.5);

        // Roads.
        this.drawRoad(g, 0, 500, WORLD_W, 210, "horizontal");      // Central Ave
        this.drawRoad(g, 390, 0, 180, WORLD_H, "vertical");        // Hook St / precinct side
        this.drawRoad(g, 1435, 0, 180, WORLD_H, "vertical");       // Market St
        this.drawRoad(g, 0, 850, WORLD_W, 125, "horizontal");      // back loop/service road

        // Sidewalk bands.
        g.fillStyle(COLORS.sidewalk, 1);
        g.fillRect(0, 462, WORLD_W, 38);
        g.fillRect(0, 710, WORLD_W, 38);
        g.fillRect(0, 812, WORLD_W, 38);
        g.fillRect(0, 975, WORLD_W, 38);
        g.fillRect(352, 0, 38, WORLD_H);
        g.fillRect(570, 0, 38, WORLD_H);
        g.fillRect(1397, 0, 38, WORLD_H);
        g.fillRect(1615, 0, 38, WORLD_H);

        makeText(this, 990, 600, "CENTRAL AVE", 18, "#f4d28a").setOrigin(0.5);
        makeText(this, 470, 250, "HOOK ST", 16, "#f4d28a").setOrigin(0.5).setAngle(-90);
        makeText(this, 1515, 250, "MARKET ST", 16, "#f4d28a").setOrigin(0.5).setAngle(-90);

        // District loop line.
        g.lineStyle(4, COLORS.line, 0.8).strokeRect(80, 90, 1840, 1000);
        makeText(this, 1000, 105, "PRECINCT LOOP", 14, "#f4d28a").setOrigin(0.5);

        this.locations = {};
        // RH-CEN-01: Precinct campus.
        this.drawBuilding(115, 160, 260, 170, "RAVEN HOOK\nPRECINCT", COLORS.precinct, "#86e7ff", "station");
        this.drawBuilding(620, 160, 230, 145, "GARAGE", COLORS.garage, "#cccccc", "garage");
        this.drawLot(g, 120, 760, 275, 140, "POLICE PARKING", "parking");
        this.drawLot(g, 615, 760, 245, 140, "IMPOUND FENCE", "impound");
        this.drawMarker(g, 245, 370, 0x2f75ff, "REPORT\nDESK", "reportDesk");
        this.drawMarker(g, 690, 340, 0x80ff8f, "EVIDENCE\nDROP-OFF", "evidenceDrop");
        this.drawMarker(g, 780, 705, 0xffbd55, "DEPT\nFUEL", "fuelPump");

        // RH-CEN-02: Market campus.
        this.drawBuilding(1215, 170, 255, 165, "BENNY'S\nMARKET", COLORS.market, "#f4d28a", "market");
        this.drawBuilding(1640, 175, 225, 150, "RED GULL\nDINER", COLORS.diner, "#ff78bd", "diner");
        this.drawBuilding(1215, 760, 235, 140, "LAUNDROMAT", COLORS.laundry, "#86e7ff", "laundry");
        this.drawLot(g, 1640, 750, 235, 150, "SIDE PARKING", "sideParking");
        this.drawMarker(g, 1510, 380, 0x31d4ff, "PAYPHONE", "payphone");
        this.drawMarker(g, 1350, 375, 0xff4a4a, "CRIME\nSPAWN", "crimeSpawn");

        // Parked cars, props.
        this.parkedCars = [];
        [[190,800,0x1c2f45],[260,800,0x1c2f45],[330,800,0x1c2f45],[680,800,0x404047],[740,800,0x404047],[1700,790,0x6b2d2d],[1775,790,0x253f62],[1700,860,0x4d4d35]].forEach(([x,y,c]) => this.drawParkedCar(g,x,y,c));
        this.drawStreetProps(g);
      }

      drawRoad(g, x, y, w, h, dir) {
        g.fillStyle(COLORS.roadEdge, 1).fillRect(x, y, w, h);
        g.fillStyle(COLORS.road, 1).fillRect(x + 8, y + 8, w - 16, h - 16);
        g.lineStyle(4, COLORS.line, 0.72);
        if (dir === "horizontal") {
          const mid = y + h / 2;
          for (let px = x + 25; px < x + w - 50; px += 95) g.lineBetween(px, mid, px + 45, mid);
        } else {
          const mid = x + w / 2;
          for (let py = y + 25; py < y + h - 50; py += 95) g.lineBetween(mid, py, mid, py + 45);
        }
      }

      drawBuilding(x, y, w, h, label, color, labelColor, key) {
        this.add.rectangle(x + w / 2 + 10, y + h / 2 + 10, w, h, 0x000000, 0.35);
        this.add.rectangle(x + w / 2, y + h / 2, w, h, color, 1);
        this.add.rectangle(x + w / 2, y + 22, w - 24, 32, 0x090909, 0.42);
        makeText(this, x + w / 2, y + 24, label, 15, labelColor).setOrigin(0.5);
        const body = this.add.rectangle(x + w / 2, y + h / 2, w, h, color, 0.01);
        this.physics.add.existing(body, true);
        this.obstacles.add(body);
        this.locations[key] = { x: x + w / 2, y: y + h + 45, w, h, name: label.replace("\n", " ") };
      }

      drawLot(g, x, y, w, h, label, key) {
        g.fillStyle(COLORS.lot, 1).fillRect(x, y, w, h);
        g.lineStyle(2, 0xa0a0a0, 0.45);
        for (let px = x + 35; px < x + w - 20; px += 56) g.lineBetween(px, y + 15, px, y + h - 15);
        makeText(this, x + w / 2, y + 18, label, 14, "#cccccc").setOrigin(0.5);
        this.locations[key] = { x: x + w / 2, y: y + h / 2, w, h, name: label };
      }

      drawMarker(g, x, y, color, label, key) {
        g.fillStyle(0x05070b, 1).fillRoundedRect(x - 55, y - 25, 110, 50, 8);
        g.lineStyle(2, color, 1).strokeRoundedRect(x - 55, y - 25, 110, 50, 8);
        makeText(this, x, y - 12, label, 12, "#ffffff").setOrigin(0.5);
        this.locations[key] = { x, y, name: label.replace("\n", " ") };
      }

      drawParkedCar(g, x, y, color) {
        g.fillStyle(color, 1).fillRoundedRect(x - 28, y - 15, 56, 30, 6);
        g.fillStyle(0x87a5b8, 1).fillRoundedRect(x - 8, y - 11, 22, 22, 4);
        this.parkedCars.push({ x, y });
      }

      drawStreetProps(g) {
        const props = [
          [980, 460, 0x31d4ff], [1160, 460, 0xff4fa3], [1880, 450, 0xffbd55],
          [1140, 725, 0x31d4ff], [1500, 725, 0xff4a4a], [520, 460, 0xffbd55],
          [900, 735, 0x777777], [1060, 735, 0x777777], [1320, 942, 0x777777]
        ];
        props.forEach(([x,y,c]) => {
          g.fillStyle(0x05070b, 1).fillRect(x - 9, y - 17, 18, 34);
          g.fillStyle(c, 1).fillRect(x - 6, y - 14, 12, 8);
        });
        // Alley connector behind market.
        g.fillStyle(0x0c0e12, 1).fillRect(1165, 905, 745, 62);
        makeText(this, 1550, 925, "MARKET BACK ALLEY", 13, "#999999").setOrigin(0.5);
      }

      createActors() {
        this.player = this.makeDetective(this.locations.station.x, this.locations.station.y + 60);
        this.physics.add.collider(this.player, this.obstacles);

        this.car = this.makeCar(this.locations.parking.x - 55, this.locations.parking.y + 25, 0x101820, true);
        this.physics.add.collider(this.car, this.obstacles, () => {
          const speed = this.car.body.velocity.length();
          if (speed > 180) save.damage = clamp(save.damage + speed * 0.0008, 0, 100);
        });

        this.civilians = this.physics.add.group();
        this.spawnCivilians();
        this.physics.add.collider(this.civilians, this.obstacles);

        this.traffic = [];
        this.spawnTraffic();

        this.suspect = this.makeNPC(1350, 385, 0xc43a3a, "Eddie Cross", "suspect");
        this.suspect.setVisible(false);
        this.suspect.body.enable = false;
        this.suspect.escapePoint = new Phaser.Math.Vector2(this.locations.sideParking.x + 80, this.locations.sideParking.y + 35);

        this.clerk = this.makeNPC(1306, 380, 0xe0b56c, "Marlene Pike", "clerk");
        this.clerk.setVisible(false);
        this.clerk.body.enable = false;
      }

      makeDetective(x, y) {
        const p = this.add.container(x, y);
        p.add(this.add.rectangle(0, 8, 22, 30, 0x3a3028, 1));
        p.add(this.add.circle(0, -10, 8, 0xb87845, 1));
        p.add(this.add.rectangle(0, -18, 25, 5, 0x121212, 1));
        p.add(this.add.rectangle(0, 4, 4, 18, 0xa53838, 1));
        this.physics.add.existing(p);
        p.body.setSize(22, 34).setOffset(-11, -17).setCollideWorldBounds(true);
        return p;
      }

      makeCar(x, y, color, detective = false) {
        const c = this.add.container(x, y);
        c.add(this.add.rectangle(0, 0, 68, 34, color, 1));
        c.add(this.add.rectangle(16, 0, 24, 28, detective ? 0x1c2f45 : 0x333333, 1));
        c.add(this.add.rectangle(-10, 0, 26, 26, detective ? 0x30475c : 0x656565, 1));
        c.add(this.add.rectangle(-35, -9, 5, 7, COLORS.red, 1));
        c.add(this.add.rectangle(-35, 9, 5, 7, COLORS.red, 1));
        if (detective) c.add(this.add.rectangle(0, -19, 18, 4, COLORS.blue, 1));
        this.physics.add.existing(c);
        c.body.setSize(68, 36).setOffset(-34, -18).setCollideWorldBounds(true);
        c.body.setDrag(115);
        c.body.setMaxVelocity(480);
        return c;
      }

      makeNPC(x, y, color, name, role) {
        const npc = this.add.container(x, y);
        npc.add(this.add.circle(0, -8, 7, 0xc9915b, 1));
        npc.add(this.add.rectangle(0, 9, 18, 25, color, 1));
        npc.npcName = name;
        npc.role = role;
        npc.speed = Phaser.Math.Between(28, 54);
        npc.wanderTarget = new Phaser.Math.Vector2(x, y);
        npc.nextThink = 0;
        npc.nameTag = makeText(this, x, y - 35, name, 11, "#ffffff").setOrigin(0.5).setVisible(false);
        this.physics.add.existing(npc);
        npc.body.setSize(18, 32).setOffset(-9, -16).setCollideWorldBounds(true);
        this.civilians.add(npc);
        return npc;
      }

      spawnCivilians() {
        const names = ["Ray", "Donna", "Vic", "Sharon", "Lenny", "Tina", "Mack", "Nora", "Cal", "Rita"];
        const colors = [0x4f7cac, 0x8a4f7a, 0x8f6b32, 0x3c8760, 0xa94d43, 0x6b5ca5];
        const points = [
          [1190,450],[1280,455],[1560,450],[1720,455],[1195,720],
          [1350,735],[1650,725],[1810,720],[725,455],[305,455]
        ];
        points.forEach((pt, i) => this.makeNPC(pt[0], pt[1], colors[i % colors.length], names[i % names.length], "civilian"));
      }

      spawnTraffic() {
        const carA = this.makeTrafficCar(-60, 557, 0x6c3333, 120, "east");
        const carB = this.makeTrafficCar(WORLD_W + 60, 650, 0x33456c, 95, "west");
        const carC = this.makeTrafficCar(1515, -60, 0x4b4b35, 80, "south");
        this.traffic.push(carA, carB, carC);
      }

      makeTrafficCar(x, y, color, speed, dir) {
        const c = this.makeCar(x, y, color, false);
        c.trafficDir = dir;
        c.trafficSpeed = speed;
        c.body.setImmovable(true);
        return c;
      }

      createHUD() {
        this.hud = this.add.container(0, 0).setScrollFactor(0).setDepth(9999);
        const top = this.add.rectangle(0, 0, WIDTH, 82, 0x000000, 0.68).setOrigin(0, 0);
        const bottom = this.add.rectangle(0, HEIGHT - 78, WIDTH, 78, 0x000000, 0.72).setOrigin(0, 0);
        this.hud.add([top, bottom]);
        this.caseText = makeText(this, 14, 10, "", 15, "#f4d28a").setScrollFactor(0);
        this.objectiveText = makeText(this, 14, 36, "", 14, "#ffffff").setScrollFactor(0);
        this.dispatchText = makeText(this, 14, HEIGHT - 68, "", 14, "#86e7ff").setScrollFactor(0);
        this.helpText = makeText(this, 14, HEIGHT - 38, "", 13, "#eeeeee").setScrollFactor(0);
        this.carText = makeText(this, WIDTH - 300, HEIGHT - 64, "", 16, "#80ff8f").setScrollFactor(0);
        this.rankText = makeText(this, WIDTH - 330, 10, "", 15, "#ffffff").setScrollFactor(0);
        this.timeText = makeText(this, WIDTH - 330, 38, "", 15, "#ff78bd").setScrollFactor(0);
        this.messageText = makeText(this, WIDTH / 2, 95, "", 16, "#ffffff").setOrigin(0.5).setScrollFactor(0).setDepth(10000);
        this.hud.add([this.caseText, this.objectiveText, this.dispatchText, this.helpText, this.carText, this.rankText, this.timeText, this.messageText]);
      }

      createTouchControls() {
        this.input.addPointer(4);
        this.touch = {
          up: false, down: false, left: false, right: false,
          axisX: 0, axisY: 0,
          stickMode: true,
          stickPointer: null
        };

        const DEPTH = 10001;
        const padY = HEIGHT - 226;
        const panelFill = 0x1b1a24;
        const panelLine = 0x8f8aa3;
        const snesPurple = 0x68608a;
        const snesDark = 0x2a2834;
        const snesPink = 0xb65b8b;
        const snesBlue = 0x4f6fa8;
        const snesText = "#f1e8d0";

        const makeLabel = (x, y, text, size = 12, color = snesText) => {
          return this.add.text(x, y, text, {
            fontFamily: "Courier New",
            fontSize: `${size}px`,
            color,
            stroke: "#000000",
            strokeThickness: 3,
            align: "center"
          }).setOrigin(0.5).setScrollFactor(0).setDepth(DEPTH + 2);
        };

        const addButton = (x, y, r, label, sub, cb, fill = snesPurple) => {
          const shadow = this.add.circle(x + 3, y + 4, r, 0x000000, 0.5).setScrollFactor(0).setDepth(DEPTH);
          const btn = this.add.circle(x, y, r, fill, 0.95).setScrollFactor(0).setDepth(DEPTH + 1).setInteractive({ useHandCursor: true });
          btn.setStrokeStyle(3, 0xddd0b6, 0.85);
          const main = makeLabel(x, y - 4, label, 18);
          const small = sub ? makeLabel(x, y + 14, sub, 8, "#d7d1e8") : null;
          const press = () => { btn.setScale(0.92); cb(); };
          const release = () => btn.setScale(1);
          btn.on("pointerdown", press);
          btn.on("pointerup", release);
          btn.on("pointerout", release);
          return { shadow, btn, main, small };
        };

        // Left SNES-style movement panel.
        const panel = this.add.rectangle(122, padY + 118, 230, 172, panelFill, 0.82).setScrollFactor(0).setDepth(DEPTH);
        panel.setStrokeStyle(3, panelLine, 0.75);
        makeLabel(122, padY + 44, "MOVE / DRIVE", 11, "#86e7ff");

        // Toggle: virtual stick on/off. Off falls back to SNES D-pad.
        const toggleBox = this.add.rectangle(122, padY + 68, 118, 28, snesDark, 0.95).setScrollFactor(0).setDepth(DEPTH + 1).setInteractive({ useHandCursor: true });
        toggleBox.setStrokeStyle(2, 0xd7c39c, 0.9);
        this.stickToggleText = makeLabel(122, padY + 68, "STICK ON", 11, "#f4d28a");

        // Stick graphics.
        this.stickBase = this.add.circle(105, padY + 126, 50, 0x000000, 0.36).setScrollFactor(0).setDepth(DEPTH + 1);
        this.stickBase.setStrokeStyle(4, 0xd7c39c, 0.7);
        this.stickKnob = this.add.circle(105, padY + 126, 22, snesPurple, 0.96).setScrollFactor(0).setDepth(DEPTH + 2);
        this.stickKnob.setStrokeStyle(3, 0xf1e8d0, 0.9);
        this.stickHit = this.add.circle(105, padY + 126, 68, 0x000000, 0.01).setScrollFactor(0).setDepth(DEPTH + 3).setInteractive({ useHandCursor: true });
        this.stickCenter = new Phaser.Math.Vector2(105, padY + 126);
        this.stickRadius = 48;

        const updateStick = (pointer) => {
          if (!this.touch.stickMode || this.touch.stickPointer !== pointer.id) return;
          const dx = pointer.x - this.stickCenter.x;
          const dy = pointer.y - this.stickCenter.y;
          const len = Math.min(Math.sqrt(dx * dx + dy * dy), this.stickRadius);
          const ang = Math.atan2(dy, dx);
          const nx = len > 0 ? Math.cos(ang) * len : 0;
          const ny = len > 0 ? Math.sin(ang) * len : 0;
          this.touch.axisX = Math.abs(nx / this.stickRadius) < 0.12 ? 0 : nx / this.stickRadius;
          this.touch.axisY = Math.abs(ny / this.stickRadius) < 0.12 ? 0 : ny / this.stickRadius;
          this.stickKnob.setPosition(this.stickCenter.x + nx, this.stickCenter.y + ny);
        };
        const resetStick = (pointer) => {
          if (this.touch.stickPointer !== pointer.id) return;
          this.touch.stickPointer = null;
          this.touch.axisX = 0;
          this.touch.axisY = 0;
          this.stickKnob.setPosition(this.stickCenter.x, this.stickCenter.y);
        };
        this.stickHit.on("pointerdown", (pointer) => {
          if (!this.touch.stickMode) return;
          this.touch.stickPointer = pointer.id;
          updateStick(pointer);
        });
        this.input.on("pointermove", updateStick);
        this.input.on("pointerup", resetStick);

        // SNES D-pad fallback.
        this.dpadParts = [];
        const dpadCenter = new Phaser.Math.Vector2(105, padY + 126);
        const makeDpad = (x, y, w, h, key, label) => {
          const r = this.add.rectangle(x, y, w, h, snesDark, 0.94).setScrollFactor(0).setDepth(DEPTH + 1).setInteractive({ useHandCursor: true });
          r.setStrokeStyle(2, 0xd7c39c, 0.65);
          const txt = makeLabel(x, y, label, 18);
          r.on("pointerdown", () => { this.touch[key] = true; r.setFillStyle(0x4a465f, 0.98); });
          r.on("pointerup", () => { this.touch[key] = false; r.setFillStyle(snesDark, 0.94); });
          r.on("pointerout", () => { this.touch[key] = false; r.setFillStyle(snesDark, 0.94); });
          this.dpadParts.push(r, txt);
        };
        makeDpad(dpadCenter.x, dpadCenter.y - 38, 44, 42, "up", "▲");
        makeDpad(dpadCenter.x, dpadCenter.y + 38, 44, 42, "down", "▼");
        makeDpad(dpadCenter.x - 38, dpadCenter.y, 42, 44, "left", "◀");
        makeDpad(dpadCenter.x + 38, dpadCenter.y, 42, 44, "right", "▶");
        const mid = this.add.rectangle(dpadCenter.x, dpadCenter.y, 44, 44, snesDark, 0.98).setScrollFactor(0).setDepth(DEPTH + 1);
        mid.setStrokeStyle(2, 0xd7c39c, 0.65);
        this.dpadParts.push(mid);

        const applyStickToggle = () => {
          const on = this.touch.stickMode;
          this.stickToggleText.setText(on ? "STICK ON" : "D-PAD ON");
          this.stickBase.setVisible(on);
          this.stickKnob.setVisible(on);
          this.stickHit.setVisible(on);
          this.dpadParts.forEach(p => p.setVisible(!on));
          this.touch.up = this.touch.down = this.touch.left = this.touch.right = false;
          this.touch.axisX = 0;
          this.touch.axisY = 0;
          this.stickKnob.setPosition(this.stickCenter.x, this.stickCenter.y);
        };
        toggleBox.on("pointerdown", () => {
          this.touch.stickMode = !this.touch.stickMode;
          applyStickToggle();
        });
        applyStickToggle();

        // Right SNES-style action panel.
        const actionPanel = this.add.rectangle(WIDTH - 142, padY + 118, 250, 172, panelFill, 0.82).setScrollFactor(0).setDepth(DEPTH);
        actionPanel.setStrokeStyle(3, panelLine, 0.75);
        makeLabel(WIDTH - 142, padY + 44, "ACTIONS", 11, "#86e7ff");
        addButton(WIDTH - 90, padY + 120, 28, "A", "E", () => this.handleInteract(), snesPink);
        addButton(WIDTH - 145, padY + 153, 28, "B", "ARREST", () => this.tryArrest(), snesPink);
        addButton(WIDTH - 145, padY + 87, 28, "X", "TRUNK", () => this.handleTrunk(), snesBlue);
        addButton(WIDTH - 200, padY + 120, 28, "Y", "REPORT", () => this.tryReport(), snesBlue);
        addButton(WIDTH - 184, padY + 52, 20, "SEL", "TRUNK", () => this.handleTrunk(), 0x34313f);
        addButton(WIDTH - 100, padY + 52, 20, "STA", "REPORT", () => this.tryReport(), 0x34313f);
      }

      update(time, delta) {
        const dt = delta / 1000;
        this.shiftMinutes = Math.min(20 * 60, this.shiftMinutes + dt * 4);
        if (this.inCar) this.updateCar(delta); else this.updatePlayer(delta);
        this.updateTraffic(delta);
        this.updateCivilians(time);
        this.updateCase(delta);
        this.updateNameTags();
        this.updateEvidencePrompts();
        this.updateHUD(delta);
      }

      getMoveVector() {
        const v = new Phaser.Math.Vector2(0, 0);
        if (this.keys.up.isDown || this.keys.arrowUp.isDown || this.touch.up) v.y -= 1;
        if (this.keys.down.isDown || this.keys.arrowDown.isDown || this.touch.down) v.y += 1;
        if (this.keys.left.isDown || this.keys.arrowLeft.isDown || this.touch.left) v.x -= 1;
        if (this.keys.right.isDown || this.keys.arrowRight.isDown || this.touch.right) v.x += 1;

        if (this.touch && this.touch.stickMode) {
          v.x += this.touch.axisX || 0;
          v.y += this.touch.axisY || 0;
        }
        if (v.length() > 1) v.normalize();
        return v;
      }

      keyDown(k) {
        const v = this.getMoveVector();
        if (k === "up") return v.y < -0.25;
        if (k === "down") return v.y > 0.25;
        if (k === "left") return v.x < -0.25;
        if (k === "right") return v.x > 0.25;
        return false;
      }

      updatePlayer() {
        const v = this.getMoveVector();
        const speed = this.touch.stickMode ? 185 * clamp(v.length(), 0, 1) : 185;
        if (v.lengthSq() > 0) {
          const move = v.clone().normalize().scale(speed);
          this.player.rotation = Phaser.Math.Angle.Between(0, 0, move.x, move.y) + Math.PI / 2;
          this.player.body.setVelocity(move.x, move.y);
        } else {
          this.player.body.setVelocity(0, 0);
        }
      }

      updateCar(delta) {
        const dt = delta / 1000;
        const speed = this.car.body.velocity.length();
        const canDrive = save.fuel > 0 && save.damage < 100;
        const input = this.getMoveVector();
        const steer = Math.abs(input.x) > 0.12 ? input.x : 0;
        const throttle = input.y < -0.18 ? -input.y : 0;
        const brakeReverse = input.y > 0.18 ? input.y : 0;

        if (steer !== 0) this.car.rotation += steer * 2.45 * dt * (speed > 20 ? 1 : 0.45);
        const forward = new Phaser.Math.Vector2(Math.cos(this.car.rotation), Math.sin(this.car.rotation));
        if (canDrive && throttle > 0) this.car.body.velocity.add(forward.clone().scale(370 * throttle * dt));
        if (canDrive && brakeReverse > 0) this.car.body.velocity.add(forward.clone().scale(-235 * brakeReverse * dt));
        this.car.body.velocity.scale(0.992);
        this.player.setPosition(this.car.x, this.car.y);
        if (speed > 4) save.fuel = clamp(save.fuel - (0.0024 + speed * 0.000012) * dt * 60, 0, 100);
      }

      updateTraffic(delta) {
        this.traffic.forEach(c => {
          if (c.trafficDir === "east") {
            c.body.setVelocity(c.trafficSpeed, 0);
            c.rotation = 0;
            if (c.x > WORLD_W + 80) c.setPosition(-80, 557);
          } else if (c.trafficDir === "west") {
            c.body.setVelocity(-c.trafficSpeed, 0);
            c.rotation = Math.PI;
            if (c.x < -80) c.setPosition(WORLD_W + 80, 650);
          } else if (c.trafficDir === "south") {
            c.body.setVelocity(0, c.trafficSpeed);
            c.rotation = Math.PI / 2;
            if (c.y > WORLD_H + 80) c.setPosition(1515, -80);
          }
        });
      }

      updateCivilians(time) {
        this.civilians.children.each(npc => {
          if (!npc.body || !npc.body.enable || npc.role === "suspect" || npc.role === "clerk") return;
          if (time > npc.nextThink) {
            npc.nextThink = time + Phaser.Math.Between(1200, 2800);
            // Keep most civilian life around Market and Central sidewalks.
            const zones = [[1120, 450, 1880, 760], [170, 420, 850, 760]];
            const z = Phaser.Utils.Array.GetRandom(zones);
            npc.wanderTarget.set(Phaser.Math.Between(z[0], z[2]), Phaser.Math.Between(z[1], z[3]));
          }
          const d = Phaser.Math.Distance.Between(npc.x, npc.y, npc.wanderTarget.x, npc.wanderTarget.y);
          if (d > 18) {
            const a = Phaser.Math.Angle.Between(npc.x, npc.y, npc.wanderTarget.x, npc.wanderTarget.y);
            npc.body.setVelocity(Math.cos(a) * npc.speed, Math.sin(a) * npc.speed);
          } else npc.body.setVelocity(0, 0);
        });
      }

      updateCase(delta) {
        this.caseTimer += delta;
        if (this.caseState === "patrol" && this.caseTimer > 6500) this.startShopliftingCase();
        if (this.caseState === "fleeing" && this.suspect.visible) {
          const a = Phaser.Math.Angle.Between(this.suspect.x, this.suspect.y, this.suspect.escapePoint.x, this.suspect.escapePoint.y);
          this.suspect.body.setVelocity(Math.cos(a) * 118, Math.sin(a) * 118);
          if (dist(this.suspect, this.suspect.escapePoint) < 35) {
            this.suspect.body.setVelocity(0, 0);
            this.suspect.setVisible(false);
            this.suspect.body.enable = false;
            this.suspectData.escaped = true;
            this.caseState = "suspect_escaped";
            this.dropEvidence(1380, 440, "stolen_cigarettes", "Stolen cigarettes", "Dropped during the Benny's Market shoplifting call.");
            this.objective = "Suspect escaped into side parking. Recover evidence, get the clerk statement, store items in trunk, return to precinct.";
            this.showMessage("Eddie Cross escaped into the market side parking. Evidence was dropped near Benny's Market.");
          }
        }
      }

      startShopliftingCase() {
        this.caseState = "fleeing";
        this.caseTimer = 0;
        this.dispatch = "RAVEN HOOK DISPATCH — Shoplifting at Benny's Market. Suspect fleeing south/east.";
        this.objective = "Drive to RH-CEN-02. Arrest Eddie Cross or recover the stolen item.";
        this.showMessage("DISPATCH: Shoplifting at Benny's Market. Suspect Eddie Cross fleeing from the storefront.");
        this.suspect.setPosition(this.locations.crimeSpawn.x, this.locations.crimeSpawn.y + 32);
        this.suspect.setVisible(true);
        this.suspect.body.enable = true;
        this.clerk.setPosition(this.locations.market.x - 80, this.locations.market.y - 10);
        this.clerk.setVisible(true);
        this.clerk.body.enable = true;
        this.clerk.body.setVelocity(0, 0);
      }

      dropEvidence(x, y, id, label, description) {
        if (this.evidenceItems.some(e => e.id === id)) return;
        const ev = this.add.container(x, y);
        ev.add(this.add.rectangle(0, 0, 24, 16, COLORS.paper, 1));
        ev.add(this.add.rectangle(0, -13, 9, 9, COLORS.red, 1));
        ev.id = id;
        ev.label = label;
        ev.description = description;
        ev.collected = false;
        ev.prompt = makeText(this, x, y - 34, "E: collect evidence", 12, "#f4d28a").setOrigin(0.5).setVisible(false);
        this.physics.add.existing(ev, true);
        this.evidenceItems.push(ev);
      }

      updateEvidencePrompts() {
        this.evidenceItems.forEach(ev => {
          if (ev.collected) return;
          ev.prompt.setPosition(ev.x, ev.y - 34);
          ev.prompt.setVisible(!this.inCar && dist(this.player, ev) < 60);
        });
      }

      updateNameTags() {
        this.civilians.children.each(npc => {
          if (!npc.nameTag) return;
          npc.nameTag.setPosition(npc.x, npc.y - 35);
          npc.nameTag.setVisible(npc.visible && dist(this.player, npc) < 75);
        });
      }

      handleInteract() {
        if (!this.inCar && dist(this.player, this.car) < 80) return this.enterCar();
        if (this.inCar && this.car.body.velocity.length() < 45) return this.exitCar();
        if (this.inCar && dist(this.car, this.locations.fuelPump) < 110) {
          save.fuel = 100;
          this.showMessage("Department fuel pump: tank filled.");
          return;
        }
        if (!this.inCar) {
          for (const ev of this.evidenceItems) {
            if (!ev.collected && dist(this.player, ev) < 60) {
              ev.collected = true;
              ev.setVisible(false);
              ev.prompt.destroy();
              this.playerInventory.push({ id: ev.id, label: ev.label, description: ev.description });
              this.objective = "Evidence collected. Talk to Marlene Pike, then store evidence in the trunk.";
              this.showMessage(`Collected evidence: ${ev.label}`);
              return;
            }
          }
          if (this.clerk.visible && dist(this.player, this.clerk) < 70) {
            if (!this.playerInventory.some(i => i.id === "witness_statement") && !save.trunk.some(i => i.id === "witness_statement")) {
              this.playerInventory.push({ id: "witness_statement", label: "Marlene Pike statement", description: "Clerk identified Eddie Cross leaving Benny's Market with unpaid cigarettes." });
              this.hasWitnessStatement = true;
              this.objective = "Statement taken. Put evidence/statement in trunk and return to Raven Hook Precinct.";
              this.showMessage("Witness statement taken from Marlene Pike.");
            } else this.showMessage("Marlene Pike already gave a statement.");
            return;
          }
          if (dist(this.player, this.locations.reportDesk) < 100 || dist(this.player, this.locations.station) < 160) {
            this.showMessage("Report desk: press R to file the incident report.");
            return;
          }
        }
        this.showMessage(this.inCar ? "Stop the car to exit. Use E at the department fuel pump to refill." : "Nothing usable nearby.");
      }

      enterCar() {
        this.inCar = true;
        this.player.setVisible(false);
        this.player.body.enable = false;
        this.cameras.main.startFollow(this.car, true, 0.08, 0.08);
        this.showMessage("Entered unmarked 1984 sedan.");
      }

      exitCar() {
        this.inCar = false;
        const side = new Phaser.Math.Vector2(-Math.sin(this.car.rotation), Math.cos(this.car.rotation)).scale(48);
        this.player.setPosition(this.car.x + side.x, this.car.y + side.y);
        this.player.setVisible(true);
        this.player.body.enable = true;
        this.car.body.setVelocity(0, 0);
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.showMessage("Exited vehicle.");
      }

      tryArrest() {
        if (!this.suspect.visible || this.suspectData.arrested) {
          this.showMessage("No arrest target nearby.");
          return;
        }
        const actor = this.inCar ? this.car : this.player;
        if (dist(actor, this.suspect) < 90) {
          this.suspectData.arrested = true;
          this.suspect.body.setVelocity(0, 0);
          this.suspect.setVisible(false);
          this.suspect.body.enable = false;
          this.caseState = "arrested";
          this.dropEvidence(this.suspect.x + 22, this.suspect.y + 8, "stolen_cigarettes", "Stolen cigarettes", "Recovered from Eddie Cross after arrest outside Benny's Market.");
          this.objective = "Suspect arrested. Collect evidence, take clerk statement, store items in trunk, return to report desk.";
          this.showMessage("Eddie Cross arrested. Recover the stolen item as evidence.");
        } else this.showMessage("Get closer to Eddie Cross to arrest.");
      }

      handleTrunk() {
        const near = this.inCar || dist(this.player, this.car) < 90;
        if (!near) {
          this.showMessage("Move near the detective car trunk first.");
          return;
        }
        if (this.playerInventory.length === 0) {
          const list = save.trunk.length ? save.trunk.map(i => i.label).join(", ") : "empty";
          this.showMessage(`Trunk inventory: ${list}`);
          return;
        }
        const moved = this.playerInventory.map(i => i.label).join(", ");
        save.trunk.push(...this.playerInventory);
        this.playerInventory = [];
        this.objective = "Evidence secured in trunk. Return to RH-CEN-01 and file the report at the precinct.";
        this.showMessage(`Stored in trunk: ${moved}`);
      }

      tryReport() {
        const actor = this.inCar ? this.car : this.player;
        if (dist(actor, this.locations.reportDesk) > 180 && dist(actor, this.locations.station) > 210) {
          this.showMessage("Return to the Raven Hook Precinct report desk first.");
          return;
        }
        this.scene.start("ReportScene", {
          suspectData: this.suspectData,
          caseState: this.caseState,
          playerInventory: this.playerInventory,
          shiftTime: this.clockString()
        });
      }

      showMessage(text) {
        this.message = text;
        this.messageTimer = 4300;
      }

      clockString() {
        const mins = Math.floor(this.shiftMinutes);
        const h24 = Math.floor(mins / 60);
        const m = mins % 60;
        const suffix = h24 >= 12 ? "PM" : "AM";
        const h12 = ((h24 + 11) % 12) + 1;
        return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
      }

      updateHUD(delta) {
        const activeCase = this.caseState === "patrol" ? "No active case" : "Benny's Market Shoplifting";
        this.caseText.setText(`CASE: ${activeCase} | MAP: RH-CEN-01 + RH-CEN-02 ONLY`);
        this.objectiveText.setText(`OBJECTIVE: ${this.objective}`);
        this.dispatchText.setText(this.dispatch);
        const carrying = this.playerInventory.length ? this.playerInventory.map(i => i.label).join(", ") : "none";
        const trunk = save.trunk.length ? save.trunk.map(i => i.label).join(", ") : "empty";
        const help = this.inCar
          ? "Mobile: stick/D-pad drive | A exit/refuel | B arrest | Y report | Keyboard: E/SPACE/R"
          : `Mobile: stick/D-pad move | A interact | B arrest | X trunk | Y report | Carrying: ${carrying} | Trunk: ${trunk}`;
        this.helpText.setText(help.substring(0, 140));
        const speed = Math.round(this.car.body.velocity.length() * 0.21);
        this.carText.setText(`MPH ${String(speed).padStart(3, "0")}   FUEL ${Math.round(save.fuel)}%   DMG ${Math.round(save.damage)}%`);
        this.rankText.setText(`DAY ${save.day} | ${save.rank} | XP ${save.xp}`);
        this.timeText.setText(`TIME ${this.clockString()}`);
        if (this.messageTimer > 0) {
          this.messageTimer -= delta;
          this.messageText.setText(this.message);
        } else this.messageText.setText("");
      }
    }

    class ReportScene extends Phaser.Scene {
      constructor() { super("ReportScene"); }
      init(data) { this.gameData = data || {}; }

      create() {
        this.selectedSuspect = "Unknown";
        this.selectedCrime = "Unknown";
        this.selectedCharge = "None";
        this.includeEvidence = false;
        this.includeWitness = false;
        this.submitted = false;

        this.cameras.main.setBackgroundColor("#231b13");
        const g = this.add.graphics();
        g.fillStyle(0x2a2118, 1).fillRect(0, 0, WIDTH, HEIGHT);
        g.fillStyle(COLORS.paper, 1).fillRoundedRect(78, 34, WIDTH - 156, HEIGHT - 68, 8);
        g.lineStyle(4, 0x3a2a1a, 1).strokeRoundedRect(78, 34, WIDTH - 156, HEIGHT - 68, 8);
        g.fillStyle(0x3a2a1a, 1).fillRect(78, 96, WIDTH - 156, 3);

        makeText(this, WIDTH / 2, 55, "RAVEN HOOK POLICE DEPARTMENT", 24, "#1c1c1c").setOrigin(0.5);
        makeText(this, WIDTH / 2, 84, "INCIDENT REPORT — RH-CEN-02 MARKET BLOCK", 17, "#1c1c1c").setOrigin(0.5);
        makeText(this, 120, 116,
          `Case: Benny's Market Shoplifting\nCampus: RH-CEN-02 Market Block\nFiled from: RH-CEN-01 Report Desk\nDate: Day ${save.day}, 1986\nFiled: ${this.gameData.shiftTime || "End of Shift"}`,
          15, "#1c1c1c");

        this.trunkText = makeText(this, 120, 210, "", 14, "#1c1c1c");
        this.optionText = makeText(this, 120, 258, "", 15, "#1c1c1c");
        this.resultText = makeText(this, WIDTH / 2, 482, "", 16, "#1c1c1c").setOrigin(0.5);

        this.addReportButton(700, 132, "1 SUSPECT", () => this.toggleSuspect());
        this.addReportButton(700, 180, "2 CRIME", () => this.toggleCrime());
        this.addReportButton(700, 228, "3 CHARGE", () => this.toggleCharge());
        this.addReportButton(700, 276, "4 EVIDENCE", () => this.toggleEvidence());
        this.addReportButton(700, 324, "5 WITNESS", () => this.toggleWitness());
        this.addReportButton(700, 392, "SUBMIT", () => this.submitReport(), true);

        makeText(this, 120, 438, "Keyboard: 1 suspect | 2 crime | 3 charge | 4 evidence | 5 witness | ENTER submit", 13, "#1c1c1c");

        this.input.keyboard.on("keydown-ONE", () => this.toggleSuspect());
        this.input.keyboard.on("keydown-TWO", () => this.toggleCrime());
        this.input.keyboard.on("keydown-THREE", () => this.toggleCharge());
        this.input.keyboard.on("keydown-FOUR", () => this.toggleEvidence());
        this.input.keyboard.on("keydown-FIVE", () => this.toggleWitness());
        this.input.keyboard.on("keydown-ENTER", () => this.submitReport());
        this.updateText();
      }

      addReportButton(x, y, label, cb, big = false) {
        const t = this.add.text(x, y, label, {
          fontFamily: "Courier New",
          fontSize: big ? "18px" : "15px",
          color: "#f4d28a",
          backgroundColor: "#1c1c1c",
          padding: { x: 12, y: 8 }
        }).setInteractive();
        t.on("pointerdown", cb);
        return t;
      }

      toggleSuspect() { if (!this.submitted) { this.selectedSuspect = this.selectedSuspect === "Eddie Cross" ? "Unknown" : "Eddie Cross"; this.updateText(); } }
      toggleCrime() { if (!this.submitted) { this.selectedCrime = this.selectedCrime === "Shoplifting" ? "Unknown" : "Shoplifting"; this.updateText(); } }
      toggleCharge() { if (!this.submitted) { this.selectedCharge = this.selectedCharge === "Petty Theft" ? "None" : "Petty Theft"; this.updateText(); } }
      toggleEvidence() { if (!this.submitted) { this.includeEvidence = !this.includeEvidence; this.updateText(); } }
      toggleWitness() { if (!this.submitted) { this.includeWitness = !this.includeWitness; this.updateText(); } }

      updateText() {
        const trunkList = save.trunk.length ? save.trunk.map(i => i.label).join(", ") : "EMPTY";
        const hasEvidence = save.trunk.some(i => i.id === "stolen_cigarettes");
        const hasWitness = save.trunk.some(i => i.id === "witness_statement");
        this.trunkText.setText(`Trunk evidence: ${trunkList}`);
        this.optionText.setText(
          `Suspect named: ${this.selectedSuspect}\n` +
          `Crime type: ${this.selectedCrime}\n` +
          `Recommended charge: ${this.selectedCharge}\n` +
          `Attach stolen item: ${this.includeEvidence ? "YES" : "NO"} ${hasEvidence ? "" : "(not secured in trunk)"}\n` +
          `Attach clerk statement: ${this.includeWitness ? "YES" : "NO"} ${hasWitness ? "" : "(not secured in trunk)"}\n\n` +
          `Detective summary:\nResponded from Raven Hook Precinct to Benny's Market. Clerk reported shoplifting. Suspect fled the Market Block. Evidence and witness details were reviewed before filing.`
        );
      }

      submitReport() {
        if (this.submitted) {
          this.scene.start("GameScene");
          return;
        }
        const hasEvidence = save.trunk.some(i => i.id === "stolen_cigarettes");
        const hasWitness = save.trunk.some(i => i.id === "witness_statement");
        let score = 0;
        const notes = [];

        if (this.selectedSuspect === "Eddie Cross") { score += 25; notes.push("correct suspect"); } else { score -= 15; notes.push("suspect missing"); }
        if (this.selectedCrime === "Shoplifting") { score += 20; notes.push("correct crime type"); } else { score -= 10; notes.push("crime type wrong"); }
        if (this.selectedCharge === "Petty Theft") { score += 20; notes.push("correct charge"); } else { score -= 10; notes.push("charge missing"); }
        if (this.includeEvidence && hasEvidence) { score += 20; notes.push("evidence attached"); } else if (this.includeEvidence && !hasEvidence) { score -= 15; notes.push("evidence claimed but not in trunk"); } else { score -= 8; notes.push("evidence omitted"); }
        if (this.includeWitness && hasWitness) { score += 15; notes.push("witness attached"); } else if (this.includeWitness && !hasWitness) { score -= 10; notes.push("witness claimed but not secured"); } else { notes.push("witness omitted"); }
        if (this.gameData.suspectData && this.gameData.suspectData.arrested) { score += 10; notes.push("arrest made"); }
        if (this.gameData.suspectData && this.gameData.suspectData.escaped) { score -= 5; notes.push("suspect escaped"); }

        score = clamp(score, 0, 100);
        let grade = "D";
        if (score >= 90) grade = "A";
        else if (score >= 75) grade = "B";
        else if (score >= 55) grade = "C";

        save.xp += score;
        if (save.xp >= 160 && save.rank === "Detective Trainee") save.rank = "Detective Third Grade";
        if (save.xp >= 380 && save.rank === "Detective Third Grade") save.rank = "Detective Second Grade";
        save.reports.push({ day: save.day, case: "Benny's Market Shoplifting", score, grade });
        save.day += 1;
        save.trunk = [];
        save.fuel = Math.max(save.fuel, 40);
        this.submitted = true;
        this.resultText.setText(`REPORT FILED — SCORE ${score}/100 — GRADE ${grade}\n${notes.join(" | ")}\nPress ENTER or tap SUBMIT to start next shift.`);
      }
    }

    const config = {
      type: Phaser.AUTO,
      parent: "game",
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: "#080b10",
      physics: {
        default: "arcade",
        arcade: { debug: false }
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      scene: [TitleScene, GameScene, ReportScene]
    };

    window.addEventListener("load", () => {
      if (!window.Phaser) {
        document.body.innerHTML = "<pre style='color:white;padding:20px'>Phaser failed to load. This build uses the Phaser CDN, so the browser needs internet access.</pre>";
        return;
      }
      new Phaser.Game(config);
    });
  })();