// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/CST.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CST = {
  SCENES: {
    EXAMPLE1: "EXAMPLE1",
    EXAMPLE2: "EXAMPLE2",
    EXAMPLE3: "EXAMPLE3"
  },
  IMAGE: {},
  AUDIO: {},
  SPRITE: {
    PLAYER: "player.png",
    ENEMIES: "enemies.png"
  }
};
},{}],"src/resources/Player.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Player =
/** @class */
function (_super) {
  __extends(Player, _super);

  function Player(scene, x, y, texture, frame) {
    var _this = _super.call(this, scene, x, y, texture, frame) || this;

    console.log("loading Player...");

    _this.scene.load.spritesheet("player", "./assets/sprite/player.png", {
      frameHeight: 64,
      frameWidth: 64
    });

    _this.keyboard;
    return _this;
  }

  Player.prototype.init = function () {
    this.loadAnimations();
    this.sprite = this.scene.physics.add.sprite(0, 0, "player", 0);
    return this.sprite;
  };

  Player.prototype.handleKeyboardMovements = function () {
    var _this = this; // RIGHT MOVEMENT ========================================


    this.keyboard = this.scene.input.keyboard;
    var keyboardKeys = this.keyboard.addKeys("W, A, S, D");
    this.keyboard.on("keydown", function (event) {
      switch (event.key) {
        case "d":
          //right
          _this.sprite.setVelocityX(64);

          _this.sprite.play(_this.sprite.texture.key + "-right", true);

          break;

        case "a":
          //left
          _this.sprite.setVelocityX(-64);

          _this.sprite.play(_this.sprite.texture.key + "-left", true);

          break;

        case "w":
          //top
          _this.sprite.setVelocityY(-64);

          _this.sprite.play(_this.sprite.texture.key + "-top", true);

          break;

        case "s":
          //bottom
          _this.sprite.setVelocityY(64);

          _this.sprite.play(_this.sprite.texture.key + "-bottom", true);

          break;
      }
    }); // on character stop.

    this.keyboard.on("keyup", function () {
      //set the sprite to the first animation frame (character standing)
      _this.sprite.setFrame(_this.sprite.anims.currentAnim.frames[0].textureFrame);

      _this.sprite.anims.stop();

      _this.sprite.setVelocity(0);
    });
  };

  Player.prototype.loadAnimations = function () {
    var _this = this;

    var directions = [{
      side: "top",
      start: 7,
      end: 8
    }, {
      side: "right",
      start: 4,
      end: 5
    }, {
      side: "bottom",
      start: 1,
      end: 2
    }, {
      side: "left",
      start: 9,
      end: 10
    }];
    directions.forEach(function (direction) {
      _this.scene.anims.create({
        key: "player-" + direction.side,
        frameRate: 4,
        frames: _this.scene.anims.generateFrameNames("player", {
          start: direction.start,
          end: direction.end
        }),
        repeat: -1
      });
    });
  };

  return Player;
}(Phaser.GameObjects.Sprite);

exports.default = Player;
},{}],"src/resources/World.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var World =
/** @class */
function () {
  function World(scene) {
    this.scene = scene;
  }

  World.prototype.preload = function () {
    //run on preload
    this.scene.load.image("background", "./assets/image/bkg.png"); //load creatures atlas

    this.scene.load.atlas("creatures", "./assets/sprite/creatures.png", "./assets/sprite/creatures_atlas.json");
  };

  return World;
}();

exports.default = World;
},{}],"src/resources/Creature.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Creature =
/** @class */
function (_super) {
  __extends(Creature, _super);

  function Creature(scene, x, y, texture, frame) {
    var _this = _super.call(this, scene, x, y, texture, frame) || this;

    _this.sprite;
    return _this;
  }

  Creature.prototype.init = function () {
    this.loadAnimations(); // this.randomWalk();
    // this.add
    //   .tween(this.sprite.body.velocity)
    //   .to({ y: -32 }, 1500, Phaser.Easing.Linear.None, true);

    this.sprite = this.scene.physics.add.sprite(300, 300, "creatures", "blue-spectre_0");
    return this.sprite;
  };

  Creature.prototype.randomWalk = function () {
    var _this = this;

    setInterval(function () {
      var n = Math.floor((Math.random() + 1) * 4);
      var d = Math.floor(Math.random() * 4);
      var directions = ["top", "right", "bottom", "left"];

      _this.sprite.play("blue-spectre-" + directions[d]);

      console.log(d);
      console.log("creature walking..." + directions[d]);
      var movingTargetPixels = 32;

      switch (directions[d]) {
        case "top":
          break;

        case "right":
          _this.sprite.x += 32;
          break;

        case "bottom":
          _this.sprite.y += 32;
          break;

        case "left":
          _this.sprite.x -= 32;
          break;
      }
    }, 6000);
  };

  Creature.prototype.smoothMove = function () {};

  Creature.prototype.loadAnimations = function () {
    var _this = this;

    var directions = [{
      side: "top",
      start: 4,
      end: 11
    }, {
      side: "right",
      start: 8,
      end: 9
    }, {
      side: "bottom",
      start: 1,
      end: 2
    }, {
      side: "left",
      start: 6,
      end: 7
    }];
    var standing = [{
      side: "top",
      frame: 10
    }, {
      side: "right",
      frame: 3
    }, {
      side: "bottom",
      frame: 0
    }, {
      side: "left",
      frame: 5
    }];
    directions.forEach(function (direction) {
      _this.scene.anims.create({
        key: "blue-spectre-" + direction.side,
        frameRate: 4,
        frames: _this.scene.anims.generateFrameNames("creatures", {
          prefix: "blue-spectre_",
          // suffix: ".png",
          start: direction.start,
          end: direction.end
        }),
        repeat: -1
      });
    });
  };

  return Creature;
}(Phaser.GameObjects.Sprite);

