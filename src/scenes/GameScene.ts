import { env } from "../constants/Env";
import Scenes from "../constants/Scenes";
import { shipResources } from "../constants/Ship.resources";
import { game } from "../Main";
import { Explosion } from "../resources/effects/Explosion";
import { Player } from "../resources/Player";
import { Ship } from "../resources/Ship";
import { TweenTest } from "../resources/TweenTest";
import { ShipType } from "../types/Ship.types";
import AlignGrid from "../utils/AlignGrid";
import { playerResources } from "./../constants/Player.resources";
import { Background } from "./../resources/Background";
import { PowerUp } from "./../resources/items/PowerUp";

export class GameScene extends Phaser.Scene {
  background: Background;
  ship1: Phaser.GameObjects.Image;
  smallShip: Ship;
  attackerShip: Ship;
  motherShip: Ship;

  player: Player;
  tweenTest: TweenTest;
  grid: AlignGrid;
  powerUps: Phaser.Physics.Arcade.Group;
  beams: Phaser.Physics.Arcade.Group;
  enemies: Phaser.Physics.Arcade.Group;
  explosion: Explosion;

  constructor() {
    super({
      key: Scenes.GameScene
    });
  }
  public init() {
    this.powerUps = this.physics.add.group();
    this.beams = this.physics.add.group();
    this.enemies = this.physics.add.group();
  }
  public create() {
    //groups

    // Sprites ========================================

    this.background = new Background(this);

    this.player = new Player(
      this,
      game.canvas.width / 2,
      game.canvas.height * 0.8,
      playerResources.images.playerShip.key,
      0
    );

    this.smallShip = new Ship(
      this,
      game.canvas.width / 2,
      -50,
      shipResources.images.smallShip.key,
      0,
      ShipType.SmallShip
    );

    this.attackerShip = new Ship(
      this,
      game.canvas.width / 2 + 50,
      -50,
      shipResources.images.attackerShip.key,
      0,
      ShipType.AttackerShip
    );

    this.motherShip = new Ship(
      this,
      game.canvas.width / 2 + 50,
      -50,
      shipResources.images.motherShip.key,
      0,
      ShipType.MotherShip
    );

    // Items ========================================

    const N_POWER_UPS = 4;

    for (let i = 0; i < N_POWER_UPS; i++) {
      new PowerUp(
        this,
        Math.random() * game.canvas.width,
        Math.random() * game.canvas.height,
        shipResources.images.powerUp.key,
        0
      );
    }

    // UI ========================================

    this.add.text(5, 5, "Score", {
      font: "12px Arial",
      fill: "yellow"
    });

    // Sounds ========================================
    if (!env.debug) {
      const ambienceMusic = this.sound.add(
        shipResources.sounds.interGalatic.key
      );
      ambienceMusic.play();
    }

    // Physics ========================================

    this.physics.add.collider(
      this.beams,
      this.powerUps,
      this.onBeamsPowerUpCollision
    );

    //overlap is almost the same as collider, but it DOES NOT trigger physics.
    // we will use it to make the player pick up objects on the map
    this.physics.add.overlap(
      this.player.spriteBody,
      this.powerUps,
      this.onPickPowerUp,
      undefined,
      this
    );

    this.physics.add.overlap(
      this.player.spriteBody,
      this.enemies,
      this.onPlayerDestroy,
      undefined,
      this
    );

    this.physics.add.overlap(
      this.beams,
      this.enemies,
      this.onHitEnemy,
      undefined,
      this
    );

    // Tests

    // Setup grid

    // this.grid = new AlignGrid({
    //   scene: this,
    //   cols: game.canvas.width / 32,
    //   rows: game.canvas.height / 32
    // });
    // this.grid.showNumbers();

    // // tween movement

    // this.tweenTest = new TweenTest(
    //   this,
    //   0,
    //   200,
    //   shipResources.images.smallShip.key,
    //   0,
    //   this.grid
    // );
    //align to grid this tweenTest obj
  }

  public update() {
    this.smallShip.update();
    this.attackerShip.update();
    this.motherShip.update();
    this.background.update();
    this.player.update();
    // this.tweenTest.update();
  }

  /*#############################################################|
  |  >>> PHYSICS functions
  *##############################################################*/

  public onHitEnemy(beam: any, enemy: any) {
    beam.destroy();
    new Explosion(
      this,
      enemy.x,
      enemy.y,
      shipResources.images.explosion.key,
      0
    );
    enemy.destroy();
  }

  public onPickPowerUp(
    player: Phaser.GameObjects.GameObject,
    powerUp: Phaser.GameObjects.GameObject
  ) {
    console.log("Player picking up powerUp");
    //@ts-ignore
    powerUp.disableBody(true, true); //this will inactivate and hide the power up
    powerUp.destroy();
  }

  public onBeamsPowerUpCollision(beam: any, powerUp: any) {
    console.log("Beam destroyed");
    beam.destroy();
  }

  public onPlayerDestroy(player: any, enemy: any) {
    console.log("destroying player");
    // player.destroy();

    // Player damaging ========================================

    // Enemy destroying ========================================
    if (!enemy.isDestroyed) {
      enemy.isDestroyed = true;

      new Explosion(
        this,
        enemy.x,
        enemy.y,
        shipResources.images.explosion.key,
        0
      );
      enemy.destroy();

      setTimeout(() => {
        //wait animation complete and then destroy the instance
        enemy.destroy();
      }, 500);
    }
  }
}
