"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Env_1 = require("../constants/Env");
var Scenes_1 = __importDefault(require("../constants/Scenes"));
var Ship_resources_1 = require("../constants/Ship.resources");
var Main_1 = require("../Main");
var EventManager_1 = require("../resources/Managers/EventManager");
var UIManager_1 = require("../resources/Managers/UIManager");
var Player_1 = require("../resources/Player");
var Ship_1 = require("../resources/Ship");
var Ship_types_1 = require("../types/Ship.types");
var Player_resources_1 = require("./../constants/Player.resources");
var Background_1 = require("./../resources/Background");
var PowerUp_1 = require("./../resources/items/PowerUp");
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        return _super.call(this, {
            key: Scenes_1.default.GameScene
        }) || this;
    }
    GameScene.prototype.init = function () {
        this.powerUps = this.physics.add.group();
        this.beams = this.physics.add.group();
        this.enemies = this.physics.add.group();
    };
    GameScene.prototype.create = function () {
        this.background = new Background_1.Background(this);
        // Sprites ========================================
        this.player = new Player_1.Player(this, Main_1.game.canvas.width / 2, Main_1.game.canvas.height * 0.8, Player_resources_1.playerResources.images.playerShip.key, 0);
        this.smallShip = new Ship_1.Ship(this, Main_1.game.canvas.width / 2, -50, Ship_resources_1.shipResources.images.smallShip.key, 0, Ship_types_1.ShipType.SmallShip);
        this.attackerShip = new Ship_1.Ship(this, Main_1.game.canvas.width / 2 + 50, -50, Ship_resources_1.shipResources.images.attackerShip.key, 0, Ship_types_1.ShipType.AttackerShip);
        this.motherShip = new Ship_1.Ship(this, Main_1.game.canvas.width / 2 + 50, -50, Ship_resources_1.shipResources.images.motherShip.key, 0, Ship_types_1.ShipType.MotherShip);
        // Items ========================================
        var N_POWER_UPS = 4;
        for (var i = 0; i < N_POWER_UPS; i++) {
            new PowerUp_1.PowerUp(this, Math.random() * Main_1.game.canvas.width, Math.random() * Main_1.game.canvas.height, Ship_resources_1.shipResources.images.powerUp.key, 0);
        }
        // Sounds ========================================
        if (!Env_1.env.debug) {
            var ambienceMusic = this.sound.add(Ship_resources_1.shipResources.sounds.interGalatic.key);
            ambienceMusic.play();
        }
        this.eventManager = new EventManager_1.EventManager(this);
        this.eventManager.loadEvents();
        // this.physics.add.overlap(
        //   this.beams,
        //   this.enemies,
        //   this.onHitEnemy,
        //   undefined,
        //   this
        // );
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
        this.onPostCreation();
    };
    GameScene.prototype.onPostCreation = function () {
        //this function happens after the creation of our initial content.
        //We set the UI here since it needs to be on top of the screen, after all other elements were created.
        // UI ========================================
        this.score = 0; //set initial player score
        this.uiManager = new UIManager_1.UIManager(this);
        this.scoreLabel = this.uiManager.drawScore();
    };
    GameScene.prototype.update = function () {
        this.smallShip.update();
        this.attackerShip.update();
        this.motherShip.update();
        this.background.update();
        this.player.update();
        // this.tweenTest.update();
    };
    return GameScene;
}(Phaser.Scene));
exports.GameScene = GameScene;