exports.default = Creature;
},{}],"src/utils/AlignGrid.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var main_1 = require("../main");

var AlignGrid =
/** @class */
function () {
  function AlignGrid(config) {
    if (!config.scene) {
      console.log("missing scene!");
      return;
    }

    if (!config.rows) {
      config.rows = 3;
    }

    if (!config.cols) {
      config.cols = 3;
    }

    if (!config.width) {
      config.width = main_1.game.config.width;
    }

    if (!config.height) {
      config.height = main_1.game.config.height;
    }

    this.h = config.height;
    this.w = config.width;
    this.rows = config.rows;
    this.cols = config.cols;
    this.scene = config.scene; //cw cell width is the scene width divided by the number of columns

    this.cw = this.w / this.cols; //ch cell height is the scene height divided the number of rows

    this.ch = this.h / this.rows;
  } //place an object in relation to the grid


  AlignGrid.prototype.placeAt = function (xx, yy, obj) {
    //calculate the center of the cell
    //by adding half of the height and width
    //to the x and y of the coordinates
    var x2 = this.cw * xx + this.cw / 2;
    var y2 = this.ch * yy + this.ch / 2;
    obj.x = x2;
    obj.y = y2;
  };

  AlignGrid.prototype.show = function (a) {
    if (a === void 0) {
      a = 1;
    }

    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(4, 0xff0000, a); //
    //
    //this.graphics.beginPath();

    for (var i = 0; i < this.w; i += this.cw) {
      this.graphics.moveTo(i, 0);
      this.graphics.lineTo(i, this.h);
    }

    for (var i = 0; i < this.h; i += this.ch) {
      this.graphics.moveTo(0, i);
      this.graphics.lineTo(this.w, i);
    }

    this.graphics.strokePath();
  }; //create a visual representation of the grid


  AlignGrid.prototype.showNumbers = function (a) {
    if (a === void 0) {
      a = 1;
    }

    this.show(a);
    var n = 0;

    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        var numText = this.scene.add.text(0, 0, n, {
          color: "red"
        });
        numText.setOrigin(0.5, 0.5);
        this.placeAt(j, i, numText);
        n++;
      }
    }
  };

  return AlignGrid;
}();

exports.default = AlignGrid;
},{"../main":"src/main.ts"}],"src/scenes/WorldScene.ts":[function(require,module,exports) {
"use strict";

var __extends = this && this.__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CST_1 = require("../CST");

var Player_1 = __importDefault(require("../resources/Player"));

var World_1 = __importDefault(require("../resources/World"));

var Creature_1 = __importDefault(require("../resources/Creature"));

var AlignGrid_1 = __importDefault(require("../utils/AlignGrid"));

var main_1 = require("../main");

var WorldScene =
/** @class */
function (_super) {
  __extends(WorldScene, _super);

  function WorldScene() {
    return _super.call(this, {
      key: CST_1.CST.SCENES.EXAMPLE1
    }) || this;
  } //optional methods


  WorldScene.prototype.init = function () {
    console.log("example1 ");
  };

  WorldScene.prototype.preload = function () {
    this.player = new Player_1.default(this, 200, 200, "player", 0);
    this.blueSpectre = new Creature_1.default(this, 400, 400, "creature", 0);
    this.world = new World_1.default(this);
    this.world.preload();
  }; //required!


  WorldScene.prototype.create = function () {
    var _this = this;

    this.world.background = this.add.image(0, 0, "background");
    this.world.background.setOrigin(0, 0);
    this.aGrid = new AlignGrid_1.default({
      scene: this,
      cols: 5,
      rows: 5
    });
    this.aGrid.showNumbers();
    this.add.text(0, 0, "Britannia Online - Client", {
      font: "25px Arial",
      fill: "yellow"
    }); //load sprites

    this.player.sprite = this.player.init();
    this.aGrid.placeAt(2, 2, this.player.sprite);
    this.player.sprite.displayWidth = main_1.game.config.width / 5;
    this.player.sprite.scaleY = this.player.sprite.scaleX;
    this.blueSpectre.sprite = this.blueSpectre.init();
    setTimeout(function () {
      _this.blueSpectre.sprite.play("blue-spectre-bottom");

      _this.blueSpectre.sprite.y += 32;
    }, 1000);
    window.player = this.player.sprite; //this.scene.start(CST.SCENES.MENU, "hello from loadscene");
    //this.scene.launch();
  };

  WorldScene.prototype.update = function () {
    this.player.handleKeyboardMovements();
  };

  return WorldScene;
}(Phaser.Scene);

exports.WorldScene = WorldScene;
},{"../CST":"src/CST.ts","../resources/Player":"src/resources/Player.ts","../resources/World":"src/resources/World.ts","../resources/Creature":"src/resources/Creature.ts","../utils/AlignGrid":"src/utils/AlignGrid.ts","../main":"src/main.ts"}],"src/main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var WorldScene_1 = require("./scenes/WorldScene");

exports.game = new Phaser.Game({
  type: Phaser.AUTO,
  scene: [WorldScene_1.WorldScene],
  backgroundColor: 0x000000,
  width: 1024,
  height: 768,
  render: {
    pixelArt: false
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  }
});
},{"./scenes/WorldScene":"src/scenes/WorldScene.ts"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "38475" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.ts"], null)
//# sourceMappingURL=/main.b0a109ad.js.map